  drawLine(){
      const sheet = this.svg.getCurrentSheet()
      const dH = this.dH
      const fig = sheet.line().draw()
      fig.on("drawstart",(e)=>{
        dH.drawObj.setStartFlag(true)
   //     console.log("dragstart", "line")
      })
      fig.on("drawstop",(e)=>{
  //      console.log("dragstop", "line")
        if(dH.drawObj.getStartFlag()){
          const points = fig.array().valueOf() //fig is supposed only as a line
          fig.remove()
          this.addFig("line", [].concat(...points))
          this.drawLine()
        }
        dH.drawObj.setStartFlag(false)
      })
      dH.drawObj.setTemp(fig)
      dH.drawObj.setMode("line")
  }

