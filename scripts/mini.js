import {jscad} from "./jscad/mini.js"

const draw = jscad.setup("minijscad-test", 500, 300)

draw.screen.sheet[0].rect(100,100).move(50,50)
  .fill("none")
  .attr("vector-effect", "non-scaling-stroke")

draw.screen.sheet[0].line(0,0,100,100)
  .attr("vector-effect", "non-scaling-stroke")
  .mouseover(function(){
    this.stroke({color:"blue"}) 
  })
  .mouseout(function(){
    this.stroke({color:"black"}) 
  })
  .click(function(){
    this.stroke({color:"red"}) 
  })


