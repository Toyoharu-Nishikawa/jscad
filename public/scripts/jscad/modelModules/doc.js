import {view} from "../view.js"
import {model} from "../model.js"

export const doc = {
  click:{
    execute:function(e){
      doc.allCancel.execute(e)
    },
  },
  allCancel:{
    execute:function(e){
      if(view.tempElement){
        view.tempElement.notSelected()
      }
      if(!e.ctrlKey){
        sketch.unselectAll()
      }
      model.propertyFunc.cancel.execute()
      view.tempElement = null
      model.mainMenuView.hover.flag = false
    },
  },
}

