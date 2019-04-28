export const drawOff = () =>{
  const fig = sketch.temp
  sketch.drawMode=null
  sketch.temp = null
  SVG.off(window,"mousemove.draw")
  sketch.draw.off("click.draw")
  if(fig){
    fig.forget("_paintHandler")
    fig.draw = ()=>{}
  }
  console.log("drawOff")
}
