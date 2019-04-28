import {Figs} from "./figs.js"

export const Constraints = class extends Figs {
  constructor(elem){
    super(elem)
    this.constraintMap = new Map()
    this.dimensionMap = new Map()
  }
  setConstraintMap(id, cons){
    this.constraintMap.set(id, cons) 
  }
  getConstraintMap(){
    return this.constraintMap
  }
  getConstraintFromId(id){
    const constraint = this.constraintMap.get(id) 
    return constraint
  }
  setDimensionMap(id, cons){
    this.dimensionMap.set(id, cons) 
  }
  getDimensionMap(){
    return this.dimensionMap 
  }
  getDimensionFromId(id){
    const dimension = this.dimensionMap.get(id) 
    return dimension
  }

  addCoincident(source, target, idC){
    const conId = idC ? idC : this.getConstraintId()
    this.setConstraintId(conId)
    const sourceIdF = source.idF 
    const sourceElem = source.element
    const targetIdF = target.idF 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const cons = [
      {s: sNum,     t: tNum,     value: 0, sId: sourceIdF, tId: targetIdF}, // x coincident
      {s: sNum + 1, t: tNum + 1, value: 0, sId: sourceIdF, tId: targetIdF}, // y coincident
    ]

    const sourceIniParamValid = this.getInitialParametersValid(sourceIdF)
    const targetIniParamValid = this.getInitialParametersValid(targetIdF)

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

    this.decreaseFreedomDegree(2)
    this.setConstraintMap(conId, cons) 
  }
  addHorizontal(source, target, idC){
    const conId = idC ? idC : this.getConstraintId()
    this.setConstraintId(conId)
    const sourceIdF = source.idF 
    const sourceElem = source.element
    const targetIdF = target.idF 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const cons = [
      {s: sNum+1,     t: tNum+1,     value: 0, sId: sourceIdF, tId: targetIdF}, // x coincident
    ]

    const sourceIniParamValid = this.getInitialParametersValid(sourceIdF)
    const targetIniParamValid = this.getInitialParametersValid(targetIdF)

    if(targetIniParamValid[tNum+1]){
      targetIniParamValid[tNum+1] = false //y1 or y2
    }
    else{
      sourceIniParamValid[sNum+1] = false //y1 or y2
    }  

    this.decreaseFreedomDegree(1)
    this.setConstraintMap(conId, cons) 
  }
  addVertical(source, target, idC){
    const conId = idC ? idC : this.getConstraintId()
    this.setConstraintId(conId)
    const sourceIdF = source.idF 
    const sourceElem = source.element
    const targetIdF = target.idF 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const sourceIniParamValid = this.getInitialParametersValid(sourceIdF)
    const targetIniParamValid = this.getInitialParametersValid(targetIdF)

    const cons = [
      {s: sNum,     t: tNum,     value: 0, sId: sourceIdF, tId: targetIdF}, // y coincident
    ]

    if(targetIniParamValid[tNum]){
      targetIniParamValid[tNum] = false //x1 or x2
    }
    else{
      sourceIniParamValid[sNum] = false //x1 or x2
    }   
 
    this.decreaseFreedomDegree(1)
    this.setConstraintMap(conId, cons) 
  }
  addHorizontalD(source, target, value, idD){
    const dimId = idD ? idD : this.getDimensionId()
    this.setDimensionId(dimId)
    const sourceIdF = source.idF 
    const sourceElem = source.element
    const targetIdF = target.idF 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const sourceIniParamValid = this.getInitialParametersValid(sourceIdF)
    const targetIniParamValid = this.getInitialParametersValid(targetIdF)

    const cons = [
      {s: sNum,     t: tNum,     value: value, sId: sourceIdF, tId: targetIdF}, // y coincident
    ]

    if(targetIniParamValid[tNum]){
      targetIniParamValid[tNum] = false //y1 or y2
    }
    else{
      sourceIniParamValid[sNum] = false //y1 or y2
    }  

    this.decreaseFreedomDegree(1)
    this.setDimensionMap(dimId, cons) 
  }
  addVerticalD(source, target, value, idD){
    const dimId = idD ? idD : this.getDimensionId()
    this.setDimensionId(dimId)
    const sourceIdF = source.idF 
    const sourceElem = source.element
    const targetIdF = target.idF 
    const targetElem = target.element
    const sNum = sourceElem ==="start"? 0 : 2
    const tNum = targetElem ==="start"? 0 : 2

    const sourceIniParamValid = this.getInitialParametersValid(sourceIdF)
    const targetIniParamValid = this.getInitialParametersValid(targetIdF)

    const cons = [
      {s: sNum+1,     t: tNum+1,     value: value, sId: sourceIdF, tId: targetIdF}, // y coincident
    ]

    if(targetIniParamValid[tNum+1]){
      targetIniParamValid[tNum+1] = false //x1 or x2
    }
    else{
      sourceIniParamValid[sNum+1] = false //x1 or x2
    }  

    this.decreaseFreedomDegree(1)
    this.setDimensionMap(dimId, cons) 
  }
}
