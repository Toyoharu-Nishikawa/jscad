export const transform = (fig) =>{
    const type = fig.data("info").type
    if(type==="edge"){
      const shape = fig.data("info").shape
      if(shape === "line"){
        if(!fig.remember("constrain").size){
          const arr = fig.array().valueOf()
          arr[1][0] = arr[0][0] 
          fig.plot(arr)
          sketch.clone.get(fig).plot(arr)
          sketch.nodes.get(fig)[1].center(...arr[1])
          return true
        }
        else{
          const arr = fig.array().valueOf()
          fig.remember("constrain").forEach(constrainId=>{
            const constrain = sketch.constrain.get(constrainId)
            if(constrain.type==="coincident"){
              const nodeNumber = constrain.elem[1].data("info").number
              if(nodeNumber===0){
                arr[1][0] = arr[0][0] 
              }
              else{
                arr[0][0] = arr[1][0] 
              }
            }
          })
          fig.plot(arr)
          sketch.clone.get(fig).plot(arr)
          sketch.nodes.get(fig)[0].center(...arr[0])
          sketch.nodes.get(fig)[1].center(...arr[1])
        }
      }
      else {
       console.log("select a line element")
       return false
      }
    }
    else {
       console.log("select a line element")
       return false
    }
  }
}

