import {addExtendElements} from "./extra.js"
import {Base} from "./base.js"
import {Screen} from "./screen.js"

export const Svg = class{
  constructor(elem, width=500, height=500){
    addExtendElements()


    const backgroundColor = "default"
    const draw = SVG(elem).panZoom({zoomMode:"exponential", zoomFactor:1.1})
    const screen = new Screen(draw, backgroundColor) 
    const base = new Base(draw) 


    this.element = elem
    this.backgroundColor = backgroundColor
    this.draw = draw
    this.screen = screen 
    this.base = base


    this.setScreenSize(width, height)
    this.setBackgroundColor(backgroundColor)
    this.setEvent()

  }
  setScreenSize(width, height){
    this.draw.width(width);
    this.draw.height(height);
    this.draw.attr('preserveAspectRatio', 'xMinYMin slice');
    const style = "margin:0; padding:0;"
    this.draw.attr("style" ,style)

    this.draw.viewbox(0, 0, width,height).flip('y')
  }
 
  setBackgroundColor(color){
    this.backgroundColor = color
    this.screen.setBackgroundColor(color)

    const colorParam = color === "default" ? "background:linear-gradient(to bottom, white, RoyalBlue)" : 
      `background:${color}`
    this.draw.attr("style" ,colorParam)

    if(color==="black"||color==="#000000"|| color==="#000"){
      this.screen.setAttr({stroke: "green", fill:"white"})
      this.base.setAttr({stroke: "white", fill:"white"})
      const allSheets = this.screen.getAllSheets()
      allSheets.forEach(v=>{
        v.dimensions.fill("white").stroke("white")
        v.texts.fill("white").stroke("white")
        v.setBackgroundColor(color)
      })
    }
    else{
      this.screen.setAttr({stroke: "blue", fill:"black"})
      this.base.setAttr({stroke: "black", fill:"black"})
      const allSheets = this.screen.getAllSheets()
      allSheets.forEach(v=>{
        v.dimensions.fill("black").stroke("black")
        v.texts.fill("black").stroke("black")
        v.setBackgroundColor(color)
      })
    }
  }

  resize(width, height){
    this.draw.width(width)
    this.draw.height(height)
  }
  setEvent(){
    const elem = this.element
    const dom = document.getElementById(elem)
    const draw = this.draw
    draw.mousemove(function(e){
      const point = this.point()
      const coord = {
        x: point.x+e.clientX/draw.zoom(),
        y: point.y-e.clientY/draw.zoom()
      }
      const ev = new CustomEvent("sketch.mouse.move", {detail:coord})
      dom.dispatchEvent(ev)
    })
  }
}

