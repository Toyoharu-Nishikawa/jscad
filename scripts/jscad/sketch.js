"use strict"

export const sketch = {
  draw: SVG('drawing').panZoom({zoomFactor:1.1}),
  clone:new Map(),
  nodes:new Map(), //key:fig, value:nodes
  figs:new Map(), //key:node, value:fig
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
        fig.data("info",{type:"edge",shape:fig.type})
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
          case "resize":{
            fig.selectize({deepSelect:true})
              .resize()
            sketch.resizeFig.push(fig)
            break
          }
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
}
