import {jscad} from "./jscad/mini.js"

const draw = jscad.setup("minijscad-test", 500, 300)

draw.screen.sheet[0].rect(100,100).move(50,50)
  .fill("none")
  .attr("vector-effect", "non-scaling-stroke")


const line1= draw.screen.sheet[0].line(0,0,100,100)
  .attr("vector-effect", "non-scaling-stroke")

line1.clone()
  .attr("vector-effect", null)
  .stroke({color:"green", opacity:0.5, width:5.0})
  .mouseover(function(){
    this.stroke({color:"blue"}) 
  }.bind(line1))
  .mouseout(function(){
    line1.stroke({color:"black"}) 
  }.bind(line1))
  .click(function(){
    this.stroke({color:"red"}) 
  }.bind(line1))


