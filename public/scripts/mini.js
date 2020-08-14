import {MiniJscad} from "./minijscad/index.js"
import {dxftosvg, getParamFromDxf} from "./dxftosvg/index.js"
import DxfParser from "./dxf-parser/dxf-parser-module.js"
import {getDxf} from "./export-dxf/index.js"


let miniJscad = null
let drawFlag = false
let readDXF = null

const setUpMiniJscad = () => {
  const frame = document.getElementById("frame")
  const minijscadTest= document.getElementById("minijscad-test")
  const width = frame.getBoundingClientRect().width  
  const height = frame.getBoundingClientRect().height 
  minijscadTest.style.width = (width-50) + "px"
  minijscadTest.style.height = (height-50) + "px"
  console.log(width, height)
  
  miniJscad = new MiniJscad("minijscad-test", width-50, height-50)
  const version = miniJscad.version
  console.log("version", version)
  
  miniJscad.sketch.setBackgroundColor("default")
}

const initialDraw = () =>{
  const sheet0 = miniJscad.sketch.screen.addSheet("sheet0")
  const line1 = sheet0.addFig("line", {points:[[100,0],[100,100]]}, {stroke:"red", lineTypeName:"DASHED"})

  const arc1  = sheet0.addFig("arc", {center:[150,100], radius:50, start:90, end:180})
  const line2 =sheet0.addFig("line", {points:[[150,150],[2000,500]]})
  


  const sheet1 = miniJscad.sketch.screen.addSheet("sheet1", {stroke: "#FFBF00", "stroke-dasharray": "DIVIDE"})
  const arc2 = sheet1.addFig("arc", {center:[250,100], radius:50, start:180, end:90}, {stroke:"orange",fill:"green", lineTypeName:"PHANTOM"})

  const arc3 = sheet1.addFig("arc", {center:[350,100], radius:50, start:0, end:180})
  const arc4 = sheet1.addFig("arc", {center:[450,100], radius:50, start:180, end:0})
  const arc5 = sheet1.addFig("arc", {center:[550,100], radius:50, start:0, end:270})
  const arc6 = sheet1.addFig("arc", {center:[650,100], radius:50, start:270, end:0})

  const sheet2 = miniJscad.sketch.screen.addSheet("sheet2" )
  const bspline1 = sheet2.addFig("bspline", {points: [[0,0],[0,100],[100,100], [100,0]], degree:3, knots:[0,0,0,0,1,1,1,1]})

  const lines1 = sheet0.addFig("lines", {points:[[2000,500],[2000,600],[1500,600],[1500,500] ]}, {stroke:"black", lineTypeName:"CONTINUOUS"})
  const polyline1 = sheet0.addFig("polyline", {points:[[1500,500],[1000,500],[1000,600],[500,500] ]}, {stroke:"#FF00FF", lineTypeName:"DOT"})
  const circle1 = sheet0.addFig("circle", {center:[1500,500], radius: 200}, {stroke:"#10AA05", lineTypeName:"DIVIDE"})


  const lineTmp1 = sheet0.addFig("line", {points:[[0,0],[200,200]]})
  const lineTmp2 = sheet0.addFig("line", {points:[[0,0],[300,200]]})
  const lineTmp3 = sheet0.addFig("line", {points:[[0,0],[400,200]]})
  sheet0.removeFig(lineTmp1)
  sheet0.removeFig(lineTmp2.id)
  lineTmp3.hide()
  lineTmp3.show()

  sheet0.hideAllFigs()
  sheet0.showAllFigs()



  
  const sheet3 = miniJscad.sketch.screen.addSheet("sheet3",  {}, {stroke: "orange", fill:"red"}, {} )
  const dim1 =  sheet0.addDimension("horizontal", {points:[[150, 150], [2000, 500]], distance:300, fontSize:100, digit:2, auxiliary:true})
  const dim2 =  sheet3.addDimension("vertical", {points:[[100, 0], [100, 100]], distance:30, fontSize:30, digit:2, auxiliary:true})
  const dim3 =  sheet3.addDimension("length", {points:[[150, 100], [150-25*Math.sqrt(2), 100+25*Math.sqrt(2)]], distance:0, fontSize:5, digit:3, auxiliary:false})


  sheet3.hideAllDimensions()
  sheet3.showAllDimensions()

  const sheet4 = miniJscad.sketch.screen.addSheet("sheet4",  {}, {}, {stroke:"brown", fill:"purple"} )
  const text1 = sheet4.addText({text:"minijscad", position:[500,100], theta: 45, font: {size: 40}})
  const text2 = sheet4.addText({text:"hello world", position:[1000,0], theta: 0, font: {size: 15}}, {stroke: "red", fill: "red"})


  sheet4.hideAllTexts()
  sheet4.showAllTexts()


}

