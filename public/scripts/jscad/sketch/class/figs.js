import {Basic} from "./basic.js"

export const Figs = class extends Basic {
  constructor(elem){
    super(elem)
    this.freedomDegree=0
    this.initialParameters= new Map()
    this.initialParametersValid = new Map()
  }
  increaseFreedomDegree(num){
    this.freedomDegree += num   
  }
  decreaseFreedomDegree(num){
    this.freedomDegree -= num   
  }
  getFreedomDegree(num){
    return this.freedomDegree    
  }
  setInitialParameters(id, parameters){
    this.initialParameters.set(id, parameters)
  }
  getInitialParametersMap(){
    return this.initialParameters
  }
  setInitialParametersValid(id, parameters){
    this.initialParametersValid.set(id, parameters)
  }
  getInitialParametersValid(id){
    return this.initialParametersValid.get(id)
  }
  getInitialParametersValidMap(){
    return this.initialParametersValid
  }
  addLine(x1, y1, x2, y2, idF){
    const sheet = this.getCurrentSheet()
    const figId = idF ? idF : this.getFigId()
    this.setFigId(figId)
    const line = sheet.line(x1, y1, x2, y2)
    line.data("idF",{idF:figId, type:"line"})
    line.data("parameters",
      {x1:null, y1:null, x2:null, y2:null, angle:null, length:null})
    const p1 = [x1, y1]
    const p2 = [x2, y2]
    line.data("nodes",[p1, p2])
    const pointType =  ["start", "end"]
    this.addEvent(line, pointType)
    this.addFigMap(figId, line)
    this.setInitialParameters(figId, [x1, y1, x2, y2])
    this.setInitialParametersValid(figId, [true, true, true, true])
    this.increaseFreedomDegree(4)
    return line
  }
  changeLine(idF, x1,y1,x2,y2){
    const line = this.getFigFromId(idF)
    const cloneLine = this.getCloneFigFromId(idF)
    const nodes = this.getNodesFromId(idF)
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
