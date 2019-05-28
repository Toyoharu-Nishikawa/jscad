import {Figs} from "./viewModel/figs.js"

export const ViewModel = class  {
  constructor(view, model){
    this.view = view 
    this.model = model 
    this.figs = new Figs(view, model)
  }

}
