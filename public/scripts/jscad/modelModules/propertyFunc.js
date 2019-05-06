import {view} from "../view.js"

export const propertyFunc = {
  select: {
    execute:function(){
      const selected = sketch.dimensionsSelected.getArray()
      const id = selected[0].data("id").id
      const cons = sketch.dimensionsData.getDataFromId(id)
      const value = cons[0].value
      console.log(value)
  
      const inputElem = view.elements.dimensionInput
      inputElem.value = value
    }
  },
  ok:{
    execute: function(e){
      const inputElem = view.elements.dimensionInput
      const value = parseFloat(inputElem.value)

      const selected = sketch.dimensionsSelected.getArray()
      const id = selected[0].data("id").id

      sketch.changeDimension(id, value)
//      sketch.dimensionsSelected.unselectAll()
    },
  },
  cancel:{
    execute: function(){
      const inputElem = view.elements.dimensionInput
      inputElem.value = ""
      sketch.dimensionsSelected.unselectAll()
      console.log("cancel")
    },
  }
}

