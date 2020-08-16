import {view} from "../view.js"
import {model} from "../model.js"

export const screenFunc = {
  setScreen:{
    execute:function(){
      const width =view.elements.drawing.getBoundingClientRect().width 
      const height = view.elements.drawing.getBoundingClientRect().height
      //model.sketch.setScreenSize(width, height)
      model.sketch.resize(width, height)
    }
  },
  resize: {
    execute: function(){
      const width = view.elements.body.getBoundingClientRect().width
        - view.elements.aside.getBoundingClientRect().width
      const height = view.elements.drawing.getBoundingClientRect().height
      model.sketch.resize(width, height)
    },
  }, 
}

