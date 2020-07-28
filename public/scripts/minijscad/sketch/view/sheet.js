import * as DataClass from "../data.js"
import {dataMap as dashMap} from "./dash.js"
import {setLineType} from "./setLineType.js"
import {Figs} from "./figs.js"

export const Sheet = class {
  constructor(parentObj, id, attr){
    const figs = parentObj.group() 
    const texts = parentObj.group() 
    const dimensions = parentObj.group() 
  
    figs.attr(attr)
    setLineType(figs, attr)

    this.id = id 
    this.figs = figs
    this.texts = texts
    this.dimensions = dimensions
    this.figsData =new DataClass.countUpDataManager() 
    this.textsData =new DataClass.countUpDataManager() 
    this.dimensionsData =new DataClass.countUpDataManager() 
  } 
  getId(){
    const id = this.id
    return id
  }
  addFig(type, param, attr){
    const id = this.figsData.getId()
    const figs= this.figs
    const fig = new Figs(figs, id, type, param, attr)
    const figsData = this.figsData
    figsData.addData(id, fig)
    return fig 
  }
  getFigFromId(id){
    const figsData = this.figsData
    const fig = figsData.get(id)
    return fig 
  }
  getAllFigIds(){
    const figsData = this.figsData
    const ids = [...figssData.keys()]
    return ids
  }
  getAllFigs(){
    const figsData = this.figsData
    const figs = [...figssData.values()]
    return figs 
  }
 
  removeFig(obj){
    if(obj instanceof Figs){
      const fig = obj
      const id = fig.getId()    
      fig.remove()
      const figsData = this.figsData
      figsData.removeData(id)
    }
    else if(Number.isInteger(obj)){
      const id = obj
      const figsData = this.figsData
      const fig = figsData.getDataFromId(id)
      fig.remove()
      figsData.removeData(id)
    }
    else{
      throw new Error("arg is out of defined type")
    }
    return this
  }
  removeAllFigs(){
    const ids = this.getAllFigIds()
    ids.forEach(v=>this.removeFig(v))
  }
  hideAllFigs(){
    const figsData = this.figsData
    const figs = figsData.getValues()
    figs.forEach(v=>v.hide())
  }
  showAllFigs(){
    const figsData = this.figsData
    const figs = figsData.getValues()
    figs.forEach(v=>v.show())
  }
  setFigsAttr(attr){
    const figs = this.figs
    figs.attr(attr)
    setLineType(figs, attr)
  }
  addDimension(type, param, attr){
    const dim = new Dimension(type, param, attr)
    return dim 
  }
  removeDimension(id){
  }
  hideDimension(id){
  }
  showDimension(id){
  }
  addText(type, param, attr){
    const dim = new Dimension(type, param, attr)
    return dim 
  }
  removeText(id){
  }
  hideText(id){
  }
  showText(id){
  }
  clear(){
    this.removeAllFigs()
    this.removeAllDimensions()
    this.removeAllTexts()
  }

}
