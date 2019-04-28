import {view} from "../view.js"
import {model} from "../model.js"

export const  drawMenuFunc = {
  line:{
    execute: function(){
      model.sketch.unselectAll()
      model.sketch.drawOff()
      model.drawMenuFunc.line.execute()
    },
    add: function(){
      view.elements.line.onclick = this.execute
    },
  },
  polyline:{
    execute: function(){
      model.sketch.cancel()
      model.sketch.drawOff()
      model.drawMenuFunc.polyline.execute()
    },
    add: function(){
      view.elements.polyline.onclick = this.execute
    },
  },
  circle:{
    execute: function(){
      model.sketch.drawOff()
      model.sketch.cancel()
      model.drawMenuFunc.circle.execute()
    },
    add: function(){
      view.elements.circle.onclick = this.execute
    },
  },
  rectangle:{
    execute: function(e){
      model.sketch.cancel()
      model.sketch.drawOff()
      model.drawMenuFunc.rectangle.execute(e)
    },
    add: function(){
      view.elements.rectangle.onclick = this.execute
    },
  },
  resize: {
    execute:function(){
      model.sketch.cancel()
      model.sketch.drawOff()
      model.drawMenuFunc.resize.execute()
    },
    add:function(){
      view.elements.resize.onclick=this.execute
    }
  },
  vertical: {
    execute:function(){
      model.sketch.cancel()
      model.sketch.drawOff()
      model.drawMenuFunc.vertical.execute()
    },
    add:function(){
      view.elements.vertical.onclick=this.execute
    }
  },
  horizontal: {
    execute:function(){
      model.sketch.cancel()
      model.sketch.drawOff()
      model.drawMenuFunc.horizontal.execute()
    },
    add:function(){
      view.elements.horizontal.onclick=this.execute
    }
  },
  coincident: {
    execute:function(){
      model.sketch.cancel()
      model.sketch.drawOff()
      model.drawMenuFunc.coincident.execute()
    },
    add:function(){
      view.elements.coincident.onclick=this.execute
    }
  },

}

