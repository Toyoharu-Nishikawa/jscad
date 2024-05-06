import * as DataClass from "./data.js"
import {Sheet} from "./sheet.js"

export const Screen  = class {
  constructor(parentObj, backgroundColor){
    this.backgroundColor = backgroundColor
    this.figs = parentObj.group() 
    this.sheetsData = new DataClass.DataManager()
    this.parentObj = parentObj
 
  }
  setBackgroundColor(backgroundColor){
    this.backgroundColor = backgroundColor
  }
  setAttr(attr){
    const figs = this.figs
    figs.attr(attr)
  }
  setScreenSize(param){
    const draw = this.parentObj
    const originX = param?.originX || 0
    const originY = param?.originY || 0
    const direction = param?.direction || "x" 
    const length = param?.length ||500 

    const widthS  = draw.width()
    const heightS =draw.height()
    if(direction=="x"){
      const width  = length 
      const height = width * heightS/widthS
      draw.viewbox(originX,originY,width, height)
    }
    else{
      const height = length 
      const width  = height * widhtS/heightS
      draw.viewbox(originX,originY,width, height)
    }
  }
  addSheet(sheetId, attrFigs,attrDimensions, attrTexts){
    const flag = this.sheetsData.hasData(sheetId)
    if(flag){
      const sheet = this.sheetsData.getDataFromId(sheetId)
      return sheet
    }
    const backgroundColor = this.backgroundColor
    const sheetsData = this.sheetsData
    const figs = this.figs
    const sheet = new Sheet(figs, sheetId, attrFigs, attrDimensions, attrTexts, backgroundColor)
    sheetsData.addData(sheetId, sheet)
    return sheet
  }
  hasSheet(sheetId){
    const flag = this.sheetsData.hasData(sheetId)
    return flag
  }
  getSheetFromId(sheetId){
    const sheetsData = this.sheetsData
    const sheet = sheetsData.getDataFromId(sheetId)
    return sheet
  }
  getAllSheetIds(){
    const sheetsData = this.sheetsData
    const ids = [...sheetsData.getKeys()]
    return ids
  }
  getAllSheets(){
    const sheetsData = this.sheetsData
    const sheets = [...sheetsData.getValues()]
    return sheets
  }
  removeSheet(sheetId){
    const sheet = this.getSheetFromId(sheetId) 
    const sheetsData = this.sheetsData
    sheet.remove()
    sheetsData.removeData(sheetId)

    return this
  }
  removeAllSheets(){
    const allSheetIds = this.getAllSheetIds()
    allSheetIds.forEach(v=>this.removeSheet(v))
  }
  hideSheet(sheetId){
    const sheet = this.getSheetFromId(sheetId) 
    sheet.hide()
  } 
  showSheet(sheetId){
    const sheet = this.getSheetFromId(sheetId) 
    sheet.show()
  } 
  hideAllSheets(){
    const allSheetIds = this.getAllSheetIds()
    allSheetIds.forEach(v=>this.hideSheet(v))
  }
  showAllSheets(){
    const allSheetIds = this.getAllSheetIds()
    allSheetIds.forEach(v=>this.showSheet(v))
  }
  getSheetParam(sheetId){
    const sheet = this.getSheetFromId(sheetId)
    const param = sheet.getParam() 
    return param
  }
  getAllSheetsParam(){
    const sheets = this.getAllSheets()
    const params = sheets.map(v=>[v.getId(),v.getParam()])
    return params
  }
}
