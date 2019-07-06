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
const id1 = miniJscad.sketch.addFig("line", [100,0,100,100])
const id2 =miniJscad.sketch.addFig("arc", [150,100,50,180, 90])
const id3 =  miniJscad.sketch.addFig("line", [150,150,2000,500])
const idD1 =  miniJscad.sketch.addDimension("horizontal", 150, 150, 2000, 500, 300, 100, 2, true)
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
