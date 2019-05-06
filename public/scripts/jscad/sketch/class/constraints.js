import {Figs} from "./figs.js"
import * as DataClass from "./data.js"
import * as solve from "../../../sci/solve/index.mjs"

export const Constraints = class extends Figs {
  constructor(elem){
    super(elem)
    this.constraintsData = new DataClass.countUpDataManager()
    this.dimensionsData = new DataClass.countUpDataManager()
    this.dimensionsLabelData = new DataClass.countUpDataManager()
  }
  makeArrow(x1, y1, x2, y2){
    const arrow = this.draw.group()
    const l = arrow.line(x1, y1, x2, y2)
    const theta = Math.atan2(y2-y1, x2-x1)
    const thetaDeg = theta*180/Math.PI
    const a1 = arrow.line(0, 0, 5, 5).rotate(thetaDeg).translate(x1, y1)
    const a2 = arrow.line(0, 0, 5, -5).rotate(thetaDeg).translate(x1, y1)
    const a3 = arrow.line(0, 0, -5, 5).rotate(thetaDeg).translate(x2, y2)
    const a4 = arrow.line(0, 0, -5, -5).rotate(thetaDeg).translate(x2, y2)
    return arrow 
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

  setVerticalLabelD(id, x1, y1, x2, y2, dX=30){
    const ds = this.dimensionScreen
    const value = y2 - y1 
    const valueText = value.toFixed(2)

    const tx = Math.max(x1, x2) + dX 
    const ty = (y1 + y2)/2

    const text = ds.text(valueText)
      .flip("y").rotate(90).translate(tx, ty)

    const dx1 = tx > x1 ? 15 : -15
    const dx2 = tx > x2 ? 15 : -15
    const label = ds.group()

    const l1 = ds.line(x1, y1, tx+dx1, y1 )
    const l2 = ds.line(x2, y2, tx+dx2, y2 )
    const arrow = this.makeArrow(tx, y1, tx, y2)
      .data("id",{id: id, type:"arrow"})
    
    const clone = this.makeDimensionClone(arrow).draggable()
    arrow.add(text) 
    label.add(arrow)
    label.add(l1)
    label.add(l2)
    label.data("info", {dX: dX})

    clone.on("dragmove",(e)=>{
      if(!arrow.data("isSelected")){
        arrow.stroke({color:"yellow"})
      }
      const {handler, p} = e.detail
      e.preventDefault()
      const x = p.x - handler.startPoints.point.x 
      const y = p.y - handler.startPoints.point.y 
      const gx = p.x + handler.startPoints.transform.x
 
      handler.el.matrix(handler.startPoints.transform).transform({x:x, y: 0}, true)
      arrow.matrix(handler.startPoints.transform).transform({x:x, y: 0}, true)  

      const dx1 = gx > x1 ? 15 : -15
      const dx2 = gx > x2 ? 15 : -15
 
      l1.plot(x1, y1, gx+dx1, y1)
      l2.plot(x2, y2, gx+dx2, y2)
      const rX = gx-tx+dX
      label.data("info", {dX: rX})
    })

    this.dimensionsLabelData.addData(id, label)

  }

  changeVerticalLabelD(id, x1, y1, x2, y2, dX){
    const label = this.dimensionsLabelData.getDataFromId(id)
    label.remove()
    this.setVerticalLabelD(id, x1, y1, x2, y2, dX)
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

  setHorizontalLabelD(id, x1, y1, x2, y2, dY=-30){
    const ds = this.dimensionScreen
    const value = x2 - x1 
    const valueText = value.toFixed(2)

    const tx = (x1 + x2)/2
    const ty = Math.min(y1, y2) + dY

    const text = ds.text(valueText)
      .flip("y").translate(tx, ty)

    const dy1 = ty > y1 ? 15 : -15
    const dy2 = ty > y2 ? 15 : -15
    const label = ds.group()

    const l1 = ds.line(x1, y1, x1, ty+dy1 )
    const l2 = ds.line(x2, y2, x2, ty+dy2 )
    const arrow = this.makeArrow(x1, ty, x2, ty)
      .data("id",{id: id, type:"arrow"})
    
    const clone = this.makeDimensionClone(arrow).draggable()
    arrow.add(text) 
    label.add(arrow)
    label.add(l1)
    label.add(l2)
    label.data("info", {dY: dY, type:"horizontal"})

    clone.on("dragmove",(e)=>{
      if(!arrow.data("isSelected")){
        arrow.stroke({color:"yellow"})
      }
      const {handler, p} = e.detail
      e.preventDefault()
      const x = p.x - handler.startPoints.point.x 
      const y = p.y - handler.startPoints.point.y 
      const gy = p.y + handler.startPoints.transform.y
 
      handler.el.matrix(handler.startPoints.transform).transform({x:0, y: y}, true)
      arrow.matrix(handler.startPoints.transform).transform({x:0, y: y}, true)  

      const dy1 = gy > y1 ? 15 : -15
      const dy2 = gy > y2 ? 15 : -15
 
      l1.plot(x1, y1, x1, gy+dy1)
      l2.plot(x2, y2, x2, gy+dy2)
      const rY = gy-ty+dY
      label.data("info", {dY: rY })
    })

    this.dimensionsLabelData.addData(id, label)

  }

  changeHorizontalLabelD(id, x1, y1, x2, y2, dY){
    const label = this.dimensionsLabelData.getDataFromId(id)
    label.remove()
    this.setHorizontalLabelD(id, x1, y1, x2, y2, dY)
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
    const cons = this.dimensionsData.getDataFromId(id)
    const label = this.dimensionsLabelData.getDataFromId(id)
    cons[0].value = value
    console.log(value)
    sketch.solve()

    this.dimensionsLabelData.getMap().forEach((label,id)=>{
      const constraint = this.dimensionsData.getDataFromId(id)
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
    const dId = id ? id : this.dimensionsData.getId()
    this.dimensionsData.setId(dId)
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
    this.dimensionsData.addData(dId, cons) 

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
    const dId = id ? id : this.dimensionsData.getId()
    this.dimensionsData.setId(dId)
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
    this.dimensionsData.addData(dId, cons) 

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

// constraint

  setVertical(){
    this.runVertical()
    this.draw.on("nodeclick",this.runVertical.bind(this))
    this.draw.on("elementclick",this.runVertical.bind(this))
  }

  runVertical(){
    if(this.selected.counts() !==1){
      console.log("have to select a element before doing")
      return
    }

    const selected = this.selected.getArray()

    const sourceId = selected[0].data("id").id 
    const sourceElem = "start" 
    const source = {
      id : sourceId,
      element: sourceElem ,
    }

    const targetId = selected[0].data("id").id 
    const targetElem = "end" 
    const target = {
      id : targetId ,
      element: targetElem ,
    }

    const key = `vertical.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
      return
    }
    if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
      return
    }

    this.addConstraint("vertical",source, target )
    this.selected.unselectAll()
    this.solve()
    console.log("vertical")
  }

  setHorizontal(){
    this.runHorizontal()
    this.draw.on("nodeclick",this.runHorizontal.bind(this))
    this.draw.on("elementclick",this.runHorizontal.bind(this))
  }

  runHorizontal(){
    if(this.selected.counts() !==1){
      console.log("have to select a element before doing")
      return
    }

    const selected = this.selected.getArray()

    const sourceId = selected[0].data("id").id 
    const sourceElem = "start" 
    const source = {
      id : sourceId,
      element: sourceElem ,
    }

    const targetId = selected[0].data("id").id 
    const targetElem = "end" 
    const target = {
      id : targetId ,
      element: targetElem ,
    }

    const key = `horizontal.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
      return
    }
    if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
      return
    }


    this.addConstraint("horizontal",source, target )
    this.selected.unselectAll()
    this.solve()
    console.log("horizontal")

  }
  setCoincident(){
    this.runCoincident()
    this.draw.on("nodeclick",this.runCoincident.bind(this))
    this.draw.on("elementclick",this.runCoincident.bind(this))
  }

  runCoincident(){
    if(this.selected.counts() !==2){
      console.log("have to select 2 elements before doing")
      console.log(this.selected.counts())
      return
    }
    const selected = this.selected.getArray()
    console.log(selected)

    const sourceId = selected[0].data("id").id 
    const sourceElem = selected[0].data("id").pointType
    const source = {
      id : sourceId,
      element: sourceElem ,
    }

    const targetId = selected[1].data("id").id 
    const targetElem = selected[1].data("id").pointType
    const target = {
      id : targetId ,
      element: targetElem ,
    }

    const key = `coincident.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
      return
    }
    if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
      return
    }

    this.addConstraint("coincident",source, target )
    console.log("coincident")
    this.selected.unselectAll()
    this.solve()
  }

  addConstraint(type, source, target, id){
    switch(type){
      case "coincident":{
        this.addCoincident(source, target, id)
        break
      }
      case "horizontal":{
        this.addHorizontal(source, target, id)
        break
      }
      case "vertical":{
        this.addVertical(source, target, id)
        break
      }
      default:{
      }
    }
  }


  addVertical(source, target, id){
    const cId = id ? id : this.constraintsData.getId()
    this.constraintsData.setId(cId)
    const sourceId = source.id 
    const sourceElem = source.element
    const targetId = target.id 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2


    const cons = [
      {s: sNum,     t: tNum,     value: 0, sId: sourceId, tId: targetId, type:"vertical"}, // y coincident
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
    this.constraintsData.addData(cId, cons) 

    const sAttr = this.figsAttrData.getDataFromId(sourceId)
    const tAttr = this.figsAttrData.getDataFromId(targetId)
    sAttr.degreesOfFreedom.decrease(1)
    tAttr.degreesOfFreedom.decrease(1)

    const key = `vertical.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    sAttr.constraint.set(key, cId)
    tAttr.constraint.set(key, cId)

    return cId
  }

  addHorizontal(source, target, id){
    const cId = id ? id : this.constraintsData.getId()
    this.constraintsData.setId(cId)
    const sourceId = source.id 
    const sourceElem = source.element
    const targetId = target.id 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const cons = [
      {s: sNum+1,     t: tNum+1,     value: 0, sId: sourceId, tId: targetId}, // x coincident
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
    this.constraintsData.addData(cId, cons) 

    const sAttr = this.figsAttrData.getDataFromId(sourceId)
    const tAttr = this.figsAttrData.getDataFromId(targetId)
    sAttr.degreesOfFreedom.decrease(1)
    tAttr.degreesOfFreedom.decrease(1)
 
    const key = `horizontal.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    sAttr.constraint.set(key, cId)
    tAttr.constraint.set(key, cId)

    return cId
  }

  addCoincident(source, target, id){
    const cId = id ? id : this.constraintsData.getId()
    this.constraintsData.setId(cId)
    const sourceId = source.id 
    const sourceElem = source.element
    const targetId = target.id 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const cons = [
      {s: sNum,     t: tNum,     value: 0, sId: sourceId, tId: targetId}, // x coincident
      {s: sNum + 1, t: tNum + 1, value: 0, sId: sourceId, tId: targetId}, // y coincident
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
    if(targetIniParamValid[tNum+1]){
      targetIniParamValid[tNum+1] = false //y1 or y2
    }
    else{
      sourceIniParamValid[sNum+1] = false //y1 or y2
    }   

    this.degreesOfFreedom.decrease(2)
    this.constraintsData.addData(cId, cons) 

    const sAttr = this.figsAttrData.getDataFromId(sourceId)
    const tAttr = this.figsAttrData.getDataFromId(targetId)
    sAttr.degreesOfFreedom.decrease(2)
    tAttr.degreesOfFreedom.decrease(2)
    const key = `coincident.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    sAttr.constraint.set(key, cId)
    tAttr.constraint.set(key, cId)

    return cId
  }


  solve(){
    const constraints = [...this.constraintsData.getValues()]
    const dimensions = [...this.dimensionsData.getValues()]
    const figsKeys = this.figsData.getKeys()
    const N = figsKeys.length*4
    const constraintsMatrix = constraints.flatMap(v=>v.map(u=>this._makeMatrixColumn(u, N,figsKeys)))
    const constraintsVector = constraints.flatMap(v=>v.map(u=>u.value))

    const dimensionsMatrix = dimensions.flatMap(v=>v.map(u=>this._makeMatrixColumn(u, N, figsKeys)))
    const dimensionsVector = dimensions.flatMap(v=>v.map(u=>u.value))


    const initialParameters = [].concat(...this.initialParameters.param.getValues())
    const initialParametersValid = [].concat(...this.initialParameters.valid.getValues())
    const initialParametersMatrix = initialParametersValid.map((v,i)=>!v?null:[...Array(N)].map((u,j)=>j==i?1:0)).filter(v=>v!==null)
    const initialParametersVector = initialParametersValid.map((v,i)=>!v?null:initialParameters[i]).filter(v=>v!==null)

    const geometryMatrix = [].concat(constraintsMatrix, dimensionsMatrix, initialParametersMatrix)
    const valueVector = [].concat(constraintsVector, dimensionsVector, initialParametersVector)

    console.log("M",geometryMatrix)
    console.log("V",valueVector)

    const sol = solve.linEqGauss(geometryMatrix, valueVector)

    figsKeys.forEach((v,i)=>{
      const parameters = sol.slice(i*4, i*4+4)    
      this.changeFig(v, parameters)
    })

    const freedomDegree = this.degreesOfFreedom.get()
    console.log("degrees of feedom", freedomDegree)
  }
  _makeMatrixColumn(u, N, figKeys){ 
    const s = u.s
    const t = u.t
    const sId = u.sId
    const tId = u.tId

    const ss = sId === "YAXIS" ? -1 :
               sId === "XAXIS" ? -1 :
               sId === "ORIGIN"? -1 :
               figKeys.indexOf(sId)

    const tt = tId === "YAXIS" ? -1 :
               tId === "XAXIS" ? -1 :
               tId === "ORIGIN"? -1 :
               figKeys.indexOf(tId)

    const list = [...Array(N)].fill(0)
    if(ss>-1){
      const sn = ss*4 + s
      list[sn] = -1
    }
   if(tt>-1){
      const tn = tt*4 + t 
      list[tn] = 1
    }
    return list
  }

}