const clearSheets = () =>{
  miniJscad.sketch.screen.removeAllSheets()
}

const secondDraw = () =>{
  const sheet0 = miniJscad.sketch.screen.addSheet("sheet0")
  const line1 = sheet0.addFig("line", {points:[[0,0],[500,500]]}, {stroke:"orange", lineTypeName:"DASHED"})
  const line2 = sheet0.addFig("line", {points:[[500,500],[0,500]]} )

  const sheet1 = miniJscad.sketch.screen.addSheet("sheet1", null, {stroke: "red", fill:"green"}, null)
  const line3 = sheet1.addDimension("vertical", {points:[[0, 0], [0, 500]], distance:-30, fontSize:30, digit:2, auxiliary:true})

  sheet0.hide()
  sheet0.show()
}
 
const thirdDrow = () =>{
  const sheet2 = miniJscad.sketch.screen.addSheet("sheet2" )
  const bspline1 = sheet2.addFig("bspline", {points: [[0,0],[0,100],[100,100], [100,0]], degree:3, knots:[0,0,0,0,1,1,1,1]})
}


const resize = ()=> {
  const minijscadTest = document.getElementById("frame")
  const width = minijscadTest.getBoundingClientRect().width  
  const height = minijscadTest.getBoundingClientRect().height 
  console.log("resize",width, height)
  miniJscad.resize(width-50, height-50)
}


document.getElementById("read-dxf").onchange = (e) =>{
  const file = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (eve) => {
    const text = eve.target.result  

    const parser = new DxfParser()
    const dxf = parser.parseSync(text)
    console.log("dxf", dxf)
    readDXF = dxf

    const param = getParamFromDxf(text)
    console.log("param", param)
    const svg = dxftosvg(text)
    
    const existFlag = miniJscad.sketch.screen.hasSheet("sheetRead")
    if(existFlag){
      miniJscad.sketch.screen.removeSheet("sheetRead")
    }
    const sheetRead = miniJscad.sketch.screen.addSheet("sheetRead")
    param.forEach(v=>{
      sheetRead.addFig(v.type, v.param, v.attr)
    })
  }
  reader.readAsText(file, "UTF-8")    

  drawFlag = true
}

const setUpEvent = () => {
  document.getElementById("download-dxf").onclick = () =>{
    const param = miniJscad.sketch.screen.getAllSheetsParam()
    console.log("param", param)

    const filename = "mini.dxf"
    const exportFileBOM = true
    const exportText = getDxf(param)
    const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'})
    saveAs(blob, filename,exportFileBOM)

  }
  
  document.getElementById("clear").onclick = () =>{
    if(drawFlag){
      clearSheets()
      drawFlag = false
    }
  }
  
  document.getElementById("draw").onclick = () =>{
    if(!drawFlag){
      initialDraw()
      drawFlag = true
    }
  }
  
  document.getElementById("hide-dimension").onclick = () =>{
    const sheets = miniJscad.sketch.screen.getAllSheets()
    sheets.forEach(v=>v.hideAllDimensions())
  }
  
  document.getElementById("show-dimension").onclick = () =>{
    const sheets = miniJscad.sketch.screen.getAllSheets()
    sheets.forEach(v=>v.showAllDimensions())
  }
  
  document.getElementById("backgroundColor").onchange = (e) =>{
    const value = e.target.value
    console.log(value)
    miniJscad.sketch.setBackgroundColor(value)
  }
}

const initialize = () => {

  setUpMiniJscad()
  setUpEvent()
  initialDraw()
//  clearSheets()
//  secondDraw()
//  clearSheets()
//  thirdDraw()
  drawFlag = true
  
  window.onresize = resize
}


initialize()
