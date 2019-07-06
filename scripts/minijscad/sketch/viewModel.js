import {Figs} from "./viewModel/figs.js"
import {Dimensions} from "./viewModel/dimensions.js"

export const ViewModel = class  {
  constructor(view, model){
    this.figs = new Figs(view, model)
    this.dimensions = new Dimensions(view, model)
  }

}
