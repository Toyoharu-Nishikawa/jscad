import {view} from "./view.js"
import {model} from "./model.js"

import * as controlModules from "./controlModules/index.js"

/******************************************************/
/*                control                             */
/******************************************************/
"use strict"

export const control = {
  initialize: function(){
    const controls = [
      controlModules.doc, 
      controlModules.mainMenuView, 
      controlModules.mainMenuFunc,
      controlModules.toolBarFunc, 
      controlModules.drawMenuView,
      controlModules.drawMenuFunc,
      controlModules.screenFunc, 
      controlModules.slidebar,
      controlModules.editorFunc, 
      controlModules.keyFunc,
    ] 
    controls.forEach(control =>{
      for(let any in control){
        control[any].add()
      }
    })
    //add draw to window property for dyamic scripting
    model.initialize()
  },
}


