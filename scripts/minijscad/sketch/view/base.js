export const Base = class {
  constructor(draw){
    this.figs = this.initialize(draw) 
  }
  initialize(draw){
    const base = draw.group() 
 
    const XAXIS = base.line(-1000, 0, 1000, 0)
      .attr("stroke-dasharray","5 5")
      .data("id",{id: "XAXIS", type:"line"})
  
    const YAXIS = base.line(0, -1000, 0, 1000)
      .attr("stroke-dasharray","5 5")
      .data("id",{id: "YAXIS", type:"line"})
  
 
    return base
  }
  setAttr(attr){
    const figs = this.figs
    figs.attr(attr)
  }
}
