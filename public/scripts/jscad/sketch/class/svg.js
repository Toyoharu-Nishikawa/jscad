import {addExtendElements} from "./extra.js"

const blackLine = {color:"black",opacity: 1.0,width:1}
const blueLine = {color:"blue",opacity: 1.0,width:1}

export const Svg = class {
  constructor(elem){
    this.draw = SVG(elem).panZoom({zoomFactor:1.1})
    this.currentSheetNumber = 0

    this.background = this.makeScreen(blackLine,"black")
    this.screen = this.makeScreen(blueLine,"none")
    this.nodeScreen = this.makeScreen(blackLine,"black")
    this.dimensionScreen = this.makeScreen(blackLine,"black")

    this.sheets = this.makeSheets()

    addExtendElements()
  }
  setScreenSize(width, height){
    this.draw.width(width);
    this.draw.height(height);
    this.draw.attr('preserveAspectRatio', 'xMinYMin slice');
    this.draw.style( {
      border: '1px solid #F5F5F5',
      margin:0,
      padding:0,
      background:'linear-gradient(to bottom, white, RoyalBlue )'
    })
    this.draw.viewbox(0, 0, width,height).flip('y')
  }
  resize(width, height){
    this.draw.width(width)
    this.draw.height(height)
  }
  makeScreen(strokeObj, fillObj, obj){
    const elem =  obj || this.draw 
    const screen = elem.group()
      .stroke(strokeObj)
      .fill(fillObj)
      .attr("vector-effect", "non-scaling-stroke")
    return screen
  }
  makeSheets(){
    const screen = this.screen
    const currentSheetNumber = this.currentSheetNumber
    screen.sheet = []
    const sheet = screen.group().data("key", {sheetNumber:currentSheetNumber})
    screen.sheet.push(sheet)

    const sheets = new Map([[currentSheetNumber, sheet]])
    return sheets 
  }
  addSheet(){
    this.currentSheetNumber++
    const cSN = this.currentSheetNumber
    const sheets = this.sheets
    const screen = this.screen
    const newSheet = screen.group().data("key", {sheetNumber:cSN})
    screen.sheet.push(newSheet)
    sheets.set(cSN, newSheet)
    return newSheet 
  }
  getCurrentSheet(){
    const sheets = this.sheets
    const sheet = sheets.get(this.currentSheetNumber)
    return sheet
  }
  getCurrentSheetNumber(){
    return this.currentSheetNumber
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
}

