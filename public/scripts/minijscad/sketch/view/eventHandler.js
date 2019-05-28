import * as DataClass from "../data.js"

export const EventHandler = class  {
  constructor(eventElem, cloneScreen, nodeScreen){
    this.eventElem = eventElem 
    this.cloneScreen = cloneScreen
    this.nodeScreen= nodeScreen
    this.selected = new DataClass.SelectedData(),

    this.clonesData = new DataClass.countUpDataManager()
    this.nodesData = new DataClass.countUpDataManager()

  }

  makeClone(fig, width=5, id, eventName){
    const cloneScreen = this.cloneScreen
    const clone = fig.clone()
      .stroke({width:width, opacity:0.0,color:null})
      .attr("stroke-dasharray",null)
    cloneScreen.add(clone) 
    this.addElementEvent(fig, clone, eventName, id)

    clone.data("id",{id: id})
    this.clonesData.addData(id, clone)
    return clone
  }

  makeNodes(points, pointType, id, eventName="nodeclick" ){
    const nodeScreen = this.nodeScreen
    const nodes = points.map((point,index)=>{
      const circle = nodeScreen
        .circle(5)
        .center(...point) 
        .data("id",{id:id, type:"node", number:index, pointType:pointType[index]})

      this.addNodeEvent(circle, eventName, id)
      return circle
    })
   
    this.nodesData.addData(id, nodes)
    return nodes
  }


  addElementEvent(fig, clone, eventName, id){
    clone 
      .click((e)=>{
        e.stopPropagation()
        if(!e.ctrlKey){
          this.selected.unselectAll()
        }
        fig.fill("green").stroke({color:"green"})
        fig.data("isSelected", true, true)
        this.selected.addData(fig)
        this.eventElem.fire(eventName, {id: id})
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

  addNodeEvent(elem, eventName, id){
    elem
      .click((e)=>{
        e.stopPropagation()
        if(!e.ctrlKey){
          this.selected.unselectAll()
        }
        elem.fill("green").stroke({color:"green"})
        elem.data("isSelected", true, true)
        this.selected.addData(elem)
        this.eventElem.fire(eventName,{id: id})
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
}

