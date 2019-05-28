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

  setScreenSize(width, height){
    this.view.svg.setScreenSize(width, height)
  }
  resize(width, height){
    this.view.svg.resize(width, height)
  }

  hideEventObject(){
    this.view.svg.nodeScreen.hide()
    this.view.svg.cloneScreen.hide()
    this.view.svg.backgroundNode.hide()
  }
  get draw(){
    return this.view.svg.draw
  }
  addFig(type, parameters, idF){
    const id = this.viewModel.figs.addFig(type, parameters, idF)
    return id
  } 
  changeFig(idF, parameters){
    this.viewModel.figs.changeFig(idF, parameters)
  } 

} 
