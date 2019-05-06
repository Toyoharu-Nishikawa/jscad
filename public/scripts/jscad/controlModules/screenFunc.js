
import {view} from "../view.js"
import {model} from "../model.js"

export const screenFunc = {
  resize: {
    execute:function(){
      model.screenFunc.resize.execute()
    },
    add: function(){
      window.addEventListener("resize",this.execute,false);
    },
  },
}

