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
  remove(id){
    const selected = this.figsData.getDataFromId(id)
    const clone = this.clonesData.getDataFromId(id)
    const nodes = this.nodesData.getDataFromId(id)
    const figsAttr = this.figsAttrData.getDataFromId(id)
    const constraint = figsAttr.constraint
    selected.remove()
    clone.remove()
    nodes.forEach(node=>node.remove())

    constraint.forEach((id, key)=>{
      switch(key){
        case "verticalD" :
        case "horizontalD": {
          const label = this.dimensionsLabelData.getDataFromId(id)
          label.remove()
          this.dimensionsLabelData.removeData(id)
          this.dimensionsData.removeData(id)
          break
        }
        case "vertical" :
        case "horizontal": 
        case "coincident": { 
          this.constrainsData.removeData(id)
          break
        }
      }  
    })
    this.figsData.removeData(id)
    this.clonesData.removeData(id)
    this.nodesData.removeData(id)
 
  }
} 
