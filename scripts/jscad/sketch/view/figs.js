import * as DataClass from "../data.js"
import {EventHandler} from "./eventHandler.js"
import {arcPath} from "./arcPath.js"

export const Figs = class {
  constructor(svg){
    this.svg = svg
    this.eH = new EventHandler(svg.draw, svg.cloneScreen, svg.nodeScreen) 
    this.data = new DataClass.countUpDataManager()
  }

  remove(id){
    const selected = this.data.getDataFromId(id)
    const clone = this.eH.clonesData.getDataFromId(id)
    const nodes = this.eH.nodesData.getDataFromId(id)

    selected.remove()
    clone.remove()
    nodes.forEach(node=>node.remove())

    this.data.removeData(id)
    this.eH.clonesData.removeData(id)
    this.eH.nodesData.removeData(id)
  }


  addLine(sheet, x1, y1, x2, y2, id){
    this.data.setId(id)
    const line = sheet.line(x1, y1, x2, y2)
    line.data("id",{id:id, type:"line"})
    const p1 = [x1, y1]
    const p2 = [x2, y2]
    const nodes = [p1, p2]
    line.data("nodes",nodes)
    const pointType =  ["start", "end"]
    this.eH.makeClone(line, 5, id, "elementclick")
    this.eH.makeNodes(nodes, pointType, id, "nodeclick")

    this.data.addData(id, line)
  }

  changeLine(id, x1,y1,x2,y2){
    const line = this.data.getDataFromId(id)
    const cloneLine = this.eH.clonesData.getDataFromId(id)
    const nodes = this.eH.nodesData.getDataFromId(id)
    line.plot(x1, y1, x2, y2)
    cloneLine.plot(x1, y1, x2, y2)
    nodes[0].center(x1, y1)
    nodes[1].center(x2, y2)
    return id
  }

  addArc(sheet, cx, cy, r, theta1, theta2, id){
    this.data.setId(id)
    const arc = sheet.arc(cx, cy, r, theta1, theta2)
    arc.data("id",{id:id, type:"arc"})
    arc.data("parameters",{cx:cx, cy:cy, r:r, theta1:theta1, theta2: theta2})
    const c = [cx, cy]
    const p1 = [cx+r*Math.cos(theta1*Math.PI/180), cy+r*Math.sin(theta1*Math.PI/180)]
    const p2 = [cx+r*Math.cos(theta2*Math.PI/180), cy+r*Math.sin(theta2*Math.PI/180)]
    const nodes = [ c, p1, p2 ]
    arc.data("nodes",nodes)
    const pointType =  ["center", "start", "end"]
    this.eH.makeClone(arc, 5, id, "elementclick")
    this.eH.makeNodes(nodes, pointType, id, "nodeclick")
    this.data.addData(id, arc)
  }

  changeArc(id, cx, cy, r, theta1, theta2){
    const arc = this.data.getDataFromId(id)
    const cloneArc = this.eH.clonesData.getDataFromId(id)
    const nodes = this.eH.nodesData.getDataFromId(id)
    console.log(arc)
    console.log(cloneArc)
    const pathText = arcPath(cx, cy, r, theta1, theta2)
    arc.attr({d:pathText})
    cloneArc.attr({d:pathText})
    const c = [cx, cy]
    const p1 = [cx+r*Math.cos(theta1*Math.PI/180), cy+r*Math.sin(theta1*Math.PI/180)]
    const p2 = [cx+r*Math.cos(theta2*Math.PI/180), cy+r*Math.sin(theta2*Math.PI/180)]
    nodes[0].center(c[0], c[1])
    nodes[1].center(p1[0], p1[1])
    nodes[2].center(p2[0], p2[1])
    return id
  }
 
}
