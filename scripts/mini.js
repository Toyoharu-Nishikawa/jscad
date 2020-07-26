import {MiniJscad} from "./minijscad/index.js"
import {dxftosvg, getParamFromDxf} from "./dxftosvg/index.js"
import DxfParser from "./minijscad/dxf-parser/dxf-parser-module.js"

const frame = document.getElementById("frame")
const minijscadTest= document.getElementById("minijscad-test")
const width = frame.getBoundingClientRect().width  
const height = frame.getBoundingClientRect().height 
minijscadTest.style.width = (width-50) + "px"
minijscadTest.style.height = (height-50) + "px"
console.log(width, height)
const miniJscad = new MiniJscad("minijscad-test", width-50, height-50, false)
  .hideEventObject()
const version = miniJscad.version
console.log("version", version)

miniJscad.sketch.setBackgroundColor("default")

const draw = () =>{
  const sheet1 = miniJscad.sketch.addSheet("sheet1", {stroke: "#FFBF00", "stroke-dasharray": "DIVIDE"})
  const data = sheet1.data("key")
  console.log("sheet1 data", sheet1.attr("stroke"))
  const id4 =miniJscad.sketch.addFig("arc", {center:[250,100], radius:50, start:180, end:90}, {stroke:"orange",fill:"green", lineTypeName:"PHANTOM"})
  const id5 =miniJscad.sketch.addFig("arc", {center:[350,100], radius:50, start:0, end:180})
  const id6 =miniJscad.sketch.addFig("arc", {center:[450,100], radius:50, start:180, end:0})
  const id7 =miniJscad.sketch.addFig("arc", {center:[550,100], radius:50, start:0, end:270})
  const id8 =miniJscad.sketch.addFig("arc", {center:[650,100], radius:50, start:270, end:0})
  const id9 =miniJscad.sketch.addFig("bspline", {points: [[0,0],[0,100],[100,100], [100,0]], degree:3, knots:[0,0,0,0,1,1,1,1]})
}

console.log(miniJscad)
console.log(miniJscad.sketch.getAllSheetIds())
console.log(miniJscad.sketch.getCurrentSheetId())

let drawFlag = false

const main = () => {
  const id1 = miniJscad.sketch.addFig("line", {points:[[100,0],[100,100]]}, {color:"red", lineTypeName:"DASHED"})
  const id2 =miniJscad.sketch.addFig("arc", {center:[150,100], radius:50, start:90, end:180})
  const id3 = miniJscad.sketch.addFig("line", {points:[[150,150],[2000,500]]})
  
  console.log(id1, id2, id3)
  const currentSheet  = miniJscad.sketch.getCurrentSheet()
  console.log("sheet0", currentSheet.attr("stroke"))

  draw()
  drawFlag = true
  
  const sheet0 = miniJscad.sketch.changeCurrentSheet("sheet0")
  const id9 =miniJscad.sketch.addFig("lines", {points:[[2000,500],[2000,600],[1500,600],[1500,500] ]}, {color:"black", lineTypeName:"CONTINUOUS"})
  const id10 =miniJscad.sketch.addFig("polyline", {points:[[1500,500],[1000,500],[1000,600],[500,500] ]}, {color:"#FF00FF", lineTypeName:"DOT"})
  const id11 =miniJscad.sketch.addFig("circle", {center:[1500,500], radius: 200}, {color:"#10AA05", lineTypeName:"DIVIDE"})
  
  const idD1 =  miniJscad.sketch.addDimension("horizontal", {points:[[150, 150], [2000, 500]], distance:300, fontSize:100, digit:2, auxiliary:true})
  const idD2 =  miniJscad.sketch.addDimension("vertical", {points:[[100, 0], [100, 100]], distance:30, fontSize:30, digit:2, auxiliary:true})
  const idD3 =  miniJscad.sketch.addDimension("length", {points:[[150, 100], [150-25*Math.sqrt(2), 100+25*Math.sqrt(2)]], distance:0, fontSize:5, digit:3, auxiliary:false})

  /*****      remove figs or dimensions ****/
  //miniJscad.sketch.removeFig(id1)
  //miniJscad.sketch.removeDimension(idD1)
  //miniJscad.sketch.removeFigsInSheet("sheet0")
  //miniJscad.sketch.removeDimensionsInSheet("sheet0")
  //miniJscad.sketch.clearSheet("sheet0")

  miniJscad.sketch.hideSheet("sheet1")

  miniJscad.sketch.showSheet("sheet1")
  console.log(miniJscad.sketch.getAllSheets())
  //miniJscad.sketch.removeAllSheets()
  //console.log(miniJscad.sketch.getAllSheetIds())
}

const resize = ()=> {
  const minijscadTest = document.getElementById("frame")
  const width = minijscadTest.getBoundingClientRect().width  
  const height = minijscadTest.getBoundingClientRect().height 
  console.log("resize",width, height)
  miniJscad.resize(width-50, height-50)
}

window.onresize = resize

document.getElementById("read-dxf").onchange = (e) =>{
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (eve) => {
    const text = eve.target.result  

    const parser = new DxfParser()
    const dxf = parser.parseSync(text)
    console.log("dxf", dxf)

    const param = getParamFromDxf(text)
    console.log("param", param)
    const svg = dxftosvg(text)
    console.log("svg", svg)
    const sheet = miniJscad.sketch.getCurrentSheet()
    sheet.svg(svg)
    
  }
  reader.readAsText(file, "UTF-8")    
}

document.getElementById("download-dxf").onclick = () =>{
  const exportText = miniJscad.sketch.getDxf(["sheet1", "sheet0"])
  const filename = "mini.dxf"
  const exportFileBOM = true
  const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'})
  saveAs(blob, filename,exportFileBOM)
}

document.getElementById("clear").onclick = () =>{
  if(drawFlag){
    miniJscad.sketch.clearSheet("sheet1")
    drawFlag = false
  }
}

document.getElementById("draw").onclick = () =>{
  if(!drawFlag){
    draw()
    drawFlag = true
  }
}

document.getElementById("hide-dimension").onclick = () =>{
  miniJscad.sketch.hideDimensions()
}

document.getElementById("show-dimension").onclick = () =>{
  miniJscad.sketch.showDimensions()
}


main()
