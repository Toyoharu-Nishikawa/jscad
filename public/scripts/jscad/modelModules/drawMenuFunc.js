import {view} from "../view.js"
import {model} from "../model.js"

export const drawMenuFunc = {
  line:{
    execute: function(){
      sketch.drawLine()
    },
  },
  polyline:{
    execute: function(){
      sketch.drawPolyline()
    },
  },
  circle: {
    execute: function(){
      const i = sketch.currentSheetNumber
      const fig = sketch.draw.screen.sheet[i].circle().draw().fill("none")
      sketch.temp =fig 
      sketch.drawMode ="circle" 
      sketch.continuous(model.drawMenuFunc.circle.execute)
    },
  },
  arc: {
    execute: function(){
      const i = sketch.currentSheetNumber
      const fig = sketch.draw.screen.sheet[i].circle().draw().fill("none")
      sketch.temp =fig 
      sketch.drawMode ="arc" 
      sketch.continuous(model.drawMenuFunc.circle.execute)
    },
  },
  resize: {
    execute:function(){
      sketch.drawMode="resize"
    },
  },
  verticalD: {
    execute: function(){
      sketch.setVerticalD()
    },
  },
  horizontalD: {
    execute: function(){
      sketch.setHorizontalD()
    },
  },
  angleD: {
    execute: function(){
      console.log("angleD")
    }
  },
  vertical:{
    execute: function(){
      sketch.setVertical()
    },
  },
  horizontal:{
    execute: function(){
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
      sketch.setCoincident()
    },
  }
}
