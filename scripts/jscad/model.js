import {view} from "./view.js"
import * as modelModules from "./modelModules/index.js"
import {sketch} from "./sketch.js"

"use strict"

export const model = {
  sketch: null,
  editor: null,
  initialize: function(){
    const editor = ace.edit('editor')
    this.editor = editor
    this.sketch = sketch
    window.sketch = model.sketch
 
    this.screenFunc.setScreen.execute()
    this.editorFunc.setEditor.execute()
    this.mainMenuView.setEvent()
    this.drawMenuView.setEvent()
 },
  doc: modelModules.doc,
  mainMenuView: modelModules.mainMenuView,
  mainMenuFunc: modelModules.mainMenuFunc,
  toolBarFunc:modelModules.toolBarFunc,
  drawMenuView: modelModules.drawMenuView,
  drawMenuFunc: modelModules.drawMenuFunc,
  screenFunc: modelModules.screenFunc,
  slidebar: modelModules.sliebar,
  editorFunc: modelModules.editorFunc,
  keyFunc: modelModules.keyFunc,
}

