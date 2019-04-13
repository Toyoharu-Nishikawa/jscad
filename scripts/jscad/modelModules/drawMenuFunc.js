import {view} from "../view.js"
import {model} from "../model.js"

export const drawMenuFunc = {
  line:{
    execute: function(){
      const i = sketch.currentSheetNumber
      const fig = sketch.draw.screen.sheet[i].line().draw()
      sketch.temp =fig 
      sketch.drawMode ="line" 
      sketch.continuous(model.drawMenuFunc.line.execute)
    },
  },
  polyline:{
    execute: function(){
      const fig = sketch.draw.screen.sheet[0].polyline().draw()
      sketch.temp =fig 
      sketch.continuous(model.drawMenuFunc.polyline.execute)
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
  rectangle: {
    execute: function(){
      const fig = sketch.draw.screen.sheet[0].rect().draw().fill("none")
      sketch.temp =fig 
      sketch.drawMode ="rectangle" 
      sketch.continuous(model.drawMenuFunc.rectangle.execute)
    },
  },
  resize: {
    execute:function(){
      sketch.drawMode="resize"
    },
  },
  vertical:{
    execute: function(){
      sketch.drawMode="vertical"
      sketch.vertical.execute()
      console.log("vertical")
    },
  },
  horizontal:{
    execute: function(){
      sketch.drawMode="horizontal"
      sketch.horizontal()
      console.log("horizontal")
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
      sketch.drawMode="coincident"
      sketch.coincident.execute()
      console.log("coincident")
    }
  }
}
