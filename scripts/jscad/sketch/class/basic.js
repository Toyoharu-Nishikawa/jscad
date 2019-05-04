import {Svg} from "./svg.js"
import * as DataClass from "./data.js"


export const Basic = class extends Svg {
  constructor(elem){
    super(elem)

    this.selected = new DataClass.SelectedData() 
    this.dimensionsSelected = new DataClass.SelectedData() 
    this.drawObj = new DataClass.ModelObj() 

    this.nodesData = new DataClass.countUpDataManager()
    this.clonesData = new DataClass.countUpDataManager()
    this.dimensionClonesData = new DataClass.countUpDataManager()

  }

  drawCancel(){
    const temp = this.drawObj.getTemp()
    const startFlag = this.drawObj.getStartFlag()
    if(temp && startFlag){
      this.drawObj.setStartFlag(false)
      temp.draw("cancel")
    }
    console.log("drawCancel")
  }

  drawOff(){
    const temp = this.drawObj.getTemp()
    this.draw.off("click.draw")
    if(temp){
      temp.forget("_paintHandler")
      temp.draw = ()=>{}
    }
    this.drawObj.setMode(null)
    this.drawObj.setTemp(null)
    this.drawObj.setStartFlag(false)
    this.draw.off("nodeclick")
    this.draw.off("elementclick")
    SVG.off(window,"mousemove.draw")
    console.log("drawOff")
  }


  makeClone(fig, width=5){
//    const draw = this.draw
    const clone = fig.clone()
      .stroke({width:width, opacity:0.0,color:null})
      .attr("stroke-dasharray",null)

    this.addElementEvent(fig, clone)

    const id = fig.data("id").id
    clone.data("id",{id: id})
    this.clonesData.addData(id, clone)
    return clone
  }

  makeNodes(fig, pointType){
    const nodeScreen = this.nodeScreen 
    const points = fig.data("nodes")
    const id = fig.data("id").id

    const nodes = points.map((point,index)=>{
      const circle = nodeScreen
        .circle(5)
        .fill("black")
        .center(...point) 
        .data("id",{id:id, type:"node", number:index, pointType:pointType[index]})

      this.addNodeEvent(circle,"nodeclick")
      return circle
    })
   
    this.nodesData.addData(id, nodes)
    return nodes
  }

  makeDimensionClone(arrow, width=5){
    const clone = arrow.clone()
      .stroke({width:width, opacity:0.0,color:null})
      .attr("stroke-dasharray",null)

    this.addDimensionEvent(arrow, clone)

    const id = arrow.data("id").id
    clone.data("id",{id: id})
    this.dimensionClonesData.addData(id, clone)
    return clone
  }

  addElementEvent(fig, clone){
    clone 
      .click((e)=>{
        e.stopPropagation()
        if(!e.ctrlKey){
          this.selected.unselectAll()
        }
        fig.fill("green").stroke({color:"green"})
        fig.data("isSelected", true, true)
        this.selected.addData(fig)
        this.draw.fire("elementclick")
      })
      .mouseover((e)=>{
        if(!fig.data("isSelected")){
          fig.stroke({color:"yellow"})
        }
      })
      .mouseout((e)=>{
        if(!fig.data("isSelected")){
          fig.attr("fill",null)
            .attr("stroke",null)
        }
      })
  }
  addNodeEvent(elem){
    elem
      .click((e)=>{
        e.stopPropagation()
        if(!e.ctrlKey){
          this.selected.unselectAll()
        }
        elem.fill("green").stroke({color:"green"})
        elem.data("isSelected", true, true)
        this.selected.addData(elem)
        this.draw.fire("nodeclick")
      })
      .mouseover((e)=>{
        if(!elem.data("isSelected")){
          elem.fill("yellow")
        }
      })
      .mouseout((e)=>{
        if(!elem.data("isSelected")){
          elem.attr("fill",null)
            .attr("stroke",null)
        }
      })
  }

  addDimensionEvent(arrow, clone){
    clone 
      .click((e)=>{
        e.stopPropagation()
        this.dimensionsSelected.unselectAll()
        arrow.fill("green").stroke({color:"green"})
        arrow.data("isSelected", true, true)
        this.dimensionsSelected.addData(arrow)
        this.draw.fire("dimensionlabelclick")
      })
      .mouseover((e)=>{
        if(!arrow.data("isSelected")){
          arrow.stroke({color:"yellow"})
        }
      })
      .mouseout((e)=>{
        if(!arrow.data("isSelected")){
          arrow.attr("fill",null)
            .attr("stroke",null)
        }
      })
  }

}
