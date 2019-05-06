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
    const element = this.element
    const dom = document.getElementById(element)
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
      dom.dispatchEvent(ev)
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
          const lineFigsId =lines.map(v=>this.addFig("line", [].concat(...v)))
          lineFigsId.forEach((v,i,arr)=>{
            if(i>0){
              const sourceId = arr[i-1]
              const targetId = v
              const source = {id:sourceId ,element:"end"}
              const target = {id:targetId ,element:"start"}
              this.addConstraint("coincident", source, target)
            }
          }) 
          this.drawPolyline()
        }
        this.drawObj.setStartFlag(false)
      })
      this.drawObj.setTemp(fig)
      this.drawObj.setMode("line")
  }

} 
