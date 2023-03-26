import * as DataClass from "./data.js"
import {dataMap as dashMap} from "./dash.js"
import {setLineType} from "./setLineType.js"
import {Fig} from "./fig.js"
import {Dimension} from "./dimension.js"
import {Text} from "./text.js"
import {Svg} from "./svg.js"

export const Sheet = class {
  constructor(parentObj, id, figsAttr, dimensionsAttr, textsAttr, backgroundColor){
    const color = backgroundColor
    const dimAndTextColor = (color==="black"||color==="#000000"|| color==="#000") ? "white" : "black"

    const figs = parentObj.group().fill("none")
    const dimensions = parentObj.group().stroke(dimAndTextColor).fill(dimAndTextColor)
    const texts = parentObj.group().stroke(dimAndTextColor).fill(dimAndTextColor) 
  
    figs.attr(figsAttr)
    dimensions.attr(dimensionsAttr)
    texts.attr(textsAttr)

    setLineType(figs, figsAttr)

    this.id = id 
    this.figs = figs
    this.backgroundColor = backgroundColor
    this.dimensions = dimensions
    this.texts = texts
    this.figsData =new DataClass.countUpDataManager() 
    this.textsData =new DataClass.countUpDataManager() 
    this.dimensionsData =new DataClass.countUpDataManager() 

    this.figsAttr = figsAttr
    this.dimensionsAttr = dimensionsAttr
    this.textsAttr = textsAttr
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
    const ids = figsData.getKeys()
    return ids
  }
  getAllFigs(){
    const figsData = this.figsData
    const figs = figsData.getValues()
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
    const figs = this.getAllFigs()
    figs.forEach(v=>v.hide())
  }
  showAllFigs(){
    const figs = this.getAllFigs()
    figs.forEach(v=>v.show())
  }
  setFigsAttr(attr){
    const figs = this.figs
    figs.attr(attr)
    setLineType(figs, attr)
  }

  getAllDimensionIds(){
    const dimensionsData = this.dimensionsData
    const ids = dimensionsData.getKeys()
    return ids
  }
  getAllDimensions(){
    const dimensionsData = this.dimensionsData
    const dimensions = dimensionsData.getValues()
    return dimensions
  }
  addDimension(type, param, dimStyle={}, attr){
    const id = this.dimensionsData.getId()
    const dimensions = this.dimensions
    const dimension = new Dimension(dimensions, id, type, param, dimStyle, attr)
    const dimensionsData = this.dimensionsData
    dimensionsData.addData(id, dimension)
 
    return dimension
  }

  removeDimension(obj){
    if(obj instanceof Dimension){
      const dimension = obj
      const id = dimension.getId()    
      dimension.remove()
      const dimensionsData = this.dimensionsData
      dimensionsData.removeData(id)
    }
    else if(Number.isInteger(obj)){
      const id = obj
      const dimensionsData = this.dimensionsData
      const dimension = dimensionsData.getDataFromId(id)
      dimension.remove()
      dimensionsData.removeData(id)
    }
    else{
      throw new Error("arg is out of defined type")
    }
    return this
  }
  removeAllDimensions(){
    const ids = this.getAllDimensionIds()
    ids.forEach(v=>this.removeDimension(v))
  }
  hideAllDimensions(){
    const dimensions = this.getAllDimensions() 
    dimensions.forEach(v=>v.hide())
  }
  showAllDimensions(){
    const dimensions = this.getAllDimensions() 
    dimensions.forEach(v=>v.show())
  }
  getAllTextIds(){
    const textsData = this.textsData
    const ids = textsData.getKeys()
    return ids
  }
  getAllTexts(){
    const textsData = this.textsData
    const texts = textsData.getValues()
    return texts
  }
  addText(param, attr){
    const id = this.textsData.getId()
    const texts = this.texts
    const text = new Text(texts, id,  param, attr)
    const textsData = this.textsData
    textsData.addData(id, text)
 
    return text 
  }
  removeText(obj){
    if(obj instanceof Dimension){
      const text = obj
      const id = text.getId()    
      text.remove()
      const textsData = this.textsData
      textsData.removeData(id)
    }
    else if(Number.isInteger(obj)){
      const id = obj
      const textsData = this.textsData
      const text = textsData.getDataFromId(id)
      text.remove()
      textsData.removeData(id)
    }
    else{
      throw new Error("arg is out of defined type")
    }
    return this
  }
  removeAllTexts(){
    const ids = this.getAllTextIds()
    ids.forEach(v=>this.removeText(v))
  }
  hideAllTexts(){
    const texts = this.getAllTexts() 
    texts.forEach(v=>v.hide())
  }
  showAllTexts(){
    const texts = this.getAllTexts() 
    texts.forEach(v=>v.show())
  }
  hide(){
    this.hideAllFigs()
    this.hideAllDimensions()
    this.hideAllTexts()
  }
  show(){
    this.showAllFigs()
    this.showAllDimensions()
    this.showAllTexts()
  }
  remove(){
    this.removeAllFigs()
    this.removeAllDimensions()
    this.removeAllTexts()
  }
  getParam(){
    const figs = this.getAllFigs() 
    const dimensions = this.getAllDimensions() 
    const texts = this.getAllTexts() 
    const figsAttr = this.figsAttr
    const dimensionsAttr = this.dimensionsAttr
    const textsAttr = this.textsAttr

    const figsParam = figs.map(v=>v.getParam())
    const dimensionsParam = dimensions.map(v=>v.getParam())
    const textsParam = texts.map(v=>v.getParam())

    const obj = {
      figs: figsParam,
      dimensions: dimensionsParam,
      texts: textsParam,
      figsAttr: figsAttr,
      dimensionsAttr: dimensionsAttr,
      textsAttr: textsAttr,
    }
    return obj
  }
}
