import {view} from "../view.js"
import {model} from "../model.js"

export const toolBarFunc = {
  run: {
    execute: function (){
      model.toolBarFunc.run.execute()
    },//end of execute
    add: function(){
      view.elements.run.onclick = this.execute
    },
  },//end of run
}

