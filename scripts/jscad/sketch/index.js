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
  get draw(){
    return this.view.svg.draw
  }
  addFig(type, parameters, idF){
    this.viewModel.figs.addFig(type, parameters, idF)
  } 
  changeFig(idF, parameters){
    this.viewModel.figs.changeFig(idF, parameters)
  } 

} 
