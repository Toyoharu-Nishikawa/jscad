export const   vertical = {
  execute: function(element){
    if(!element && sketch.selected.length<1){
      console.log("select a edge")
      return this
    }
    const id = "constrain"+sketch.constrainId
    const fig = element || sketch.selected[0]
    const flag = this.transform(fig)

    if(flag){
      const degreeOfFreedom = fig.data("degreeOfFreedom") 
      fig.data("degreeOfFreedom", degreeOfFreedom-1,true)
      sketch.degreeOfFreedom -= 1 
      fig.remember("constrain").add(id)
      console.log(fig.remember("constrain"))
      console.log(fig.data("degreeOfFreedom"))
      sketch.constrain.set(id, {elem:[fig], constrain:this.vertical,type:"vertical"})
      sketch.constrainId ++
    }
    sketch.unselectAll()
  }
}

