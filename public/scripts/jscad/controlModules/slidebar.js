import {view} from "../view.js"
import {model} from "../model.js"

export const slidebar = {
  slide:{
    mouseDown:function(e){
      model.slidebar.slide.mouseDown(e)
    },
    mouseUp:function(e){
      model.slidebar.slide.mouseUp(e)
    },
    add: function(){
      view.elements.slidebar.onmousedown=this.mouseDown
      view.elements.slidebar.onmouseup=this.mouseUp
    },
  },
}

