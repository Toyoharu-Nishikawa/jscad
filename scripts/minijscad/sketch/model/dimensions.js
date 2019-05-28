import * as DataClass from "./data.js"
import {EventHandler} from "./eventHandler.js"

export const Dimensions = class {
  constructor(){
    this.data = new DataClass.countUpDataManager()
  }


//set Dimension

  setVerticalD(){
    this.runVerticalD()
    this.draw.on("nodeclick",this.runVerticalD.bind(this))
    this.draw.on("elementclick",this.runVerticalD.bind(this))
  }

  runVerticalD(){
    const counts = this.selected.counts()
    switch(counts){
      case 1 :{
        const selected = this.selected.getArray()
        if(selected[0].data("id").type !=="line"){
          console.log("selected is not a line")
          return
        }
        const sourceId =selected[0].data("id").id
        const sourceElem = "start"
        const source = {
          id : sourceId ,
          element: sourceElem ,
        }
  
        const targetId =selected[0].data("id").id
        const targetElem = "end"
        const target = {
          id : targetId ,
          element: targetElem ,
        }
        const key = `verticalD.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
        if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
          return
        }
        if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
          return
        }

        const p = selected[0].array().valueOf()
        const x1 = p[0][0]
        const y1 = p[0][1]
        const x2 = p[1][0]
        const y2 = p[1][1]
        const value = y2 - y1 
        const id = this.addDimension("vertical",source, target, value)
        this.setVerticalLabelD(id, x1, y1, x2, y2, 30)
        this.selected.unselectAll()
        this.solve()
        console.log("verticalD")
        break
      }
      case 2: {
        const selected = this.selected.getArray()
        const sourceD = selected[0]
        const targetD = selected[1]
        const sId = sourceD.data("id").id
        const sType = sourceD.data("id").type
        const sPointType = sourceD.data("id").pointType
        const sNumber = sourceD.data("id").number
        const tId = targetD.data("id").id
        const tType = targetD.data("id").type
        const tPointType = targetD.data("id").pointType
        const tNumber = targetD.data("id").number

        const sP = sId ==="ORIGIN" ? [0 ,0 ] :
          this.figsData.hasData(sId) ? this.figsData.getDataFromId(sId).array().valueOf()[sNumber]:
          false

        if(!sP){
          console.log("selected is not available")
          return
        }
        const tP = tId ==="ORIGIN" ? [0 ,0 ] :
          this.figsData.hasData(tId) ? this.figsData.getDataFromId(tId).array().valueOf()[tNumber]:
          false

        if(!tP){
          console.log("selected is not available")
          return
        }
        const x1 = sP[0]
        const y1 = sP[1]
        const x2 = tP[0]
        const y2 = tP[1]
        const value = y2 - y1 

        console.log("xy",x1,y1,x2,y2)
        const source = {
          id : sId ,
          element: sPointType ,
        }

        const target = {
          id : tId ,
          element: tPointType ,
        }
        const id = this.addDimension("vertical",source, target, value)
        this.setVerticalLabelD(id, x1, y1, x2, y2, 30)
        this.selected.unselectAll()
        this.solve()
        console.log("verticalD")
        break
      }
    }
  }



  setHorizontalD(){
    console.log("OK")
    this.runHorizontalD()
    this.draw.on("nodeclick",this.runHorizontalD.bind(this))
    this.draw.on("elementclick",this.runHorizontalD.bind(this))
  }

  runHorizontalD(){
    const counts = this.selected.counts()
    switch(counts){
      case 1: {
        const selected = this.selected.getArray()
        if(selected[0].data("id").type !=="line"){
          console.log("selected is not a line")
          return
        }
        const sourceId = selected[0].data("id").id
        const sourceElem = "start"
        const source = {
          id : sourceId ,
          element: sourceElem ,
        }
        const targetId = selected[0].data("id").id 
        const targetElem = "end"
        const target = {
          id : targetId,
          element: targetElem ,
        }
    
        const key = `horizontalD.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
        if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
          return
        }
        if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
          return
        }
        const p = selected[0].array().valueOf()
        console.log(p)
       
        const x1 = p[0][0] 
        const y1 = p[0][1] 
        const x2 = p[1][0] 
        const y2 = p[1][1] 
    
        const value = x2 -x1 
        const id = this.addDimension("horizontal",source, target, value)
        this.setHorizontalLabelD(id, x1, y1, x2, y2, -30)
        this.selected.unselectAll()
        this.solve()
        console.log("horizontalD")
        break
      } 
      case 2: {
        const selected = this.selected.getArray()
        const sourceD = selected[0]
        const targetD = selected[1]
        const sId = sourceD.data("id").id
        const sType = sourceD.data("id").type
        const sPointType = sourceD.data("id").pointType
        const sNumber = sourceD.data("id").number
        const tId = targetD.data("id").id
        const tType = targetD.data("id").type
        const tPointType = targetD.data("id").pointType
        const tNumber = targetD.data("id").number

        const sP = sId ==="ORIGIN" ? [0 ,0 ] :
          this.figsData.hasData(sId) ? this.figsData.getDataFromId(sId).array().valueOf()[sNumber]:
          false

        if(!sP){
          console.log("selected is not available")
          return
        }
        const tP = tId ==="ORIGIN" ? [0 ,0 ] :
          this.figsData.hasData(tId) ? this.figsData.getDataFromId(tId).array().valueOf()[tNumber]:
          false

        if(!tP){
          console.log("selected is not available")
          return
        }
        const x1 = sP[0]
        const y1 = sP[1]
        const x2 = tP[0]
        const y2 = tP[1]
        const value = x2 - x1 

        console.log("xy",x1,y1,x2,y2)
        const source = {
          id : sId ,
          element: sPointType ,
        }

        const target = {
          id : tId ,
          element: tPointType ,
        }
        const id = this.addDimension("horizontal",source, target, value)
        this.setHorizontalLabelD(id, x1, y1, x2, y2, 30)
        this.selected.unselectAll()
        this.solve()
        console.log("horizontalD")
        break

      }
    }
  }



