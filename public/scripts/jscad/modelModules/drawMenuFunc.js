import {view} from "../view.js"
import {model} from "../model.js"

export const drawMenuFunc = {
  line:{
    execute: function(){
      const sheet = sketch.getCurrentSheet()
      const fig = sheet.line().draw()
      fig.on("drawstart",(e)=>{
        sketch.setDrawStartFlag(true)
        console.log("dragstart", "line")
      })
      fig.on("drawstop",(e)=>{
        console.log("dragstop", "line")
        if(sketch.drawStartFlag){
          const points = fig.array().valueOf()
          fig.remove()
          sketch.addFig("line", [].concat(...points))
          drawMenuFunc.line.execute()
        }
        sketch.setDrawStartFlag(false)
      })
      sketch.setTmp(fig)
      sketch.setDrawMode("line")
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
      const selected = sketch.selected
      if(selected.length !==1){
        console.log("have to select a element before doing")
        return
      }

      const source = {
        idF : selected[0].data("idF").idF ,
        element: "start" ,
      }

      const target = {
        idF : selected[0].data("idF").idF ,
        element: "end" ,
      }

      sketch.addConstraint("vertical",source, target )
      sketch.solve()

      console.log("vertical")
    },
  },
  horizontal:{
    execute: function(){
      const selected = sketch.selected
      if(selected.length !==1){
        console.log("have to select a element before doing")
        return
      }

      const source = {
        idF : selected[0].data("idF").idF ,
        element: "start" ,
      }

      const target = {
        idF : selected[0].data("idF").idF ,
        element: "end" ,
      }

      sketch.addConstraint("horizontal",source, target )
      sketch.solve()
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
      //sketch.drawMode="coincident"

      const selected = sketch.selected
      if(selected.length !==2){
        console.log("have to select 2 elements before doing")
        return
      }

      const source = {
        idF : selected[0].data("idF").idF ,
        element: selected[0].data("info").pointType ,
      }

      const target = {
        idF : selected[1].data("idF").idF ,
        element: selected[1].data("info").pointType ,
      }

      sketch.addConstraint("coincident",source, target )
      console.log("coincident")
      sketch.solve()
    }
  }
}
