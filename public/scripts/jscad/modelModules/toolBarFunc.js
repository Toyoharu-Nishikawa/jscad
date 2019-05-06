import {model} from "../model.js"

export const toolBarFunc = {
  run:{
    execute:function(){
      const code = model.editor.getValue();
      new Function(code)()
    }
  }
}