//dimension
  addDimension(type, source, target, value, id){
    switch(type){
      case "vertical":{
        const dId = this.addVerticalD(source, target,value, id)
        return dId
        break
      }
      case "horizontal":{
        const dId = this.addHorizontalD(source, target,value, id)
        return dId
        break
      }

      default:{
      }
    }
  }

  changeDimension(id, value){
    const cons = this.data.getDataFromId(id)
    const label = this.labelData.getDataFromId(id)
    cons[0].value = value
    console.log(value)
    sketch.solve()

    this.labelData.getMap().forEach((label,id)=>{
      const constraint = this.data.getDataFromId(id)
      const cons = constraint[0] 
      const sId = cons.sId 
      const sElem = cons.sElem 
      const tId = cons.tId 
      const tElem = cons.tElem 
      const type = cons.type

      const sFig = this.figsData.getDataFromId(sId)
      const tFig = this.figsData.getDataFromId(tId)

      const sp = sId === "ORIGIN" ? [0,0] :
        sElem ==="start" ? sFig.array().valueOf()[0] :
        sFig.array().valueOf()[1]

      const tp = tId === "ORIGIN" ? [0,0] :
        tElem ==="start" ? tFig.array().valueOf()[0]:
        tFig.array().valueOf()[1]

      const [x1, y1] = sp 
      const [x2, y2] = tp 

      switch(type){
        case "vertical":{
          const dX = label.data("info").dX
          this.changeVerticalLabelD(id, x1, y1, x2, y2, dX)
          break 
        }
        case "horizontal":{
          const dY = label.data("info").dY
          this.changeHorizontalLabelD(id, x1, y1, x2, y2, dY)
          break 
        }
      }
    })
  }


  addVerticalD(source, target, value, id){
    const dId = id ? id : this.data.getId()
    this.data.setId(dId)
    const sourceId = source.id 
    const sourceElem = source.element
    const targetId = target.id 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2


    const cons = [
      {s: sNum+1,     t: tNum+1,     value: value, sId: sourceId, sElem: sourceElem, 
         tId: targetId, tElem: targetElem, type:"vertical"}, // y coincident
    ]

    const sourceIniParamValid = this.initialParameters
      .valid.getDataFromId(sourceId)

    const targetIniParamValid = this.initialParameters
      .valid.getDataFromId(targetId)

     
    if(targetIniParamValid[tNum+1]){
      targetIniParamValid[tNum+1] = false //y1 or y2
    }
    else{
      sourceIniParamValid[sNum+1] = false //y1 or y2
    }   
 
    this.degreesOfFreedom.decrease(1)
    this.data.addData(dId, cons) 

    const key = `verticalD.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(!["ORIGIN","XAXIS", "YAXIS"].includes(sourceId)){
      const sAttr = this.figsAttrData.getDataFromId(sourceId)
      sAttr.degreesOfFreedom.decrease(1)
      sAttr.constraint.set(key, dId)
    }
    if(!["ORIGIN","XAXIS", "YAXIS"].includes(targetId)){
      const tAttr = this.figsAttrData.getDataFromId(targetId)
      tAttr.degreesOfFreedom.decrease(1)
      tAttr.constraint.set(key, dId)
    }
    return dId
  }

  addHorizontalD(source, target, value, id){
    const dId = id ? id : this.data.getId()
    this.data.setId(dId)
    const sourceId = source.id 
    const sourceElem = source.element
    const targetId = target.id 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const cons = [
      {s: sNum,     t: tNum,     value: value, sId: sourceId, sElem: sourceElem, 
        tId: targetId, tElem: targetElem, type:"horizontal"}, // x coincident
    ]

    const sourceIniParamValid = this.initialParameters
      .valid.getDataFromId(sourceId)

    const targetIniParamValid = this.initialParameters
      .valid.getDataFromId(targetId)

    if(targetIniParamValid[tNum]){
      targetIniParamValid[tNum] = false //x1 or x2
    }
    else{
      sourceIniParamValid[sNum] = false //x1 or x2
    } 

    this.degreesOfFreedom.decrease(1)
    this.data.addData(dId, cons) 

    const key = `verticalD.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(!["ORIGIN","XAXIS", "YAXIS"].includes(sourceId)){
      const sAttr = this.figsAttrData.getDataFromId(sourceId)
      sAttr.degreesOfFreedom.decrease(1)
      sAttr.constraint.set(key, dId)
    }
    if(!["ORIGIN","XAXIS", "YAXIS"].includes(targetId)){
      const tAttr = this.figsAttrData.getDataFromId(targetId)
      tAttr.degreesOfFreedom.decrease(1)
      tAttr.constraint.set(key, dId)
    }

    return dId
  }

}
