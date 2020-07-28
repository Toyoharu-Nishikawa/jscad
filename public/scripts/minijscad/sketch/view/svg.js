//import SVG from "../../../@svgdotjs/svg.js/src/svg.js"
//import * as svgPanzoom from "../../../@svgdotjs/svg.panzoom.js/src/svg.panzoom.js"
import {addExtendElements} from "./extra.js"
//import {dataMap as dashMap} from "./dash.js"
import {Base} from "./base.js"
import {Screen} from "./screen.js"

//const blackLine = {color:"black",opacity: 1.0,width:1}
//const blueLine = {color:"blue",opacity: 1.0,width:1}
//const whiteLine = {color:"white",opacity: 1.0,width:1}
//const nonLine = {color:null,opacity: 0.0,width:1}

export const Svg = class{
  constructor(elem, width=500, height=500){
    addExtendElements()

    const draw = SVG(elem).panZoom({zoomMode:"exponential", zoomFactor:1.1})
    const screen = new Screen(draw) 
    const base = new Base(draw) 

    this.element = elem
    this.draw = draw
    this.screen = screen 
    this.base = base

    this.setScreenSize(width, height)
    this.setBackgroundColor("default")
    this.setEvent()
  }
   setScreenSize(width, height){
    this.draw.width(width);
    this.draw.height(height);
    this.draw.attr('preserveAspectRatio', 'xMinYMin slice');
    const style = "margin:0; padding:0;"
    this.draw.attr("style" ,style)

    this.draw.viewbox(0, 0, width,height).flip('y')
  }
 
  setBackgroundColor(color){
    const colorParam = color === "default" ? "background:linear-gradient(to bottom, white, RoyalBlue)" : 
      `background:${color}`
    this.draw.attr("style" ,colorParam)

    if(color==="black"||color==="#000000"|| color==="#000"){
      this.screen.setAttr({stroke: "green", fill:"none"})
      this.basen.setAttr({stroke: "white", fill:"white"})
    }
    else{
      this.screen.setAttr({stroke: "blue", fill:"none"})
      this.base.setAttr({stroke: "black", fill:"black"})
    }
  }
  resize(width, height){
    this.draw.width(width)
    this.draw.height(height)
  }
  setEvent(){
    const elem = this.element
    const dom = document.getElementById(elem)
    const draw = this.draw
    draw.mousemove(function(e){
      const point = this.point()
      const coord = {
        x: point.x+e.clientX/draw.zoom(),
        y: point.y-e.clientY/draw.zoom()
      }
      const ev = new CustomEvent("sketch.mouse.move", {detail:coord})
      dom.dispatchEvent(ev)
    })
  }
}

