import {View} from "./view.js"
import {ViewModel} from "./viewModel.js"
import {Model} from "./model.js"


export const Sketch = class  {
  constructor(elem){
    this.view = new View(elem) 
    this.model = new Model() 
    this.viewModel = new ViewModel(this.view, this.model) 
//    this.events = new Events(this.view) 
  }

  import(json){
    const figs = json.figs 
    const constraints = json.constraints
    const dimensions = json.dimensions
    figs.forEach(v=>this.addFig(v.id, v.type, v.parameters))
  }
  export(){
  }
  setBackgroundColor(color){
    this.view.svg.setBackgroundColor(color)
  }  
  setScreenSize(width, height){
    this.view.svg.setScreenSize(width, height)
  }
  resize(width, height){
    this.view.svg.resize(width, height)
  }
  addSheet(id){
    this.view.svg.addSheet(id)
  }
  getSheet(id){
    return this.view.svg.getSheet(id)
  }
  getCurrentSheet(){
    return this.view.svg.getCurrentSheet()
  }
  getCurrentSheetId(){
    return this.view.svg.getCurrentSheetId()
  }
  changeCurrentSheet(id){
    return this.view.svg.changeCurrentSheet(id)
  }
  getAllSheetIds(){
    return this.view.svg.getAllSheetIds()
  }
  getAllSheets(){
    return this.view.svg.getAllSheets()
  }
  removeSheet(id){
    this.view.svg.removeSheet(id)
  }
  removeAllSheets(){
    this.view.svg.removeAllSheets()
  }
  clearSheet(id){
    this.viewModel.figs.removeFigsInSheet(id)
    this.viewModel.dimensions.removeDimensionsInSheet(id)
  }
  hideEventObject(){
    this.view.svg.nodeScreen.hide()
    this.view.svg.cloneScreen.hide()
    this.view.svg.backgroundNode.hide()
  }
  invalidEvent(){
    this.view.figs.invalidEvent()
  }
  hideDimensions(){
    this.view.svg.dimensionScreen.hide()
  }
  showDimensions(){
    this.view.svg.dimensionScreen.show()
  }
  get draw(){
    return this.view.svg.draw
  }
  addFig(type, parameters, attr, idF){
    const id = this.viewModel.figs.addFig(type, parameters, attr, idF)
    return id
  } 
  removeFig(idF){
    this.viewModel.figs.removeFig(idF)
  } 
  removeFigsInSheet(sheetId){
    this.viewModel.figs.removeFigsInSheet(sheetId)
  }
  changeFig(idF, parameters){
    this.viewModel.figs.changeFig(idF, parameters)
  } 
  addDimension(type, ...parameters){
    const id = this.viewModel.dimensions.addDimension(type, ...parameters)
    return id
  }  
  removeDimension(id){
    this.viewModel.dimensions.removeDimension(id)
  } 
  removeDimensionsInSheet(sheetId){
    this.viewModel.dimensions.removeDimensionsInSheet(sheetId)
  }
  getDxf(){
    const dxf = this.view.figs.getDxf()
    return dxf
  }
} 
