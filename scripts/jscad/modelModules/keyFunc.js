import {view} from "../view.js"
import {model} from "../model.js"

export const keyFunc = {
  keyDown:{
    execute: function(e){
      switch(e.keyCode){
        //keydown shift + Enter
        case 13:{
          if(e.shiftKey){
            console.log("shift+Enter")
            model.toolBarFunc.run.execute()
          }
          break;
        }
        //keydown ESC
        case 27:{
          console.log("ESC")
          model.doc.allCancel.execute(e);
          if(document.activeElement != model.editor.textInput.getElement()){
            model.editor.selection.clearSelection(); 
          }
          if(sketch.drawStartFlag){
            sketch.cancel()
          }
          else{
            sketch.drawOff()
          }
          sketch.unselectAll(e)
          if(sketch.drawMode==="resize"){
            sketch.resizeFig.forEach((resizeFig)=>{
              resizeFig.selectize(false,{deepSelect:true}).resize("stop")
              sketch.clone.get(resizeFig).attr(
                resizeFig.attr() 
              )
            })
            sketch.resizeFig=[]
            sketch.drawMode=null
          }
          break;
        }
        //keydown Del
        case 46:{
          sketch.selected.forEach(selected=>{
            if(selected.data("info").type==="edge"){
              selected.remove()
              sketch.clone.get(selected).remove()
              sketch.nodes.get(selected).forEach(node=>{
                node.remove()
              })
            }
          })
        }   
        default:
          break;
      }//end of switch
    },//end of execute
  },//end of keyDown
}

