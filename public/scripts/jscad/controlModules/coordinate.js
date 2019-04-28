import {model} from "../model.js"

export const coordinate = {
  display:{
    execute: function(e){
      model.coordinate.display.execute(e)
    },
    add:function(){
      document.addEventListener("sketch.mouse.move", this.execute)
    }
  }
}
