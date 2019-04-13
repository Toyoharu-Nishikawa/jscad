import {view} from "../view.js"
import {model} from "../model.js"

export const editorFunc = {
  resize: {
    execute:function(){
      model.editorFunc.resize.execute()
    },
    add: function(){
      window.addEventListener("resize",this.execute,false);
    },
  },
}

