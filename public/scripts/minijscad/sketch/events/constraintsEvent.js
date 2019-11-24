import * as solve from "../../../sci/solve/index.mjs"

  setVertical(){
    this.runVertical()
    this.draw.on("nodeclick",this.runVertical.bind(this))
    this.draw.on("elementclick",this.runVertical.bind(this))
  }

  runVertical(){
    if(this.selected.counts() !==1){
      //console.log("have to select a element before doing")
      return
    }

    const selected = this.selected.getArray()

    const sourceId = selected[0].data("id").id 
    const sourceElem = "start" 
    const source = {
      id : sourceId,
      element: sourceElem ,
    }

    const targetId = selected[0].data("id").id 
    const targetElem = "end" 
    const target = {
      id : targetId ,
      element: targetElem ,
    }

    const key = `vertical.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
      return
    }
    if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
      return
    }

    this.addConstraint("vertical",source, target )
    this.selected.unselectAll()
    this.solve()
    //console.log("vertical")
  }

  setHorizontal(){
    this.runHorizontal()
    this.draw.on("nodeclick",this.runHorizontal.bind(this))
    this.draw.on("elementclick",this.runHorizontal.bind(this))
  }

  runHorizontal(){
    if(this.selected.counts() !==1){
      //console.log("have to select a element before doing")
      return
    }

    const selected = this.selected.getArray()

    const sourceId = selected[0].data("id").id 
    const sourceElem = "start" 
    const source = {
      id : sourceId,
      element: sourceElem ,
    }

    const targetId = selected[0].data("id").id 
    const targetElem = "end" 
    const target = {
      id : targetId ,
      element: targetElem ,
    }

    const key = `horizontal.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
      return
    }
    if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
      return
    }


    this.addConstraint("horizontal",source, target )
    this.selected.unselectAll()
    this.solve()
    //console.log("horizontal")

  }
  setCoincident(){
    this.runCoincident()
    this.draw.on("nodeclick",this.runCoincident.bind(this))
    this.draw.on("elementclick",this.runCoincident.bind(this))
  }

  runCoincident(){
    if(this.selected.counts() !==2){
      //console.log("have to select 2 elements before doing")
      //console.log(this.selected.counts())
      return
    }
    const selected = this.selected.getArray()
    //console.log(selected)

    const sourceId = selected[0].data("id").id 
    const sourceElem = selected[0].data("id").pointType
    const source = {
      id : sourceId,
      element: sourceElem ,
    }

    const targetId = selected[1].data("id").id 
    const targetElem = selected[1].data("id").pointType
    const target = {
      id : targetId ,
      element: targetElem ,
    }

    const key = `coincident.${sourceId}.${sourceElem}.${targetId}.${targetElem}` 
    if(this.figsAttrData.getDataFromId(sourceId).constraint.has(key)){
      return
    }
    if(this.figsAttrData.getDataFromId(targetId).constraint.has(key)){
      return
    }

    this.addConstraint("coincident",source, target )
    //console.log("coincident")
    this.selected.unselectAll()
    this.solve()
  }

