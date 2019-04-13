import {view} from "../view.js"
import {model} from "../model.js"

export const keyFunc = {
  keyDown:{
    execute:function(e){
      model.keyFunc.keyDown.execute(e)
    },
    add: function(){
      document.onkeydown = this.execute
    },
  },
}

