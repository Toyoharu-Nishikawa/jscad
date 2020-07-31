
import * as DataClass from "./data.js"
import {Sheet} from "./sheet.js"

export const Screen  = class {
  constructor(parentObj, backgroundColor){
    this.backgroundColor = backgroundColor
    this.figs = parentObj.group() 
    this.sheetsData = new DataClass.DataManager()
 
  }
  setBackgroundColor(backgroundColor){
    this.backgroundColor = backgroundColor
  }
  setAttr(attr){
    const figs = this.figs
    figs.attr(attr)
  }
  addSheet(sheetId, attrFigs,attrDimensions, attrTexts){
    const flag = this.sheetsData.hasData(sheetId)
    if(flag){
      const sheet = sheetsData.getData(sheetId)
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
    sheet.clear()
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
    sheetshow()
  } 
}
