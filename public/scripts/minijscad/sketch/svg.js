import * as SVGALL from '../@svgdotjs/svg.js/dist/svg.esm.js'
import '../@svgdotjs/svg.panzoom.js/dist/svg.panzoom.esm.js'

import {addExtendElements} from "./extra.js"
import {Base} from "./base.js"
import {Screen} from "./screen.js"

export const Svg = class{
  constructor(elementDOM, width=500, height=500){
    addExtendElements(SVGALL)

    const backgroundColor = "default"
    //const draw = SVGALL.SVG().addTo(elementDOM).panZoom({zoomMode:"exponential", zoomFactor:1.1})
    const draw = SVGALL.SVG().addTo(elementDOM).panZoom({zoomFactor:0.1})
    const screen = new Screen(draw, backgroundColor) 
    const base = new Base(draw) 


    this.elementDOM = elementDOM 
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
    this.draw.transform({a: 1, b: 0, c: 0, d: -1, e: 0, f: 0})
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
    this.draw.viewbox(0, 0, width,height)
  }
  setEvent(){
    const elementDOM = this.elementDOM
    const draw = this.draw
    draw.mousemove(function(e){
      const point = this.point()
      const coord = {
        x: point.x+e.clientX/draw.zoom(),
        y: point.y-e.clientY/draw.zoom()
      }
      const ev = new CustomEvent("sketch.mouse.move", {detail:coord})
      elementDOM.dispatchEvent(ev)
    })
  }
}

