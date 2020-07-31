import * as DataClass from "./data.js"
import {dataMap as dashMap} from "./dash.js"
import {setLineType} from "./setLineType.js"
import {Fig} from "./fig.js"
import {Dimension} from "./dimension.js"
import {Text} from "./text.js"
import {Svg} from "./svg.js"

export const Sheet = class {
  constructor(parentObj, id, attrFigs, attrDimensions, attrTexts, backgroundColor){
    const color = backgroundColor
    const dimAndTextColor = (color==="black"||color==="#000000"|| color==="#000") ? "white" : "black"

    const figs = parentObj.group().fill("none")
    const dimensions = parentObj.group().stroke(dimAndTextColor).fill(dimAndTextColor)
    const texts = parentObj.group().stroke(dimAndTextColor).fill(dimAndTextColor) 
  
    figs.attr(attrFigs)
    dimensions.attr(attrDimensions)
    texts.attr(attrTexts)

    setLineType(figs, attrFigs)

    this.id = id 
    this.figs = figs
    this.backgroundColor = backgroundColor
    this.dimensions = dimensions
    this.texts = texts
    this.figsData =new DataClass.countUpDataManager() 
    this.textsData =new DataClass.countUpDataManager() 
    this.dimensionsData =new DataClass.countUpDataManager() 
  } 
  setBackgroundColor(backgroundColor){
    this.backgroundColor = backgroundColor
  }
  getId(){
    const id = this.id
    return id
  }
  addFig(type, param, attr){
    const id = this.figsData.getId()
    const figs= this.figs
    const fig = new Fig(figs, id, type, param, attr)
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
    const ids = [...figsData.getKeys()]
    return ids
  }
  getAllFigs(){
    const figsData = this.figsData
    const figs = [...figssData.getValues()]
    return figs 
  }
  removeFig(obj){
    if(obj instanceof Fig){
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
    const id = this.dimensionsData.getId()
    const dimensions = this.dimensions
    const dimension = new Dimension(dimensions, id, type, param, attr)
    const dimensionsData = this.dimensionsData
    dimensionsData.addData(id, dimension)
 
    return dimension
  }

  removeDimension(id){
  }
  removeAllDimensions(){
  }
  hideAllDimension(){
  }
  showAllDimension(){
  }
  addText(param, attr){
    const id = this.textsData.getId()
    const texts = this.texts
    const text = new Text(texts, id,  param, attr)
    const textsData = this.textsData
    textsData.addData(id, text)
 
    return text 
  }
  removeText(id){
  }
  removeAllTexts(){
  }
  hideAllTexts(){
  }
  showAllText(){
  }
  clear(){
    this.removeAllFigs()
    this.removeAllDimensions()
    this.removeAllTexts()
  }

}
