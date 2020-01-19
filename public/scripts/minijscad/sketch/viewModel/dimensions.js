export const Dimensions = class{
  constructor(view, model){
    this.view = view
    this.model = model 
  }
  addDimension(type, parameters){
    switch(type){
      case "length" :{
        const id = this.view.dimensionsLabel.setLengthLabelD(parameters)        
        return id
      }
      case "vertical" :{
        const id = this.view.dimensionsLabel.setVerticalLabelD(parameters)        
        return id
      }
      case "horizontal" :{
        const id = this.view.dimensionsLabel.setHorizontalLabelD(parameters)        
        return id
      }
    }
  }

  removeDimension(id){
    this.view.dimensionsLabel.removeDimension(id)
  }

  removeDimensionsInSheet(id){
    this.view.dimensionsLabel.removeDimensionsInSheet(id)
  }

} 
