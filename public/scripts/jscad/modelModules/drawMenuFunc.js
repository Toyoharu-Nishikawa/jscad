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
      const sheet = sketch.getCurrentSheet()
      const draw = sketch.draw
      const fig = sheet.polyline().draw()
      const keyDown = (e)=>{
        if(e.keyCode===13){
          fig.draw("done")
          fig.off("drawstart")
        } 
      }
      fig.on("drawstart",(e)=>{
        sketch.setDrawStartFlag(true)
        console.log("dragstart", "line")
        document.addEventListener("keydown",keyDown,{once:true})
      })
      fig.on("drawstop",(e)=>{
        console.log("dragstop", "line")
        if(sketch.drawStartFlag){
          const points = fig.array().valueOf()
          console.log(points)
          fig.remove()
          document.removeEventListener("keydown",keyDown)
          const lines = points.map((v,i,arr)=>i>0?[arr[i-1],v]:0).slice(1)
          const lineFigs =lines.map(v=>sketch.addFig("line", [].concat(...v)))
          lineFigs.forEach((v,i,arr)=>{
            if(i>0){
              const sourceId = arr[i-1].data("idF").idF
              const targetId = v.data("idF").idF
              const source = {idF:sourceId ,element:"end"}
              const target = {idF:targetId ,element:"start"}
              sketch.addConstraint("coincindent", source, target)
            }
          }) 
          drawMenuFunc.polyline.execute()
        }
        sketch.setDrawStartFlag(false)
      })
      sketch.setTmp(fig)
      sketch.setDrawMode("line")

      //const fig = sketch.draw.screen.sheet[0].polyline().draw()
      //sketch.temp =fig 
      //sketch.continuous(model.drawMenuFunc.polyline.execute)
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
      console.log("verticalD")
      this.run()
      const draw = sketch.draw
      draw.on("nodeclick",this.run)
      draw.on("elementclick",this.run)
    },
    run: function(){
      const selected = sketch.selected
      if(selected.length !==1 && selected.length !==2){
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
      const p = selected[0].array().valueOf()
      console.log(p)
      const value = p[1][1] - p[0][1]
      const makePath = (p)=>{
        const text = `M ${p[0]} ${p[1]} L ${p[2]} ${p[3]}`
        return text
      }

      const x1 = Math.max(p[0][0], p[1][0]) + 30
      const x2 = x1
      const y1 = (p[0][1] + p[1][1])/2
      const y2 = p[1][1] 
      const minY = Math.min(p[0][1] , p[1][1])
      const maxY = Math.max(p[0][1] , p[1][1])
      const textPath = makePath([x1,y1,x2,y2]) 
      console.log(value)
      const ds = sketch.dimensionScreen
      const sc = sketch.screen
      const valueText = String(value)
      const text = ds.text(valueText)
        .flip("y").rotate(90).translate(x1, y1)
      const l1 = ds.line(p[0][0],p[0][1], x1+15,p[0][1] )
      const l2 = ds.line(p[1][0],p[1][1], x2+15,p[1][1] )
      const l3 = ds.line(x1, p[0][1], x2, p[1][1] )
      const a1 = ds.line(0, 0, 5, 5).rotate(90).translate(x1, minY)
      const a2 = ds.line(0, 0, 5, -5).rotate(90).translate(x1, minY)
      const a3 = ds.line(0, 0, -5, 5).rotate(90).translate(x2, maxY)
      const a4 = ds.line(0, 0, -5, -5).rotate(90).translate(x2, maxY)
      sketch.addDimension("vertical",source, target, value )
      sketch.unselectAll()
      sketch.solve()
      console.log("verticalD")

    },
  },
  horizontalD: {
    execute: function(){
      console.log("horizontalD")
      this.run()
      const draw = sketch.draw
      draw.on("nodeclick",this.run)
      draw.on("elementclick",this.run)
    },
    run: function(){
      const selected = sketch.selected
      if(selected.length !==1 && selected.length !==2){
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
      const p = selected[0].array().valueOf()
      console.log(p)
      const value = p[1][0] - p[0][0]
     
      const x1 = (p[0][0] + p[1][0])/2

      const x2 = p[1][0] 
      const y1 = Math.min(p[0][1], p[1][1]) - 30
      const y2 = y1 
      const minX = Math.min(p[0][0] , p[1][0])
      const maxX = Math.max(p[0][0] , p[1][0])
      const ds = sketch.dimensionScreen
      const valueText = String(value)
      const text = ds.text(valueText)
        .flip("y").translate(x1, y1)
      const l1 = ds.line(p[0][0], p[0][1], p[0][0], y1-15 )
      const l2 = ds.line(p[1][0], p[1][1], p[1][0], y2 -15 )
      const l3 = ds.line(p[0][0], y1, p[1][0], y2 )
      const a1 = ds.line(0, 0, 5, 5).translate(minX, y1)
      const a2 = ds.line(0, 0, 5, -5).translate(minX, y1)
      const a3 = ds.line(0, 0, -5, 5).translate(maxX, y2)
      const a4 = ds.line(0, 0, -5, -5).translate(maxX, y2)
      sketch.addDimension("horizontal",source, target, value )
      sketch.unselectAll()
      sketch.solve()
      console.log("horizontalD")
    },
  },
  angleD: {
    execute: function(){
      console.log("angleD")
    }
  },
  vertical:{
    execute: function(){
      this.run()
      const draw = sketch.draw
      draw.on("nodeclick",this.run)
      draw.on("elementclick",this.run)
    },
    run: function(){
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
      sketch.unselectAll()
      sketch.solve()
      console.log("vertical")
    },
  },
  horizontal:{
    execute: function(){
      this.run()
      const draw = sketch.draw
      draw.on("nodeclick",this.run)
      draw.on("elementclick",this.run)
    },
    run: function(){
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
      sketch.unselectAll()
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
      this.run()
      const draw = sketch.draw
      draw.on("nodeclick",this.run)
      draw.on("elementclick",this.run)

    },
    run:function(){
      const selected = sketch.selected
      if(selected.length !==2){
        console.log("have to select 2 elements before doing")
        console.log(selected.length)
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
      sketch.unselectAll()
      sketch.solve()
    }
  }
}