//export const Svg = class {
//  constructor(elem){
//    this.currentSheetId = null
//    this.element = elem
//    this.draw = SVG(elem).panZoom({zoomMode:"exponential", zoomFactor:1.1})
//
//    this.cloneScreen = this.makeScreen(nonLine,"none")
//    this.dimensionScreen = this.makeScreen(blackLine,"black")
//    this.screen = this.makeScreen(blueLine,"none")
//    this.background = this.makeScreen(blackLine,"black")
//    this.backgroundNode = this.makeScreen(blackLine,"black")
//    this.nodeScreen = this.makeScreen(blackLine,"black")
//
//    this.sheets = this.makeSheets(this.screen)
//    this.dheets = this.makeSheets(this.dimensionScreen)
//
//    addExtendElements()
//  }
//  setScreenSize(width, height){
//    this.draw.width(width);
//    this.draw.height(height);
//    this.draw.attr('preserveAspectRatio', 'xMinYMin slice');
//    const style = "margin:0; padding:0;  background:linear-gradient(to bottom, white, RoyalBlue)" //border:1px solid #F5F5F5;
//    this.draw.attr("style" ,style)
//
//    this.draw.viewbox(0, 0, width,height).flip('y')
//  }
//  setBackgroundColor(color){
//    const colorParam = color === "default" ? "background:linear-gradient(to bottom, white, RoyalBlue)" : `background:${color}`
//    this.draw.attr("style" ,colorParam)
//    if(color==="black"||color==="#000000"|| color==="#000"){
//      this.changeScreenColor(this.dimensionScreen,"white","white")
//      this.changeScreenColor(this.screen,"green","none")
//      this.changeScreenColor(this.background,"white","white")
//      this.changeScreenColor(this.backgroundNode,"white","white")
//      this.changeScreenColor(this.nodeScreen,"white","white")
//    }
//    else{
//      this.changeScreenColor(this.dimensionScreen,"black","black")
//      this.changeScreenColor(this.screen,"blue","none")
//      this.changeScreenColor(this.background,"black","black")
//      this.changeScreenColor(this.backgroundNode,"black","black")
//      this.changeScreenColor(this.nodeScreen,"black","black")
//    }
//  }
//  resize(width, height){
//    this.draw.width(width)
//    this.draw.height(height)
//  }
//  makeScreen(strokeObj, fillObj, obj){
//    const elem =  obj || this.draw 
//    const screen = elem.group()
//      .stroke(strokeObj)
//      .fill(fillObj)
//      .attr("vector-effect", "non-scaling-stroke")
//    return screen
//  }
//  changeScreenColor(screen, lineColor, fillColor){
//    screen.stroke({color:lineColor}).fill(fillColor)
//    return screen
//  }
//  makeSheets(screen){
//    const id = "sheet0"
//    const sheet = screen.group().data("key", {sheetId:id, attr:{}})
//    this.currentSheetId = id
//    const sheets = new Map([[id, sheet]])
//    return sheets 
//  }
//  addSheet(id, attr){
//    const screen = this.screen
//    const dimensionScreen = this.dimensionScreen
//    const sheets = this.sheets
//    const dheets = this.dheets
//    if(!sheets.has(id)){
//      const newSheet = screen.group().data("key", {sheetId:id, attr:attr})
//      if(attr){
//        newSheet.attr(attr)
//        if(attr.hasOwnProperty("stroke-dasharray")){
//          const lineTypeName = attr["stroke-dasharray"]
//          const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//          newSheet.attr("stroke-dasharray", dashCode)
//        }
//      }
//      const newDheet = dimensionScreen.group().data("key", {sheetId:id})
//      sheets.set(id, newSheet)
//      dheets.set(id, newDheet)
//      this.currentSheetId = id
//      return newSheet 
//    }
//    else{
//      const sheet = sheets.get(id)
//      this.currentSheetId = id
//      return sheet
//    }
//  }
//  getCurrentSheet(){
//    const id = this.currentSheetId 
//    const sheets = this.sheets
//    const sheet = sheets.get(id)
//    return sheet
//  }
//  getCurrentDheet(){
//    const id = this.currentSheetId 
//    const dheets = this.dheets
//    const dheet = dheets.get(id)
//    return dheet
//  }
//  getCurrentSheetId(){
//    return this.currentSheetId
//  }
//  getSheet(id){
//    const sheets = this.sheets
//    const sheet = sheets.get(id)
//    return sheet
//  }
//  getDheet(id){
//    const dheets = this.dheets
//    const dheet = dheets.get(id)
//    return dheet
//  }
//  changeCurrentSheet(id){
//    this.currentSheetId = id
//    const sheets = this.sheets
//    const sheet = sheets.get(id)
//    return sheet 
//  }
//  getAllSheetIds(){
//    const sheets = this.sheets
//    const ids = [...sheets.keys()]
//    return ids
//  }
//  getAllSheets(){
//    const sheets = this.sheets
//    const sh = [...sheets.values()]
//    return sh 
//  }
//
//  removeSheet(id){
//    const sheet = this.getSheet(id) 
//    const dheet = this.getDheet(id) 
//    const sheets = this.sheets
//    const dheets = this.dheets
//    sheet.clear()
//    dheet.clear()
//    sheets.delete(id)
//    dheets.delete(id)
//    return this
//  }
//  removeAllSheets(){
//    const sheets = this.sheets
//    sheets.clear()
//    return this
//  }
//  hideSheet(id){
//    const sheet = this.getSheet(id) 
//    const dheet = this.getDheet(id) 
//    sheet.hide() 
//    dheet.hide() 
//  }
//  showSheet(id){
//    const sheet = this.getSheet(id) 
//    const dheet = this.getDheet(id) 
//    sheet.show() 
//    dheet.show() 
//  }
//
//}

