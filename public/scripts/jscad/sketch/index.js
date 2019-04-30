import {Constraints} from "./class/constraints.js"


export const Sketch = class extends Constraints {
  constructor(elem){
    super(elem)
    this.initializeZoomEvent()
  }
  import(json){
    const figs = json.figs 
    const constraints = json.constraints
    const dimensions = json.dimensions
    figs.forEach(v=>this.addFig(v.id, v.type, v.parameters))
  }
  export(){
  }

  initializeZoomEvent(){
    const draw = this.draw

    draw.on("zoom",(e)=>{
      const origin = this.backgroundData.getDataFromId("ORIGIN")
      const circles = this.nodesData.getValues()
      origin.radius(5.0/draw.zoom())
      circles.forEach(v=>v.forEach(u=>u.radius(2.5/draw.zoom())))
    })

    draw.mousemove(function(e){
      const point = this.point()
      const coord = {
        x: point.x+e.clientX/draw.zoom(),
        y: point.y-e.clientY/draw.zoom()
      }
      const ev = new CustomEvent("sketch.mouse.move", {detail:coord})
      document.dispatchEvent(ev)
    })
    draw.click(function(e){
      const point = this.point(e.screenX, e.screenY)
      console.log(point, e.screenX, e.screenY)
    })
  }

} 
