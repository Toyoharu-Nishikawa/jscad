import {Basic} from "./basic.js"
import * as DataClass from "./data.js"

export const Figs = class extends Basic {
  constructor(elem){
    super(elem)
    this.backgroundData = new DataClass.DataManager()
    this.figsData = new DataClass.countUpDataManager()
    this.initialParameters = {
      param: new DataClass.DataManager(),
      valid: new DataClass.DataManager(),
    }
    this.degreesOfFreedom = new DataClass.Degrees()
    this.figsAttrData = new DataClass.DataManager()

    this.initializeBackground()
  }

  initializeBackground(){
    const draw = this.draw
    const background = this.background
 
    const XAXIS = background.line(-1000, 0, 1000, 0)
      .attr("stroke-dasharray","5 5")
      .data("id",{id: "XAXIS", type:"line"})
    const XAXISClone = this.makeClone(XAXIS, 10) 
  
    const YAXIS = background.line(0, -1000, 0, 1000)
      .attr("stroke-dasharray","5 5")
      .data("id",{id: "YAXIS", type:"line"})
    const YAXISClone = this.makeClone(YAXIS, 10) 
  
    const ORIGIN = background.circle(10).center(0,0)
      .fill("black")
      .data("id",{id: "ORIGIN", type:"circle"})

    this.addElementEvent(XAXIS, XAXISClone)  
    this.addElementEvent(YAXIS, YAXISClone)  
    this.addNodeEvent(ORIGIN)  

    this.backgroundData.addData("XAXIS", XAXIS)
    this.backgroundData.addData("YAXIS", YAXIS)
    this.backgroundData.addData("ORIGIN", ORIGIN) 
  
    return background
  }

  drawLine(){
      const sheet = this.getCurrentSheet()
      const fig = sheet.line().draw()
      fig.on("drawstart",(e)=>{
        this.drawObj.setStartFlag(true)
        console.log("dragstart", "line")
      })
      fig.on("drawstop",(e)=>{
        console.log("dragstop", "line")
        if(this.drawObj.getStartFlag()){
          const points = fig.array().valueOf()
          fig.remove()
          this.addFig("line", [].concat(...points))
          this.drawLine()
        }
        sketch.drawObj.setStartFlag(false)
      })
      this.drawObj.setTemp(fig)
      this.drawObj.setMode("line")
  }

  drawPolyline(){
      const sheet = this.getCurrentSheet()
      const draw = this.draw
      const fig = sheet.polyline().draw()
      const keyDown = (e)=>{
        if(e.keyCode===13){
          fig.draw("done")
          fig.off("drawstart")
        } 
      }
      fig.on("drawstart",(e)=>{
        this.drawObj.setStartFlag(true)
        console.log("dragstart", "line")
        document.addEventListener("keydown",keyDown,{once:true})
      })
      fig.on("drawstop",(e)=>{
        console.log("dragstop", "line")
        if(this.drawObj.getStartFlag()){
          const points = fig.array().valueOf()
          console.log(points)
          fig.remove()
          document.removeEventListener("keydown",keyDown)
          const lines = points.map((v,i,arr)=>i>0?[arr[i-1],v]:0).slice(1)
          const lineFigs =lines.map(v=>this.addFig("line", [].concat(...v)))
          lineFigs.forEach((v,i,arr)=>{
            if(i>0){
              const sourceId = arr[i-1].data("id").id
              const targetId = v.data("id").id
              const source = {id:sourceId ,element:"end"}
              const target = {id:targetId ,element:"start"}
              this.addConstraint("coincindent", source, target)
            }
          }) 
          this.drawPolyline()
        }
        this.drawObj.setStartFlag(false)
      })
      this.drawObj.setTemp(fig)
      this.drawObj.setMode("line")
  }

  addFig(type, parameters, idF){
    switch(type){
      case "line":{
        const fig = this.addLine(...parameters, idF)
        return fig
        break
      }
      case "arc":{
        const fig = this.addArc(...parameters, idF)
        return fig
        break
      }
      default:{
      }
    }
  }
  changeFig(id, params){
    const fig = this.figsData.getDataFromId(id) 
    const type = fig.data("id").type
    switch(type){
      case "line":{
        this.changeLine(id, ...params)
        break
      }
    }
  }

  addLine(x1, y1, x2, y2, id){
    const sheet = this.getCurrentSheet()
    const fId = id ? id : this.figsData.getId()
    this.figsData.setId(fId)
    const line = sheet.line(x1, y1, x2, y2)
    line.data("id",{id:fId, type:"line"})
    line.data("parameters",
      {x1:null, y1:null, x2:null, y2:null, angle:null, length:null})
    const p1 = [x1, y1]
    const p2 = [x2, y2]
    line.data("nodes",[p1, p2])
    const pointType =  ["start", "end"]
    this.makeClone(line, 5)
    this.makeNodes(line, pointType)
    this.figsData.addData(fId, line)
    this.initialParameters.param.addData(fId, [x1, y1, x2, y2])
    this.initialParameters.valid.addData(fId, [true, true, true, true])
    this.degreesOfFreedom.increase(4)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("line"),
      constraint: new Map(),
    }
    this.figsAttrData.addData(fId, attr)
    return line
  }
  changeLine(id, x1,y1,x2,y2){
    const line = this.figsData.getDataFromId(id)
    const cloneLine = this.clonesData.getDataFromId(id)
    const nodes = this.nodesData.getDataFromId(id)
    line.plot(x1, y1, x2, y2)
    cloneLine.plot(x1, y1, x2, y2)
    nodes[0].center(x1, y1)
    nodes[1].center(x2, y2)
  }
  addArc(cx, cy, r, theta1, theta2, id){
    const sheet = this.getCurrentSheet()
    const figId = id ? id : this.getFigId()
    this.setFigId(figId)
    const arc = sheet.arc(cx, cy, r, theta1, theta2)
    arc.data("id",{id:figId, type:"arc"})
    arc.data("parameters",{cx:cx, cy:cy, r:r, theta1:theta1, theta2: theta2})
    const c = [cx, cy]
    const p1 = [cx+r*Math.cos(theta1), cy+r*Math.sin(theta1)]
    const p2 = [cx+r*Math.cos(theta2), cy+r*Math.sin(theta2)]
    arc.data("nodes",[ c, p1, p2 ])
    const pointType =  ["center", "start", "end"]
    this.addEvent(arc, pointType)
    return arc 
  }
}
