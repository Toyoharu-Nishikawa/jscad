import {Svg} from "./view/svg.js"
import {Background} from "./view/background.js"
import {Figs} from "./view/figs.js"
import {DimensionsLabel} from "./view/dimensionsLabel.js"


export const View = class  {
  constructor(elem){
    this.svg = new Svg(elem) 
    this.background = new Background(this.svg) 
    this.figs = new Figs(this.svg) 
    this.dimensionsLabel = new DimensionsLabel(this.svg) 
    this.initializeZoomEvent()
  }
  initializeZoomEvent(){
    const draw = this.svg.draw
    const element = this.svg.element
    const dom = document.getElementById(element)
    draw.on("zoom",(e)=>{
      const origin = this.background.backgroundData.getDataFromId("ORIGIN")
      const circles = this.figs.eH.nodesData.getValues()
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

  drawLine(){
    this.figs.drawLine()
  }

  unselectAll(){
    this.figs.eH.selected.unselectAll()
    //this.dimensions.eH.selected.unselectAll()
  }


} 
