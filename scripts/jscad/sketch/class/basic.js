import {Svg} from "./svg.js"

let idF = -1
let idC = -1
let idD = -1

let currentSheetNumber = 0

const dataManager = class {
  constructor(){
    this.id = -1   
    this.MAP = new Map
  }
  getId(){
    this.id ++
    const id = this.id
    return id
  }
  setObj(id, obj){
    this.MAP.set(id, obj)
  }
  getObj(id, ){
    return this.MAP.get(id)
  }
  hasObj(id, ){
    return this.MAP.has(id)
  }
  getCurrentId(){
    return this.id 
  }
  getMap(){
    return this.MAP
  }
}

const selectedData = class {
  constructor(){
    this.SET = new Set()
  }
  setData(data){
    this.SET.add(data) 
  }
  getArray(){
    return [...this.SET.values()]
  }
}

export const Basic = class extends Svg {
  constructor(elem){
    super(elem)

    this.background = this._addBackground()
    this.screen = this._addScreen()
    this.sheets = this._addSheets()
    this.nodeScreen = this._addNodeScreen()
    this.dimensionScreen = this._addDimensionScreen()

    this.selected = [] 
    this.figsMap = new Map()
    this.nodesMap = new Map()
    this.clonesMap = new Map()
 
  }
  _setBackLine(backLine){
    backLine.clone()
      .attr("stroke-dasharray",null)
      .stroke({width:10.0, opacity:0.0,color:null})
      .click(function(e){
        e.stopPropagation()
        if(!e.ctrlKey){
          sketch.unselectAll(e)
        }
        backLine.stroke({color:"green"})
        backLine.data("isSelected", true, true)
        sketch.selected.push(backLine)
      })
      .mouseover(function(e){
        if(!backLine.data("isSelected")){
          backLine.stroke({color:"yellow"})
        }
      })
      .mouseout(function(e){
        if(!backLine.data("isSelected")){
          backLine.attr("stroke",null)
        }
      })
  }
  _addBackground(){
    const draw = this.draw
    const background = draw.group()
      .stroke({color:"black",opacity: 1.0,width:1})
      .fill("black")
      .attr("vector-effect", "non-scaling-stroke")
  
    const horizontal = background.line(-1000, 0, 1000, 0)
      .attr("stroke-dasharray","5 5")
      .data("info",{type:"horizontal"})
    this._setBackLine(horizontal) 
  
    const vertical = background.line(0, -1000, 0, 1000)
      .attr("stroke-dasharray","5 5")
      .data("info",{type:"vertical"})
    this._setBackLine(vertical) 
  
    const origin = background.circle(10).center(0,0)
      .fill("black")
      .data("info",{type:"origin"})
      .click(function(e){
        e.stopPropagation()
        if(!e.ctrlKey){
          this.unselectAll(e)
        }
        this.fill("green").stroke({color:"green"})
        this.data("isSelected", true, true)
        this.addSelected(this)
      })
      .mouseover(function(e){
        if(!this.data("isSelected")){
          this.fill("yellow")
        }
      })
      .mouseout(function(e){
        if(!this.data("isSelected")){
          this.attr("fill",null)
            .attr("stroke",null)
        }
      })
  
    draw.on("zoom",function(e){
      origin.radius(5.0/draw.zoom())
    })
  
    draw.mousemove(function(e){
      const point = this.point()
      const coord = {
        x: point.x+e.clientX/draw.zoom(),
        y: point.y-e.clientY/draw.zoom()
      }
      const ev = new CustomEvent("sketch.mouse.move", {detail:coord})
      document.dispatchEvent(ev)
    })
    draw.click(function(e){
      const point = this.point(e.screenX, e.screenY)
      console.log(point, e.screenX, e.screenY)
    })
    return background
  }
  _addScreen(){
    const draw = this.draw
    const screen=draw.group()
    screen.stroke({color:"blue",opacity: 1.0,width:1})
      .fill("none")
    return screen
  }
  _addNodeScreen(){
    const draw = this.draw
    const nodeScreen=draw.group()
    return nodeScreen
  }
  _addDimensionScreen(){
    const draw = this.draw
    const dimensionScreen=draw.group()
      .stroke({color:"black",opacity: 1.0,width:1})
      .fill("black")
 
    return dimensionScreen 
  }
  _addSheets(){
    const screen = this.screen
    const sheet = screen.group().data("key", {sheetNumber:currentSheetNumber})
    const sheets = new Map([[currentSheetNumber, sheet]])
    return sheets 
  }
  addSheet(){
    currentSheetNumber++
    const sheets = this.sheets
    const screen = this.screen
    const newSheet = screen.group().data("key", {sheetNumber:currentSheetNumber})
    sheets.set(currentSheetNumber, newSheet)
    return newSheet 
  }
  getCurrentSheet(){
    const sheets = this.sheets
    const sheet = sheets.get(currentSheetNumber)
    return sheet
  }
  getCurrentSheetNumber(){
    return currentSheetNumber
  }
  getSheet(id){
    const sheets = this.sheets
    const sheet = sheets.get(id)
    return sheet
  }
  removeSheet(id){
    const sheets = this.sheets
    sheets.delete(id)
    return this
  }
  unselectAll(){
    this.selected.forEach(selected=>{
      selected.attr("stroke",null)
      .attr("fill",null)
      selected.data("isSelected",null)
    })
    this.selected = []
  }
  addSelected(fig){
    this.selected.push(fig)
  }
  makeClone(fig){
    const draw = this.draw
    const clone = fig.clone()
      .stroke({width:5.0, opacity:0.0,color:null})
      .click((e)=>{
        e.stopPropagation()
        if(!e.ctrlKey){
          this.unselectAll(e)
        }
        fig.stroke({color:"green"})
        fig.data("isSelected", true, true)
        this.addSelected(fig)
        draw.fire("elementclick")
      })
      .mouseover((e)=>{
        if(!fig.data("isSelected")){
          fig.stroke({color:"yellow"})
        }
      })
      .mouseout((e)=>{
        if(!fig.data("isSelected")){
          fig.attr("stroke",null)
        }
      })
    const IdF = fig.data("idF").idF
    clone.data("idF",{idF: IdF})
    this.clonesMap.set(IdF, clone)
  }
  makeNodes(fig, pointType){
    const nodeScreen = this.nodeScreen 
    const points = fig.data("nodes")

    const draw = this.draw
    const nodes = points.map((point,index)=>{
      const circle = nodeScreen
        .circle(5)
        .fill("black")
        .center(...point) 
        .data("info",{type:"node", number:index, pointType:pointType[index]})
        .click(function(e){
          e.stopPropagation()
          if(!e.ctrlKey){
            sketch.unselectAll(e)
          }
          this.fill("green").stroke({color:"green"})
          this.data("isSelected", true, true)
          sketch.selected.push(this)
          draw.fire("nodeclick")
        })
        .mouseover(function(e){
          if(!this.data("isSelected")){
            this.fill("yellow")
          }
        })
        .mouseout(function(e){
          if(!this.data("isSelected")){
            this.attr("fill",null)
              .attr("stroke",null)
          }
        })
  
      this.draw.on("zoom",(e)=>circle.radius(2.5/this.draw.zoom()))
     // this.figs.set(circle, fig)
      return circle
    })
   
    const IdF = fig.data("idF").idF
    nodes.forEach(v=>v.data("idF",{idF: IdF}))
    this.nodesMap.set(idF, nodes)
  }
  addFigMap(IdF, fig){
    this.figsMap.set(IdF, fig)
  }
  getFigFromId(IdF){
    const fig = this.figsMap.get(IdF)
    return fig
  }
  hasFigFromId(IdF){
    const flag = this.figsMap.has(IdF)
    return flg 
  }
  getCloneFigFromId(IdF){
    const cloneFig = this.clonesMap.get(IdF)
    return cloneFig
  }
  getNodesFromId(IdF){
    const nodesMap = this.nodesMap.get(IdF)
    return nodesMap
  }
  addEvent(fig, pointType){
    const IdF = idF
    this.makeClone(fig)
    this.makeNodes(fig, pointType)
  }
  getFigId(){
    idF++
    return idF 
  }
  getCurrentFigId(){
    return idF 
  }
  setFigId(IdF){
    idF = IdF 
  }
  getConstraintId(){
    idC++
    return idC
  }
  getCurrentConstraintId(){
    return idC 
  }
  setConstraintId(IdC){
    idC = IdC 
  }
  getDimensionId(){
    idD++
    return idD
  }
  getCurrentDimensionId(){
    return idD
  }
  setDimensionId(IdD){
    idD = IdD 
  }
  getFigMap(){
    return this.figsMap
  }

}
