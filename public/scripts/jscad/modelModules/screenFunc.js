import {view} from "../view.js"
import {model} from "../model.js"

export const screenFunc = {
  setScreen: {
    execute:function(){
      const width =view.elements.drawing.getBoundingClientRect().width 
      const height = view.elements.drawing.getBoundingClientRect().height
      const draw = sketch.draw
      draw.width(width);
      draw.height(height);
      draw.attr('preserveAspectRatio', 'xMinYMin slice');
      draw.style( {
        border: '1px solid #F5F5F5',
        margin:0,
        padding:0,
        background:'linear-gradient(to bottom, white, RoyalBlue )'
      })
      draw.viewbox(0, 0, width,height).flip('y')
      draw.background = draw.group()
        .stroke({color:"black",opacity: 1.0,width:1})
        .fill("black")
        .attr("vector-effect", "non-scaling-stroke")

      const horizontal = draw.background.line(-1000, 0, 1000, 0)
        .attr("stroke-dasharray","5 5")
        .data("info",{type:"horizontal"})
      this.setBackLine(horizontal) 

      const vertical = draw.background.line(0, -1000, 0, 1000)
        .attr("stroke-dasharray","5 5")
        .data("info",{type:"vertical"})
      this.setBackLine(vertical) 

      const origin = draw.background.circle(10).center(0,0)
        .fill("black")
        .data("info",{type:"origin"})
        .click(function(e){
          e.stopPropagation()
          if(!e.ctrlKey){
            sketch.unselectAll(e)
          }
          this.fill("green").stroke({color:"green"})
          this.data("isSelected", true, true)
          sketch.selected.push(this)
        })
        .mouseover(function(e){
          if(!this.data("isSelected")){
            this.fill("yellow")
          }
        })
        .mouseout(function(e){
          if(!this.data("isSelected")){
            this.attr("fill",null)
              .attr("stroke",null)
          }
        })

      sketch.draw.on("zoom",function(e){
        origin.radius(5.0/sketch.draw.zoom())
      })

      draw.screen=draw.group();
      draw.screen.stroke({color:"blue",opacity: 1.0,width:1})
        .fill("blue")
      draw.screen.sheet = [];
      draw.screen.sheet.push(draw.screen.group());

      draw.mousemove(function(e){
        const point = this.point()
        const coord = {
          x: point.x+e.clientX/draw.zoom(),
          y: point.y-e.clientY/draw.zoom()
        }
        view.elements.coordinate.textContent=
         ` x: ${(coord.x*100+0.5|0)/100}, y:${(coord.y*100+0.5|0)/100}`
      })
      draw.click(function(e){
        const point = this.point(e.screenX, e.screenY)
        console.log(point,e.screenX, e.screenY)
      })
    },
    setBackLine: function(backLine){
      backLine.clone()
        .attr("stroke-dasharray",null)
        .stroke({width:10.0, opacity:0.0,color:null})
        .click(function(e){
          e.stopPropagation()
          if(!e.ctrlKey){
            sketch.unselectAll(e)
          }
          backLine.stroke({color:"green"})
          backLine.data("isSelected", true, true)
          sketch.selected.push(backLine)
        })
        .mouseover(function(e){
          if(!backLine.data("isSelected")){
            backLine.stroke({color:"yellow"})
          }
        })
        .mouseout(function(e){
          if(!backLine.data("isSelected")){
            backLine.attr("stroke",null)
          }
        })
    },
  },
  resize: {
    execute: function(){
      const width = view.elements.body.getBoundingClientRect().width
        - view.elements.aside.getBoundingClientRect().width
      sketch.draw.width(width);
      sketch.draw
        .height(view.elements.drawing.getBoundingClientRect().height);
    },
  }, 
}

