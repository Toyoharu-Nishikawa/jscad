import {jscad} from "./jscad/mini.js"

const minijscadTest = document.getElementById("frame")
const width = minijscadTest.getBoundingClientRect().width  
const height = minijscadTest.getBoundingClientRect().height 

const sketch = jscad.setup("minijscad-test", width-50, height-50)

sketch.draw.screen.sheet[0].rect(100,100).move(50,50)
  .fill("none")
  .attr("vector-effect", "non-scaling-stroke")


const line1= sketch.draw.screen.sheet[0].line(0,0,100,100)
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

const resize = ()=> {
  const minijscadTest = document.getElementById("frame")
  const width = minijscadTest.getBoundingClientRect().width  
  const height = minijscadTest.getBoundingClientRect().height 
  console.log(width, height)
  sketch.resize(width-50, height-50)
}

window.onresize = resize
