export const  continuous =(callback) =>{
  const fig = sketch.temp
  fig.on("drawstart",(e)=>{
    console.log("drawstart",fig.type)
    sketch.drawStartFlag = true
  })
  fig.on("drawstop",(e)=>{
    console.log("drawstop",fig.type)
    callback && callback()
    if(sketch.drawStartFlag){
      fig.data("info",{
        type:"edge",
        shape:fig.type,
      })
      fig.data("degreeOfFreedom", sketch.freedomMap.get(fig.type),true)
      fig.remember("constrain", new Set())
      sketch.degreeOfFreedom += sketch.freedomMap.get(fig.type)
      sketch.addevent(fig)
    }
    sketch.drawStartFlag = false
    console.log("callback",sketch.drawMode)
  })
}

