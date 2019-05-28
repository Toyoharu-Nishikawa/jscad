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

  addFig(type, parameters, idF){
    switch(type){
      case "line":{
        const fig = this.addLine(...parameters, idF)
        return fig
        break
      }
      case "arc":{
        const fig = this.addArc(...parameters, idF)
        return fig
        break
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

  addLine(x1, y1, x2, y2, id){
    const sheet = this.view.svg.getCurrentSheet()
    const fId = id ? id : this.view.figs.data.getId()

    this.view.figs.addLine(sheet, x1, y1, x2, y2, fId)

    this.degreesOfFreedom.increase(4)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("line"),
      constraint: new Map(),
    }
    this.initialParameters.param.addData(fId, [x1, y1, x2, y2])
    this.initialParameters.valid.addData(fId, [true, true, true, true])
    this.attrData.addData(fId, attr)

    return fId
  }
  
  changeline(id, x1, y1, x2, y2){
    this.view.figs.changeline(id, x1, y1, x2, y2)
  }

  addArc(cx, cy, r, theta1, theta2, id){
    const sheet = this.view.svg.getCurrentSheet()
    const fId = id ? id : this.view.figs.data.getId()
 
    this.view.figs.addArc(sheet, cx, cy, r, theta1, theta2, fId)

    this.initialParameters.param.addData(fId, [cx, cy, r, theta1, theta2])
    this.initialParameters.valid.addData(fId, [true, true, true, true, true])
    this.degreesOfFreedom.increase(5)
    const attr = {
      degreesOfFreedom: new DataClass.Degrees("arc"),
      constraint: new Map(),
    }
    this.attrData.addData(fId, attr)
    return fId
  }

  changeArc(id, cx, cy, r, theta1, theta2){
    this.view.figs.changeArc(id, cx, cy, r, theta1, theta2)
  }
}
