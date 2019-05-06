import {model} from "../model.js"
import {view} from "../view.js"

export const coordinate = {
  display:{
    execute: function(e){
      model.coordinate.display.execute(e)
    },
    add:function(){
      const dom = view.elements.drawing 
      dom.addEventListener("sketch.mouse.move", this.execute)
    }
  }
}
