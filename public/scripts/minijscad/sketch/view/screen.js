
import * as DataClass from "../data.js"
import {Sheet} from "./sheet.js"

export const Screen  = class {
  constructor(parentObj){
    this.figs = parentObj.group() 
    this.sheetsData = new DataClass.DataManager()
 
  }
  setAttr(attr){
    const figs = this.figs
    figs.attr(attr)
  }
  addSheet(sheetId, attr){
    const sheetsData = this.sheetsData
    const figs = this.figs
    const sheet = new Sheet(figs, sheetId, attr)
    sheetsData.addData(sheetId, sheet)
    return sheet
  }
  getSheetFromId(sheetId){
    const sheetsData = this.sheetsData
    const sheet = sheetsData.get(sheetId)
    return sheet
  }
  getAllSheetIds(){
    const sheetsData = this.sheetsData
    const ids = [...sheetsData.keys()]
    return ids
  }
  getAllSheets(){
    const sheetsData = this.sheetsData
    const sheets = [...sheetsData.value()]
    return sheets
  }
  removeSheet(sheetId){
    const sheet = this.getSheetFromId(sheetId) 
    const sheetsData = this.sheetsData
    sheet.clear()
    sheet = null
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
