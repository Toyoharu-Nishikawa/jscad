"use strict"

export const sketch = {
  draw: SVG('drawing').panZoom({zoomFactor:1.1}),
  clone:new Map(),
  nodes:new Map(), //key:fig, value:nodes
  figs:new Map(), //key:node, value:fig
  constrain:new Map(), //key:constrainId, value:fig or node
  constrainId:0,
  degreeOfFreedom:0,
  freedomMap:new Map([ 
    ["point", 2],
    ["line", 4],
  ]),
  elements:[],
  selected:[],
  resizeFig:[],
  temp: null,
  drawMode: null,
  drawStartFlag: false,
  currentSheetNumber:0,
  cancel: function(){
    if(sketch.temp){
      if(sketch.drawStartFlag){
        sketch.drawStartFlag = false
        sketch.temp.draw("cancel")
      }
    }
  },
  drawOff: function(){
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
  },
  continuous: function(callback){
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
  },
  addevent:function(fig){
    const clone = fig.clone()
      .stroke({width:5.0, opacity:0.0,color:null})
      .click(function(e){
        e.stopPropagation()
        switch(sketch.drawMode){
            /*
          case "resize":{
            fig.selectize({deepSelect:true})
              .resize()
            sketch.resizeFig.push(fig)
            break
          }
          */
          default:{
            if(!e.ctrlKey){
              sketch.unselectAll(e)
            }
            fig.stroke({color:"green"})
            fig.data("isSelected", true, true)
            sketch.selected.push(fig)
            break
          }
        }
      })
      .mouseover(function(e){
        if(!fig.data("isSelected")){
          fig.stroke({color:"yellow"})
        }
      })
      .mouseout(function(e){
        if(!fig.data("isSelected")){
          fig.attr("stroke",null)
        }
      })
    sketch.clone.set(fig, clone)

    const i = sketch.currentSheetNumber
    const points = fig.array().valueOf() 

    const nodes = points.map((point,index)=>{
      const circle = sketch.draw.screen.sheet[i]
        .circle(5)
        .fill("blue")
        .center(...point) 
        .data("info",{type:"node", number:index})
        .click(function(e){
          e.stopPropagation()
          switch(sketch.drawMode){
          /*
            case "resize":{
              fig.selectize({deepSelect:true})
                .resize()
              sketch.resizeFig.push(fig)
              break
            }
            case "coincident": {
              this.fill("green").stroke({color:"green"})
              this.data("isSelected", true, true)
              sketch.selected.push(this)
              if(sketch.selected.length>1){
                const fig1 = sketch.figs.get(sketch.selected[0]) 
                const fig2 = sketch.figs.get(sketch.selected[1]) 
                const nodeNum1 = sketch.selected[0].data("info").number
                const nodeNum2 = sketch.selected[1].data("info").number
                console.log(fig1)
                const arr1 = fig1.array().valueOf()
                const arr2 = fig2.array().valueOf()
                arr1[nodeNum1]=arr2[nodeNum2]
                fig1.plot(arr1)
                sketch.clone.get(fig1).plot(arr1)
                sketch.selected[0].attr(sketch.selected[1].attr())
                sketch.unselectAll(e)
              }
              break
            }
            */
            default:{
              if(!e.ctrlKey){
                sketch.unselectAll(e)
              }
              this.fill("green").stroke({color:"green"})
              this.data("isSelected", true, true)
              sketch.selected.push(this)
              break
            }
          }
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
        circle.radius(2.5/sketch.draw.zoom())
        //console.log(circle.radius())
      })
      sketch.figs.set(circle, fig)
      return circle
    })
   
    sketch.nodes.set(fig, nodes)
  },
  unselectAll:function(){
    sketch.selected.forEach(selected=>{
      selected.attr("stroke",null)
        .attr("fill",null)
      selected.data("isSelected",null)
    })
    sketch.selected = []
  },
  vertical: {
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
    },
    transform:function(fig){
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
  },
  coincident:{
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
}
