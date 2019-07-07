import {MiniJscad} from "./minijscad/index.js"

const minijscadTest = document.getElementById("frame")
const width = minijscadTest.getBoundingClientRect().width  
const height = minijscadTest.getBoundingClientRect().height 
console.log(width, height)
const miniJscad = new MiniJscad("minijscad-test", width-50, height-50)
  .hideEventObject()


console.log(miniJscad)

console.log(miniJscad.sketch.getAllSheetIds())
console.log(miniJscad.sketch.getCurrentSheetId())
const sheet1 = miniJscad.sketch.addSheet("sheet1")

const id1 = miniJscad.sketch.addFig("line", {points:[[100,0],[100,100]]})
const id2 =miniJscad.sketch.addFig("arc", {center:[150,100], radius:50, start:90, end:180})
const id3 =  miniJscad.sketch.addFig("line", {points:[[150,150],[2000,500]]})
const id4 =miniJscad.sketch.addFig("arc", {center:[250,100], radius:50, start:180, end:90})
const id5 =miniJscad.sketch.addFig("arc", {center:[350,100], radius:50, start:0, end:180})
const id6 =miniJscad.sketch.addFig("arc", {center:[450,100], radius:50, start:180, end:0})
const id7 =miniJscad.sketch.addFig("arc", {center:[550,100], radius:50, start:0, end:270})
const id8 =miniJscad.sketch.addFig("arc", {center:[650,100], radius:50, start:270, end:0})
const id9 =miniJscad.sketch.addFig("lines", {points:[[2000,500],[2000,600],[1500,600],[1500,500] ]})

const idD1 =  miniJscad.sketch.addDimension("horizontal", {points:[[150, 150], [2000, 500]], distance:300, fontSize:100, digit:2, auxiliary:true})
const idD2 =  miniJscad.sketch.addDimension("vertical", {points:[[100, 0], [100, 100]], distance:30, fontSize:30, digit:2, auxiliary:true})
const idD3 =  miniJscad.sketch.addDimension("length", {points:[[150, 100], [150-25*Math.sqrt(2), 100+25*Math.sqrt(2)]], distance:0, fontSize:30, digit:2, auxiliary:false})
//miniJscad.sketch.remove(id1)
console.log(id1, id2, id3)
console.log(miniJscad.sketch.getAllSheets())

const resize = ()=> {
  const minijscadTest = document.getElementById("frame")
  const width = minijscadTest.getBoundingClientRect().width  
  const height = minijscadTest.getBoundingClientRect().height 
  console.log(width, height)
  miniJscad.sketch.resize(width-50, height-50)
}

window.onresize = resize

document.getElementById("download-dxf").onclick = () =>{
  const exportText = miniJscad.sketch.getDxf()
  const filename = "mini.dxf"
  const exportFileBOM = true
  const blob = new Blob([exportText], {type: 'text/plain; charset=utf-8'})
  saveAs(blob, filename,exportFileBOM)
 
}
