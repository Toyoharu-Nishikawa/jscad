import {view} from "../view.js"
import {model} from "../model.js"

export const drawMenuFunc = {
  line:{
    execute: function(){
      sketch.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.drawLine()
    },
  },
  polyline:{
    execute: function(){
      sketch.selected.unselectAll()
      sketch.dimensionsSelected.unselectAll()
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.drawPolyline()
    },
  },
  circle: {
    execute: function(){
      sketch.selected.unselectAll()
      sketch.drawOff()
      sketch.drawCancel()
 
      const i = sketch.currentSheetNumber
      const fig = sketch.draw.screen.sheet[i].circle().draw().fill("none")
      sketch.temp =fig 
      sketch.drawMode ="circle" 
      sketch.continuous(model.drawMenuFunc.circle.execute)
    },
  },
  arc: {
    execute: function(){
      sketch.selected.unselectAll()
      sketch.drawOff()
      sketch.drawCancel()
 
      const i = sketch.currentSheetNumber
      const fig = sketch.draw.screen.sheet[i].circle().draw().fill("none")
      sketch.temp =fig 
      sketch.drawMode ="arc" 
      sketch.continuous(model.drawMenuFunc.circle.execute)
    },
  },
  resize: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.drawMode="resize"
    },
  },
  verticalD: {
    execute: function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.setVerticalD()
    },
  },
  horizontalD: {
    execute: function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.setHorizontalD()
    },
  },
  angleD: {
    execute: function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      console.log("angleD")
    }
  },
  vertical:{
    execute: function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.setVertical()
    },
  },
  horizontal:{
    execute: function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.setHorizontal()
    },
  },
  parallel:{
    execute: function(){
      sketch.drawMode="parallel"
      sketch.parallel()
      console.log("parallel")
    },
  },
  rightangle:{
    execute: function(){
      sketch.drawMode="rightangle"
      sketch.rightangle()
      console.log("rightangle")
    },
  },
  coincident: {
    execute:function(){
      sketch.drawCancel()
      sketch.drawOff()
 
      sketch.setCoincident()
    },
  }
}
