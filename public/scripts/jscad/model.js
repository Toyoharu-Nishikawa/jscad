import {view} from "./view.js"
import * as modelModules from "./modelModules/index.js"
import {Sketch} from "../minijscad/sketch/index.js"

"use strict"

export const model = {
  sketch: null,
  editor: null,
  initialize: function(){
    const editor = ace.edit('editor')
    const sketch = new Sketch("drawing")
    this.editor = editor
    this.sketch = sketch
    window.sketch = sketch

    this.screenFunc.setScreen.execute()
    this.editorFunc.setEditor.execute()
    this.mainMenuView.setEvent()
    this.drawMenuView.setEvent()
    this.propertyView.setEvent()
    this.test()
  },
  doc: modelModules.doc,
  mainMenuView: modelModules.mainMenuView,
  mainMenuFunc: modelModules.mainMenuFunc,
  toolBarFunc:modelModules.toolBarFunc,
  drawMenuView: modelModules.drawMenuView,
  drawMenuFunc: modelModules.drawMenuFunc,
  propertyView: modelModules.propertyView,
  propertyFunc: modelModules.propertyFunc,
  screenFunc: modelModules.screenFunc,
  slidebar: modelModules.slidebar,
  coordinate: modelModules.coordinate,
  editorFunc: modelModules.editorFunc,
  keyFunc: modelModules.keyFunc,
  test:function(){
    sketch.addFig("line",[0,10,100,120], 0)
//    sketch.addFig("line",[110,100,240,220], 1)
    sketch.addFig("arc",[100,100,50,0, 180], 1)
    sketch.changeFig(0,[110,300,240,320])
    sketch.changeFig(1, [300,200,100,0, 180])
//    sketch.addFig("arc",[100,100,50,0, 180], 2)
//    sketch.addFig("arc",[200,100,150,0, 180], 3)

//    sketch.addConstraint("coincident", {id:0, element:"end"}, {id:1, element:"start"}, 0)
//    sketch.addConstraint("horizontal", {id:1, element:"start"}, {id:1, element:"end"}, 1)

//    sketch.nodeScreen.hide()
//    sketch.clonesData.getValues().forEach(v=>v.hide())
//    sketch.addDimension("horizontal", {idF:"YAXIS", element:"edge"}, {idF:0, element:"start"},50, 0)
//    sketch.addDimension("vertical", {idF:"XAXIS", element:"edge"}, {idF:0, element:"start"},200, 1)
//    sketch.addDimension("horizontal", {idF:0, element:"start"}, {idF:0, element:"end"}, 100, 2)
//    sketch.addDimension("vertical", {idF:0, element:"start"}, {idF:0, element:"end"}, 50, 3)
//    sketch.addDimension("horizontal", {idF:1, element:"start"}, {idF:1, element:"end"}, 100, 4)
   // sketch.solve()
    console.log("sketch", sketch)

  }
}

