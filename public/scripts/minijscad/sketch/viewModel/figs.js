import * as DataClass from "../data.js"

export const Figs = class{
 constructor(view, model){
    this.view = view
    this.model = model 
    this.initialParameters = {
      param: new DataClass.DataManager(),
      valid: new DataClass.DataManager(),
    }
    this.degreesOfFreedom = new DataClass.Degrees()
    this.attrData = new DataClass.DataManager()
  }
  removeFig(idF){
    this.view.figs.removeFig(idF) 
  }
  removeFigsInSheet(id){
    this.view.figs.removeFigsInSheet(id)
  }

  addFig(type, parameters, attr, idF){
    switch(type){
      case "line":{
        const id= this.addLine(parameters, attr, idF)
        return id 
      }
      case "lines":{
        const id = this.addLines(parameters, attr, idF)
        return id 
      }
      case "polyline":{
        const id = this.addPolyline(parameters, attr, idF)
        return id 
      }
      case "circle":{
        const id = this.addCircle(parameters, attr, idF)
        return id 
      }
      case "arc":{
        const id = this.addArc(parameters, attr, idF)
        return id 
      }
      default:{
      }
    }
  }

  changeFig(id, params){
    const fig = this.view.figs.data.getDataFromId(id) 
    const type = fig.data("id").type
    switch(type){
      case "line":{
        this.view.figs.changeLine(id, ...params)
        break
      }
      case "arc":{
        this.view.figs.changeArc(id, ...params)
        break
      }

    }
  }

  addLine(parameters, id){
    const fid = this.view.figs.addLine(parameters, id)

    this.degreesOfFreedom.increase(4)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("line"),
      constraint: new Map(),
    }
    //this.initialParameters.param.addData(fId, [x1, y1, x2, y2])
    //this.initialParameters.valid.addData(fId, [true, true, true, true])
    //this.attrData.addData(fId, attr)

    return fid 
  }
  
  changeline(id, x1, y1, x2, y2){
    this.view.figs.changeline(id, x1, y1, x2, y2)
  }

  addLines(parameters, id){
    const fid = this.view.figs.addLines(parameters, id)

    this.degreesOfFreedom.increase(4)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("line"),
      constraint: new Map(),
    }
    //this.initialParameters.param.addData(fId, points)
    //this.initialParameters.valid.addData(fId, [true, true, true, true])
    //this.attrData.addData(fId, attr)

    return fid
  }

  addPolyline(parameters, id){
    const fid = this.view.figs.addPolyline(parameters, id)

    this.degreesOfFreedom.increase(4)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("line"),
      constraint: new Map(),
    }
    //this.initialParameters.param.addData(fId, points)
    //this.initialParameters.valid.addData(fId, [true, true, true, true])
    //this.attrData.addData(fId, attr)

    return fid
  }

  addCircle(parameters, id){
    const fid = this.view.figs.addCircle(parameters, id)

    this.degreesOfFreedom.increase(3)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("circle"),
      constraint: new Map(),
    }
    //this.initialParameters.param.addData(fId, points)
    //this.initialParameters.valid.addData(fId, [true, true, true, true])
    //this.attrData.addData(fId, attr)

    return fid
  }

  addArc(parameters, id){
 
    const fid = this.view.figs.addArc(parameters, id)

    //this.initialParameters.param.addData(fId, [cx, cy, r, theta1, theta2])
    //this.initialParameters.valid.addData(fId, [true, true, true, true, true])
    //this.degreesOfFreedom.increase(5)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("arc"),
      constraint: new Map(),
    }
    this.attrData.addData(fid, attr)
    return fid
  }

  changeArc(id, cx, cy, r, theta1, theta2){
    this.view.figs.changeArc(id, cx, cy, r, theta1, theta2)
  }
}
