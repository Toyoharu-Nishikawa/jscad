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
  
  miniJscad = new MiniJscad("minijscad-test", width-50, height-50)
  const version = miniJscad.version
  console.log("version", version)
  
  miniJscad.sketch.setBackgroundColor("default")
}

const initialDraw = () =>{
  /*** sheet0 samples of entries ***/
  const sheet0 = miniJscad.sketch.screen.addSheet("sheet0")

  const text0_0 = sheet0.addText({text:"sheet0 samples of entries", position:[10,210],font: {size: 10,"stroke-width":0.1}})
  const outline0_0 = sheet0.addFig("polyline", {points:[[0,0],[150,0],[150,230],[0,230],[0,0]]},{stroke:"green", "stroke-width":2})

  const text0_1 = sheet0.addText({text:"line", position:[10,185],font: {size: 10,"stroke-width":0.1}})
  const fig0_1    = sheet0.addFig("line", {points:[[60,190],[90,190]]})

  const text0_2 = sheet0.addText({text:"polyline", position:[10,160],font: {size: 10,"stroke-width":0.1}})
  const fig0_2    = sheet0.addFig("polyline", {points:[[50,160],[60,170],[70,160],[80,170],[90,160]]})

  const text0_3 = sheet0.addText({text:"bspline", position:[10,130],font: {size: 10,"stroke-width":0.1}})
  const fig0_3    = sheet0.addFig("bspline", {points:[[50,130],[60,140],[70,130],[80,140],[90,130]],degree:3,knots:[0,0,0,0,0.5,1,1,1,1], segments:100})

  const text0_4 = sheet0.addText({text:"circle", position:[10,100],font: {size: 10,"stroke-width":0.1}})
  const fig0_4    = sheet0.addFig("circle", {center:[70,105],radius:15})

  const text0_5 = sheet0.addText({text:"ellipse", position:[10,70],font: {size: 10,"stroke-width":0.1}})
  const fig0_5    = sheet0.addFig("ellipse", {center:[70,75],radius:[15,10]})

  const text0_6 = sheet0.addText({text:"arc", position:[10,45],font: {size: 10,"stroke-width":0.1}})
  const fig0_6    = sheet0.addFig("arc", {center:[70,45],radius:15,start:0,end:180})

  const text0_7 = sheet0.addText({text:"ellipticalArc", position:[10,15],font: {size: 10,"stroke-width":0.1}})
  const fig0_7    = sheet0.addFig("ellipticalArc", {center:[80,15],radius:[15,20],start:0,end:180})

  /*** sheet1 samples of attributes ***/
  /* linetTypeName list
   * "CENTER"       : "____ _ ____"
   * "CENTER2"      : "____ _ ____"
   * "CENTERX2"     : "____ _ ____"
   * "DASHED"       : "__  __"
   * "DASHED2"      : "__  __"
   * "DASHEDX2"     : "__  __"
   * "PHANTOM"      : "____ _ _ ____"
   * "PHANTOM2"     : "____ _ _ ____"
   * "PHANTOMX2"    : "____ _ _ ____"
   * "DASHDOT"      : "__ . __ . __"
   * "DASHDOT2"     : "__ . __ . __"
   * "DASHDOTX2"    : "__ . __ . __"
   * "DOT"          : ".  . ."
   * "DOT2"         : ".  . ."
   * "DOTX2"        : ".  . ."
   * "DIVIDE"       : "__ . . __"
   * "DIVIDE2"      : "__ . . __"
   * "DIVIDEX2"     : "__ . . __"
   */
 


  const sheet1 = miniJscad.sketch.screen.addSheet("sheet1",{stroke:"orange"})
  const text1_0 = sheet1.addText({text:"sheet1 samples of attributes", position:[210,210],font: {size: 10,"stroke-width":0.1}})
  const text1_1 = sheet1.addText({text:"default color of sheet is orange", position:[210,200],font: {size: 10,"stroke-width":0.1}})
  const outline1_0 = sheet1.addFig("polyline", {points:[[200,0],[350,0],[350,230],[200,230],[200,0]]},{stroke:"green", "stroke-width":2})


  const fig1_1 = sheet1.addFig("line", {points:[[210,190],[260,190]]})
  const fig1_2 = sheet1.addFig("line", {points:[[210,180],[260,180]]}, {stroke:"black", "stroke-width":4,lineTypeName:"CONTINUOUS"})
  const fig1_3 = sheet1.addFig("line", {points:[[210,170],[260,170]]}, {stroke:"red", lineTypeName:"DASHED"})
  const fig1_4 = sheet1.addFig("line", {points:[[210,160],[260,160]]}, {stroke:"black",lineTypeName:"DIVIDE"})
  const fig1_5 = sheet1.addFig("line", {points:[[210,150],[260,150]]}, {stroke:"black",lineTypeName:"CENTER"})
  const fig1_6 = sheet1.addFig("line", {points:[[210,140],[260,140]]}, {stroke:"black",lineTypeName:"PHANTOM"})
  const fig1_7 = sheet1.addFig("circle", {center:[230,120],radius:10}, {stroke:"red", fill: "blue","stroke-width":3})
  const text1_2 = sheet1.addText({text:"sample text", position:[210,90],font: {size: 12,"stroke-width":0.3,fill:"blue",stroke:"red"}})

  /*** sheet2 sample of dimensions ***/
  const sheet2 = miniJscad.sketch.screen.addSheet("sheet2")
  const text2_0 = sheet1.addText({text:"sheet2 samples of dimensions", position:[410,210],font: {size: 10,"stroke-width":0.1}})
  const outline2_0 = sheet1.addFig("polyline", {points:[[400,0],[550,0],[550,230],[400,230],[400,0]]},{stroke:"green", "stroke-width":2})


  const fig2_1 = sheet2.addFig("line", {points:[[430,160],[460,190]]})
  const dim2_0 = sheet2.addDimension("aligned", 
    {
      points:[[430,160],[460,190]],
      distance:-10, offsetX:0, offsetY:0,
      alternativeText:""
    },
    {
      prefix:"L",suffix:"mm",
      showAuxiliaryLines:true, showStartSideArrow:true, showTerminalSideArrow:true,
      font:{"font-size":5,"stroke-width":0.1},
      decimalPlaces:2
    }
  )

  const dim2_1 = sheet2.addDimension("vertical", 
    {
      points:[[430,160],[460,190]],
      distance:10, offsetX:0, offsetY:0,
      alternativeText:""
    },
    {
      prefix:"V",suffix:"mm",
      showAuxiliaryLines:true, showStartSideArrow:true, showTerminalSideArrow:true,
      font:{"font-size":5,"stroke-width":0.1},
      decimalPlaces:2
    }
  )

  const dim2_2 = sheet2.addDimension("horizontal", 
    {
      points:[[430,160],[460,190]],
      distance:10, offsetX:0, offsetY:0,
      alternativeText:""
    },
    {
      prefix:"H",suffix:"mm",
      showAuxiliaryLines:true, showStartSideArrow:true, showTerminalSideArrow:true,
      font:{"font-size":5,"stroke-width":0.1},
      decimalPlaces:2
    }
  )

  const fig2_2 = sheet2.addFig("line", {points:[[430,130],[460,130]]})
  const fig2_3 = sheet2.addFig("line", {points:[[430,120],[460,120]]},{lineTypeName:"DASHDOT"})
  const fig2_4 = sheet2.addFig("line", {points:[[430,110],[460,110]]})

  const dim2_3 = sheet2.addDimension("vertical", 
    {points:[[440,110],[440,130]],distance:0},
    {
     prefix:"Φ",showAuxiliaryLines:false, 
     font:{"font-size":3,"stroke-width":0.1},
     decimalPlaces:0
    }
  )
  const dim2_4 = sheet2.addDimension("vertical", 
    {points:[[450,120],[450,130]],distance:0,alternativeText:"Φ20"},
    {
     prefix:"Φ",showAuxiliaryLines:false, showStartSideArrow:false,
     font:{"font-size":3,"stroke-width":0.1},
     decimalPlaces:0
    }
  )

  const fig2_5 = sheet2.addFig("circle", {center:[450,80],radius:20})
  const dim2_5 = sheet2.addDimension("diameter", 
    {center:[450,80],radius:20,angle:45},
    {
     font:{"font-size":3,"stroke-width":0.1},
     decimalPlaces:0
    }
  )
  const fig2_6 = sheet2.addFig("arc", {center:[500,80],radius:20,start:0,end:90})
  const dim2_6 = sheet2.addDimension("radius", 
    {center:[500,80],radius:20,angle:45},
    {
     font:{"font-size":3,"stroke-width":0.1},
     decimalPlaces:0
    }
  )

  const fig2_7 = sheet2.addFig("line", {points:[[430,20],[460,20]]})
  const fig2_8 = sheet2.addFig("line", {points:[[430,20],[460,50]]})
  const dim2_7 = sheet2.addDimension("angle", 
    {center:[430,20],radius:20,start:0,end:45},
    {
     font:{"font-size":3,"stroke-width":0.1},
     decimalPlaces:0
    }
  )

 //   const prefix = dimStyle?.prefixText || ""
 //   const suffix = dimStyle?.suffixText || ""
 //   const showAuxiliaryLines = dimStyle?.showAuxiliaryLines || true
 //   const showStartSideArrow = dimStyle?.showStartSideArrow || true
 //   const showTerminalSideArrow = dimStyle?.showTerminalSideArrow || true
 //   const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
 //   const size = font?.["font-size"] || 20
 //   const decimalPlaces = dimStyle.decimalPlaces || 2

//  const line0_1     = sheet0.addFig("line", {points:[[100,0],[100,100]]}, {stroke:"red", lineTypeName:"DASHED"})
//
//  const arc1  = sheet0.addFig("arc", {center:[150,100], radius:50, start:90, end:180})
//  
//  const ellipse1 =sheet0.addFig("ellipse", {center:[350,100], radius:[100,50], rotation: 45})
//  const rec1 =sheet0.addFig("rectangle", {width: 100, height: 500, center:[0,100], rotation: 30})
//  const polygon1 =sheet0.addFig("polygon", {points:[[0,0],[45,45],[-100,45],[-100,0]]})
//
//  const rotAngle = 45 
//  const rotAngleRad = rotAngle*Math.PI/180
//  const line3 =sheet0.addFig("line", {points:[[0,0],[300*Math.cos(rotAngleRad), 300*Math.sin(rotAngleRad)]]})
//  const line4 =sheet0.addFig("line", {points:[[0,0],[-100*Math.sin(rotAngleRad), 100*Math.cos(rotAngleRad)]]})
//  const ellipticalArc1 =sheet0.addFig("ellipticalArc", {center:[0,0],radius:[300,100],rotation:rotAngle,start:0,end:90})
//
//  const lineTmp1 = sheet0.addFig("line", {points:[[0,0],[200,200]]})
//  const lineTmp2 = sheet0.addFig("line", {points:[[0,0],[300,200]]})
//  const lineTmp3 = sheet0.addFig("line", {points:[[0,0],[400,200]]})
//  sheet0.removeFig(lineTmp1)
//  sheet0.removeFig(lineTmp2.id)
//  lineTmp3.hide()
//  lineTmp3.show()
//
//  sheet0.hideAllFigs()
//  sheet0.showAllFigs()



  
//  const dim1 =  sheet0.addDimension("horizontal", {points:[[150, 150], [2000, 500]], distance:300, font:{"font-size":100}, digit:2, auxiliary:true}, {},"1850.00mm")
//  const dim2 =  sheet0.addDimension("vertical", {points:[[100, 0], [100, 100]], distance:30, fontSize:30, digit:2, offset:-10,auxiliary:true})
//  const dim3 =  sheet0.addDimension("length", {points:[[150, 100], [150-25*Math.sqrt(2), 100+25*Math.sqrt(2)]], distance:0,  digit:3, auxiliary:false})
//
//  const lines1 = sheet0.addFig("lines", {points:[[2000,500],[2000,600],[1500,600],[1500,500] ]}, {stroke:"black", lineTypeName:"CONTINUOUS"})
//  const polyline1 = sheet0.addFig("polyline", {points:[[1500,500],[1000,500],[1000,600],[500,500] ]}, {stroke:"#FF00FF", lineTypeName:"DOT"})
//  //const circle1 = sheet0.addFig("circle", {center:[1500,500], radius: 200}, {stroke:"#10AA05", lineTypeName:"DIVIDE"})
//  const circle1 = sheet0.addFig("circle", {center:[1500,500], radius: 200}, {stroke:"green", lineTypeName:"DIVIDE"})
//  //const circle2 = sheet0.addFig("circle", {center:[1000,900], radius: 100},{"stroke-width":1})
//  const circle2 = sheet0.addFig("circle", {center:[1000,900], radius: 100})
//  const ellipse2 = sheet0.addFig("ellipse", {center:[1000,900], radius: [200,100]})
////  const dimCircle =  sheet0.addDimension("diameter", {points:[1000,900], distance:50, font:{"font-size":100, "stroke-width":0.001}, digit:3, auxiliary:true}, {fill:"green"})
//
//  const lineTmp5 = sheet0.addFig("line", {points:[[400,0],[400,200]]})

//  /*** sheet1 ***/
//  const sheet1 = miniJscad.sketch.screen.addSheet("sheet1", {stroke: "#FFBF00", "stroke-dasharray": "DIVIDE"})
//  const arc2 = sheet1.addFig("arc", {center:[250,100], radius:50, start:180, end:90}, {stroke:"orange",fill:"green", lineTypeName:"PHANTOM"})
//
//  const arc3 = sheet1.addFig("arc", {center:[350,100], radius:50, start:0, end:180})
//  const arc4 = sheet1.addFig("arc", {center:[450,100], radius:50, start:180, end:0})
//  const arc5 = sheet1.addFig("arc", {center:[550,100], radius:50, start:0, end:270})
//  const arc6 = sheet1.addFig("arc", {center:[650,100], radius:50, start:270, end:0})
//
//  /*** sheet2 ***/
//  const sheet2 = miniJscad.sketch.screen.addSheet("sheet2" )
//  const bspline1 = sheet2.addFig("bspline", {points: [[0,0],[0,100],[100,-100], [200,0]], degree:3, knots:[0,0,0,0,1,1,1,1],segments:100})
//
//
//  /*** sheet3 ***/
//  const sheet3 = miniJscad.sketch.screen.addSheet("sheet3",  {}, {stroke: "orange", fill:"red"}, {} )
//  const lineTmp10 = sheet3.addFig("line", {points:[[-100,0],[-100,500]]})
//  const dim4 =  sheet3.addDimension("length", {points:[[-100, 0], [-100, 500]], distance:-100,  digit:3, auxiliary:true})
//
//  const dim5 =  sheet3.addDimension("length", {points:[[4, 0], [4, 2]], distance:-10, font:{"font-size":0.1, "stroke-width":0.001}, digit:3, auxiliary:true}, {fill:"green"},"5mm")
//
//  sheet3.hideAllDimensions()
//  sheet3.showAllDimensions()
//
//  
//  /*** sheet4 ***/
//  const sheet4 = miniJscad.sketch.screen.addSheet("sheet4",  {}, {}, {stroke:"fuchsia", fill:"fuchsia"} )
//  const text1 = sheet4.addText({text:"minijscad", position:[500,100], theta: 45, font: {size: 40}})
//  const text2 = sheet4.addText({text:"hello world", position:[1000,0], theta: 0, font: {size: 15}}, {stroke: "red", fill: "red"})
//  const text3 = sheet4.addText({text:"style test", position:[0,0], theta: 0, font: {size: 20}}, {stroke: "red", fill: "red"})
//
//
//  
//  sheet4.hideAllTexts()
//  sheet4.showAllTexts()
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
