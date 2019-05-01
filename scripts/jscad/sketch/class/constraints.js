import {Figs} from "./figs.js"
import * as DataClass from "./data.js"
import * as solve from "../../../sci/solve/index.mjs"

export const Constraints = class extends Figs {
  constructor(elem){
    super(elem)
    this.constraintsData = new DataClass.countUpDataManager()
    this.dimensionsData = new DataClass.countUpDataManager()
  }

  setVerticalD(){
    this.runVerticalD()
    this.draw.on("nodeclick",this.runVerticalD.bind(this))
    this.draw.on("elementclick",this.runVerticalD.bind(this))
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
  runVerticalD(){
    if(this.selected.counts() !==1){
      console.log("have to select a element before doing")
      return
    }

    const selected = this.selected.getArray()
    const source = {
      id : selected[0].data("id").id ,
      element: "start" ,
    }

    const target = {
      id : selected[0].data("id").id ,
      element: "end" ,
    }
    const p = selected[0].array().valueOf()
    const x1 = p[0][0]
    const y1 = p[0][1]
    const x2 = p[1][0]
    const y2 = p[1][1]
    const value = y2 - y1 
    const id = this.addDimension("vertical",source, target, value)
    this.setVerticalLabelD(id, x1, y1, x2, y2, -30)
    this.selected.unselectAll()
    this.solve()
    console.log("verticalD")
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
    const l1 = ds.line(x1, y1, tx+dx1, y1 )
    const l2 = ds.line(x2, y2, tx+dx2, y2 )
    const arrow = this.makeArrow(tx, y1, tx, y2)
      .data("id",{id: id, type:"arrow"})
 
    ds.add(arrow)
    
    
    const clone = this.makeDimensionClone(arrow).draggable()
    /*
    clone.on("beforedrag",(e)=>{
      e.preventDefault()
    })
    */
    clone.on("dragmove",(e)=>{
      const {handler, p} = e.detail
      e.preventDefault()
      console.log(e.detail)
      const x = p.x - handler.startPoints.point.x 
      const y = p.y - handler.startPoints.point.y 
      console.log(x, y)
 
      handler.el.move(x, 0)
      arrow.move(x, 0)
    })

    console.log(arrow)
  }

  setHorizontalD(){
    this.runHorizontalD()
    this.draw.on("nodeclick",this.runHorizontalD.bind(this))
    this.draw.on("elementclick",this.runHorizontalD.bind(this))
  }

  runHorizontalD(){
    if(this.selected.counts() !==1){
      console.log("have to select a element before doing")
      return
    }

    const selected = this.selected.getArray()
    const source = {
      id : selected[0].data("id").id ,
      element: "start" ,
    }

    const target = {
      id : selected[0].data("id").id ,
      element: "end" ,
    }

    const p = selected[0].array().valueOf()
    console.log(p)
    const value = p[1][0] - p[0][0]
   
    const x1 = (p[0][0] + p[1][0])/2

    const x2 = p[1][0] 
    const y1 = Math.min(p[0][1], p[1][1]) - 30
    const y2 = y1 
    const minX = Math.min(p[0][0] , p[1][0])
    const maxX = Math.max(p[0][0] , p[1][0])
    const ds = this.dimensionScreen
    const valueText = value.toFixed(2)
    const text = ds.text(valueText)
      .flip("y").translate(x1, y1)
    const l1 = ds.line(p[0][0], p[0][1], p[0][0], y1-15 )
    const l2 = ds.line(p[1][0], p[1][1], p[1][0], y2 -15 )
    const l3 = ds.line(p[0][0], y1, p[1][0], y2 )
    const a1 = ds.line(0, 0, 5, 5).translate(minX, y1)
    const a2 = ds.line(0, 0, 5, -5).translate(minX, y1)
    const a3 = ds.line(0, 0, -5, 5).translate(maxX, y2)
    const a4 = ds.line(0, 0, -5, -5).translate(maxX, y2)
    this.addDimension("horizontal",source, target, value )
    this.selected.unselectAll()
    this.solve()
    console.log("horizontalD")

  }
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
    const source = {
      id : selected[0].data("id").id ,
      element: "start" ,
    }

    const target = {
      id : selected[0].data("id").id ,
      element: "end" ,
    }

    this.addConstraint("vertical",source, target )
    this.selected.unselectAll()
    this.solve()
    console.log("horizontal")


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
    const source = {
      id : selected[0].data("id").id ,
      element: "start" ,
    }

    const target = {
      id : selected[0].data("id").id ,
      element: "end" ,
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
    const source = {
      id : selected[0].data("id").id ,
      element: selected[0].data("info").pointType ,
    }

    const target = {
      id : selected[1].data("id").id ,
      element: selected[1].data("info").pointType ,
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

  addDimension(type, source, target, value, id){
    switch(type){
      case "horizontal":{
        const dId = this.addHorizontalD(source, target,value, id)
        return dId
        break
      }
      case "vertical":{
        const dId = this.addVerticalD(source, target,value, id)
        return dId
        break
      }
      default:{
      }
    }
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
      {s: sNum,     t: tNum,     value: 0, sId: sourceId, tId: targetId}, // y coincident
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
      {s: sNum+1,     t: tNum+1,     value: value, sId: sourceId, tId: targetId}, // y coincident
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
      {s: sNum,     t: tNum,     value: value, sId: sourceId, tId: targetId}, // x coincident
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
    return dId
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
