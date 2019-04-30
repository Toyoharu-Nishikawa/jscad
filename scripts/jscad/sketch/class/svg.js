import {addExtendElements} from "./extra.js"

const  freedomMap = new Map([ 
  ["point", 2],
  ["line", 4],
  ["arc", 5],
  ["circle", 3],
])

export const Svg = class {
  constructor(elem){
    this.draw = SVG(elem).panZoom({zoomFactor:1.1})
    addExtendElements()
  }
  setScreenSize(width, height){
    this.draw.width(width);
    this.draw.height(height);
    this.draw.attr('preserveAspectRatio', 'xMinYMin slice');
    this.draw.style( {
      border: '1px solid #F5F5F5',
      margin:0,
      padding:0,
      background:'linear-gradient(to bottom, white, RoyalBlue )'
    })
    this.draw.viewbox(0, 0, width,height).flip('y')
  }
  resize(width, height){
    this.draw.width(width)
    this.draw.height(height)
  }
}

