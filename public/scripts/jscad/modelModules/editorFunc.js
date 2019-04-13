import {view} from "../view.js"
import {model} from "../model.js"

export const editorFunc = {
  setEditor:{
    execute: function(){
      model.editor.setKeyboardHandler("ace/keyboard/vim");
      model.editor.getSession().setMode("ace/mode/javascript");
      model.editor.on("blur", (e, editor)=> {
        if(document.activeElement != editor.textInput.getElement()){
          editor.selection.clearSelection(); 
        }
      })
    },
  },
  resize: {
    execute:function(){
    },
  },
}
