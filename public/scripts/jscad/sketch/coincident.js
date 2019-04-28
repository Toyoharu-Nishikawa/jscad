export const coincident = {
    execute: function(element1, element2){
      if(!element1 && !element2 && sketch.selected.length<2){
        console.log("select a couple of nodes or a pair of node and edge")
        return this
      }
      const elem1 = element1 || sketch.selected[0]
      const elem2 = element2 || sketch.selected[1]
 
      const id = "constrain"+sketch.constrainId
      const flag = this.transform(elem1, elem2)
      if(flag){
        const fig1 = sketch.figs.get(elem1) 
        const fig2 = sketch.figs.get(elem2) 
        const type1 = elem1.data("info").type
        const type2 = elem2.data("info").type
        const fig = type2==="node" ? fig2: fig1 
        const degreeOfFreedom = fig.data("degreeOfFreedom") 
        fig.data("degreeOfFreedom", degreeOfFreedom-2,true)
        sketch.degreeOfFreedom -= 2
        fig.remember("constrain").add(id)
        console.log(fig.remember("constrain"))
        console.log(fig1.data("degreeOfFreedom"), fig2.data("degreeOfFreedom"))
 
        sketch.constrain.set(id, {elem:[elem1, elem2], constrain:this.coincident,type:"coincident"})
        sketch.constrainId ++
      }
      sketch.unselectAll()
    },
    transform:function(elem1, elem2){
      const type1 = elem1.data("info").type
      const type2 = elem2.data("info").type
 
      if(type1==="node" && type2==="node"){
        const fig1 = sketch.figs.get(elem1) 
        const fig2 = sketch.figs.get(elem2) 
        const nodeNum1 = elem1.data("info").number
        const nodeNum2 = elem2.data("info").number
        console.log(fig1)
        const arr1 = fig1.array().valueOf()
        const arr2 = fig2.array().valueOf()
        arr2[nodeNum2]=arr1[nodeNum1]
      fig2.plot(arr2)
      sketch.clone.get(fig2).plot(arr2)
      elem2.attr(elem1.attr())
      return true
    }
    else if(type1 ==="origin" && type2==="node"){
      const fig2 = sketch.figs.get(elem2) 
      const nodeNum2 = sketch.selected[1].data("info").number
      const arr2 = fig2.array().valueOf()
      arr2[nodeNum2]=[0,0]
      fig2.plot(arr2)
      sketch.clone.get(fig2).plot(arr2)
      elem2.attr(elem1.attr())
      return true
    }
    else if(type1 ==="node" && type2==="origin"){
      const fig1 = sketch.figs.get(sketch.selected[0]) 
      const nodeNum1 = sketch.selected[0].data("info").number
      const arr1 = fig1.array().valueOf()
      arr1[nodeNum1]=[0,0]
      fig1.plot(arr1)
      sketch.clone.get(fig1).plot(arr1)
      elem1.attr(elem2.attr())
      return true
    }
    else{
      console.log("select a couple of nodes or a pair of node and edge")
      return false
    }
  }
}

