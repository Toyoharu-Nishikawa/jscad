import {view} from "../view.js"
import {model} from "../model.js"

export const slidebar = {
  slide:{
    originY:null,
    drawHeight:null,
    mouseDown: function(e){
      this.originY =  e.clientY
      this.drawHeight = view.elements.drawing.clientHeight
      view.elements.main.onmousemove = this.mouseMove
    },
    mouseUp: function(e){
      this.originY =  null
      view.elements.main.onmousemove = null 
    },
    mouseMove: function(e){
      const currentY =  e.clientY
      const originY = model.slidebar.slide.originY
      const drawHeight = model.slidebar.slide.drawHeight
      const deltaY = currentY - originY
      const newHeight =  drawHeight + deltaY
      const text = `${newHeight}px`
      view.elements.drawing.style.height = text
      model.screenFunc.resize.execute()
      model.editor.resize()
     // window.dispatchEvent(new Event('resize'))
    },
  }
}
