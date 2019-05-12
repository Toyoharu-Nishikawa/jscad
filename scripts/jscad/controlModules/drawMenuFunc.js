import {view} from "../view.js"
import {model} from "../model.js"

export const  drawMenuFunc = {
  line:{
    execute: function(){
     model.drawMenuFunc.line.execute()
    },
    add: function(){
      view.elements.line.onclick = this.execute
    },
  },
  polyline:{
    execute: function(){
     model.drawMenuFunc.polyline.execute()
    },
    add: function(){
      view.elements.polyline.onclick = this.execute
    },
  },
  circle:{
    execute: function(){
      model.drawMenuFunc.circle.execute()
    },
    add: function(){
      view.elements.circle.onclick = this.execute
    },
  },
  arc:{
    execute: function(){
     model.drawMenuFunc.circle.execute()
    },
    add: function(){
      view.elements.arc.onclick = this.execute
    },
  },
  resize: {
    execute:function(){
     model.drawMenuFunc.resize.execute()
    },
    add:function(){
      view.elements.resize.onclick=this.execute
    }
  },
  verticalD: {
    execute:function(){
      model.drawMenuFunc.verticalD.execute()
    },
    add:function(){
      view.elements.verticalD.onclick=this.execute
    }
  },
  horizontalD: {
    execute:function(){
     model.drawMenuFunc.horizontalD.execute()
    },
    add:function(){
      view.elements.horizontalD.onclick=this.execute
    }
  },
  angleD: {
    execute:function(){
     model.drawMenuFunc.angleD.execute()
    },
    add:function(){
      view.elements.angleD.onclick=this.execute
    }
  },
  vertical: {
    execute:function(){
     model.drawMenuFunc.vertical.execute()
    },
    add:function(){
      view.elements.vertical.onclick=this.execute
    }
  },
  horizontal: {
    execute:function(){
     model.drawMenuFunc.horizontal.execute()
    },
    add:function(){
      view.elements.horizontal.onclick=this.execute
    }
  },
  coincident: {
    execute:function(){
     model.drawMenuFunc.coincident.execute()
    },
    add:function(){
      view.elements.coincident.onclick=this.execute
    }
  },
}

