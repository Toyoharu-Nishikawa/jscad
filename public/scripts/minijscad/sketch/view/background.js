import * as DataClass from "../data.js"
import {EventHandler} from "./eventHandler.js"

export const Background = class {
  constructor(svg){
    this.background = svg.background
    this.backgroundNode = svg.backgroundNode
    this.eH = new EventHandler(svg.draw, svg.cloneScreen, svg.nodeScreen) 
    this.backgroundData = new DataClass.DataManager()
    this.initializeBackground()
  }
  initializeBackground(){
    const background = this.background
    const backgroundNode = this.backgroundNode
    const eH = this.eH
 
    const XAXIS = background.line(-1000, 0, 1000, 0)
      .attr("stroke-dasharray","5 5")
      .data("id",{id: "XAXIS", type:"line"})
    eH.makeClone(XAXIS, 10, "XAXIS", "elementclick") 
  
    const YAXIS = background.line(0, -1000, 0, 1000)
      .attr("stroke-dasharray","5 5")
      .data("id",{id: "YAXIS", type:"line"})
    eH.makeClone(YAXIS, 10,"YAXIS", "elementclick") 
  
    const ORIGIN = backgroundNode.circle(10).center(0,0)
      .data("id",{id: "ORIGIN", type:"circle"})

    eH.addNodeEvent(ORIGIN, "nodeclick", "ORIGIN")  

    this.backgroundData.addData("XAXIS", XAXIS)
    this.backgroundData.addData("YAXIS", YAXIS)
    this.backgroundData.addData("ORIGIN", ORIGIN) 
  
    return background
  }

}
