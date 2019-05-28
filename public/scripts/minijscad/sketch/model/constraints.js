import * as DataClass from "./data.js"

export const Constraints = class {
  constructor(elem){
    this.constraintsData = new DataClass.countUpDataManager()
  }

// constraint

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
}
