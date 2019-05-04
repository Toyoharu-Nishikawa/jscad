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
          if(sketch.drawObj.getStartFlag()){
            sketch.drawCancel()
          }
          else{
            sketch.drawOff()
          }
          model.propertyFunc.cancel.execute()
          sketch.selected.unselectAll()
          sketch.dimensionsSelected.unselectAll()
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
          sketch.selected.getArray().forEach(selected=>{
            const id = selected.data("id").id
            selected.remove()
            sketch.clonesData.getDataFromId(id).remove()
            sketch.nodesData.getDataFromId(id).forEach(node=>{
              node.remove()
            })
          })
        }   
        default:
          break;
      }//end of switch
    },//end of execute
  },//end of keyDown
}

