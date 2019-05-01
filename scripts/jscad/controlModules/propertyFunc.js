import {view} from "../view.js"
import {model} from "../model.js"

export const  propertyFunc = {
  input: {
    execute: function(e){
      e.stopPropagation()
      e.preventDefault
    },
    add: function(){
      view.elements.dimensionInput.onclick = this.execute
    },
  },
  ok:{
    execute: function(e){
      e.stopPropagation()
      e.preventDefault()
      sketch.selected.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
      model.propertyFunc.ok.execute()
    },
    add: function(){
      view.elements.propertyOK.onclick = this.execute
    },
  },
  cancel:{
    execute: function(e){
      sketch.selected.unselectAll()
      sketch.dimensionsSelected.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
      model.propertyFunc.cancel.execute()
    },
    add: function(){
      view.elements.propertyCancel.onclick = this.execute
    },
  }
}
