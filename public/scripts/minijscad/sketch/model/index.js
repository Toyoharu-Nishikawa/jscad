
  remove(id){
    const selected = this.figs.figsData.getDataFromId(id)
    const clone = this.figs.eH.clonesData.getDataFromId(id)
    const nodes = this.figs.eH.nodesData.getDataFromId(id)
    const figsAttr = this.figs.figsAttrData.getDataFromId(id)
    const constraint = figsAttr.constraint
    selected.remove()
    clone.remove()
    nodes.forEach(node=>node.remove())

    constraint.forEach((id, key)=>{
      switch(key){
        case "verticalD" :
        case "horizontalD": {
          const label = this.dimensionsLabelData.getDataFromId(id)
          label.remove()
          this.dimensionsLabelData.removeData(id)
          this.dimensionsData.removeData(id)
          break
        }
        case "vertical" :
        case "horizontal": 
        case "coincident": { 
          this.constrainsData.removeData(id)
          break
        }
      }  
    })
    this.figsData.removeData(id)
    this.clonesData.removeData(id)
    this.nodesData.removeData(id)
  }

  drawPolyline(){
      const sheet = this.getCurrentSheet()
      const draw = this.draw
      const fig = sheet.polyline().draw()
      const keyDown = (e)=>{
        if(e.keyCode===13){
          fig.draw("done")
          fig.off("drawstart")
        } 
      }
      fig.on("drawstart",(e)=>{
        this.drawObj.setStartFlag(true)
        console.log("dragstart", "line")
        document.addEventListener("keydown",keyDown,{once:true})
      })
      fig.on("drawstop",(e)=>{
        console.log("dragstop", "line")
        if(this.drawObj.getStartFlag()){
          const points = fig.array().valueOf()
          console.log(points)
          fig.remove()
          document.removeEventListener("keydown",keyDown)
          const lines = points.map((v,i,arr)=>i>0?[arr[i-1],v]:0).slice(1)
          const lineFigsId =lines.map(v=>this.addFig("line", [].concat(...v)))
          lineFigsId.forEach((v,i,arr)=>{
            if(i>0){
              const sourceId = arr[i-1]
              const targetId = v
              const source = {id:sourceId ,element:"end"}
              const target = {id:targetId ,element:"start"}
              this.addConstraint("coincident", source, target)
            }
          }) 
          this.drawPolyline()
        }
        this.drawObj.setStartFlag(false)
      })
      this.drawObj.setTemp(fig)
      this.drawObj.setMode("line")
  }

