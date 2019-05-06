import {view} from "../view.js"
import {model} from "../model.js"

export const  drawMenuFunc = {
  line:{
    execute: function(){
      sketch.selected.unselectAll()
      sketch.dimensionsSelected.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.line.execute()
    },
    add: function(){
      view.elements.line.onclick = this.execute
    },
  },
  polyline:{
    execute: function(){
      sketch.selected.unselectAll()
      sketch.dimensionsSelected.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.polyline.execute()
    },
    add: function(){
      view.elements.polyline.onclick = this.execute
    },
  },
  circle:{
    execute: function(){
      sketch.selected.unselectAll()
      sketch.drawOff()
      sketch.drawCancel()
      model.drawMenuFunc.circle.execute()
    },
    add: function(){
      view.elements.circle.onclick = this.execute
    },
  },
  arc:{
    execute: function(){
      sketch.selected.unselectAll()
      sketch.drawOff()
      sketch.drawCancel()
      model.drawMenuFunc.circle.execute()
    },
    add: function(){
      view.elements.arc.onclick = this.execute
    },
  },
  resize: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.resize.execute()
    },
    add:function(){
      view.elements.resize.onclick=this.execute
    }
  },
  verticalD: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.verticalD.execute()
    },
    add:function(){
      view.elements.verticalD.onclick=this.execute
    }
  },
  horizontalD: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.horizontalD.execute()
    },
    add:function(){
      view.elements.horizontalD.onclick=this.execute
    }
  },
  angleD: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.angleD.execute()
    },
    add:function(){
      view.elements.angleD.onclick=this.execute
    }
  },
  vertical: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.vertical.execute()
    },
    add:function(){
      view.elements.vertical.onclick=this.execute
    }
  },
  horizontal: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.horizontal.execute()
    },
    add:function(){
      view.elements.horizontal.onclick=this.execute
    }
  },
  coincident: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
      model.drawMenuFunc.coincident.execute()
    },
    add:function(){
      view.elements.coincident.onclick=this.execute
    }
  },
}

