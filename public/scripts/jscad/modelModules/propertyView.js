import {model} from "../model.js"

export const propertyView = {
  setEvent: function(){
    this.select.add()
  },
  select:{
    execute: function(e){
      sketch.selected.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
      model.propertyFunc.select.execute()
    },
    add: function(){
      sketch.draw.on("dimensionlabelclick", this.execute)
    },
  },
}
 
