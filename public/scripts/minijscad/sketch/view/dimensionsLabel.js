
import * as DataClass from "../data.js"

export const DimensionsLabel = class {
  constructor(svg){
    this.svg = svg
    this.labelData = new DataClass.countUpDataManager()
    this.dimensionsInSheet = new DataClass.DataManager()
    //this.dimensionScreen = svg.dimensionScreen
  }

  removeDimension(id, sheetID){
    const label = this.labelData.getDataFromId(id)
    label.remove(id)

    const sheetId =  sheetID || this.svg.getCurrentSheetId()
    const includedIds = this.dimensionsInSheet.getDataFromId(sheetId)
    if(includedIds){
      includedIds.delete(id)
    }
  }

  record(sheetId, id){
    const dimensionsInSheet = this.dimensionsInSheet
    const flag = dimensionsInSheet.hasData(sheetId)
    if(!flag){
      dimensionsInSheet.addData(sheetId, new Set)
    }
    const sheetSet = dimensionsInSheet.getDataFromId(sheetId)
    sheetSet.add(id)
  }

  removeDimensionsInSheet(id){
    const sheetId = id ? id : this.svg.getCurrentSheetId() 
    const includedIds = this.dimensionsInSheet.getDataFromId(sheetId)   
    if(includedIds && includedIds.size){
      includedIds.forEach(v=>{
        this.removeDimension(v)
      })
      includedIds.clear()
    }
  }
 
  makeArrow(arrow, x1, y1, x2, y2, size){
    arrow.line(x1, y1, x2, y2)
    const theta = Math.atan2(y2-y1, x2-x1)
    const thetaDeg = theta*180/Math.PI
    const l = size/5
    const a1 = arrow.line(0, 0, l, l).rotate(thetaDeg).translate(x1, y1)
    const a2 = arrow.line(0, 0, l, -l).rotate(thetaDeg).translate(x1, y1)
    const a3 = arrow.line(0, 0, -l, l).rotate(thetaDeg).translate(x2, y2)
    const a4 = arrow.line(0, 0, -l, -l).rotate(thetaDeg).translate(x2, y2)
    return arrow 
  }

  makeValueText(obj, length, Dx1, Dy1, Dx2, Dy2, size, digit){
    const valueText = length.toFixed(digit)

    const tx = (Dx1 + Dx2)/2
    const ty = (Dy1 + Dy2)/2
      
    const theta = Math.atan2(Dy2-Dy1, Dx2-Dx1)
    const thetaDeg = theta*180/Math.PI
    //console.log(thetaDeg)
    const text = obj.text(valueText).font({size:size}).attr("stroke-width", 0.1)
      .flip("y",0).rotate(-thetaDeg+180,0,0).translate(tx, ty)
    
    return text
  }

  setLengthLabelD(parameters){
    const [x1, y1, x2, y2] = [].concat(...parameters.points)
    const distance = parameters.distance || 5
    const size = parameters.fontSize || 20
    const digit = parameters.digit || 2
    const auxiliaryFlag = parameters.auxiliary || true

    const sheetId = this.svg.getCurrentSheetId()
    const ds = this.svg.getCurrentDheet()
    const id = this.labelData.getId()
    const label = ds.group()

    const length = Math.sqrt((x2-x1)**2+(y2-y1)**2)
    const dx = distance/length*(y2-y1)
    const dy =  -distance/length*(x2-x1)
    const Dx1 = x1+dx
    const Dy1 = y1+dy
    const Dx2 = x2+dx
    const Dy2 = y2+dy
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, size, digit)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    this.labelData.addData(id, label)
    this.record(sheetId, id)
    return id
  }

  setVerticalLabelD(parameters){

    const [x1, y1, x2, y2] = [].concat(...parameters.points)
    const distance = parameters.distance || 5
    const size = parameters.fontSize || 20
    const digit = parameters.digit || 2
    const auxiliaryFlag = parameters.auxiliary || true

    const sheetId = this.svg.getCurrentSheetId()
    const ds = this.svg.getCurrentDheet()
    const id = this.labelData.getId()
    const label = ds.group()

    const length = Math.abs(y2-y1) 
    const xAve = (x1+x2)/2
    const Dx1 = xAve + distance
    const Dy1 = y1
    const Dx2 = xAve + distance
    const Dy2 = y2
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, size, digit)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    this.labelData.addData(id, label)
    this.record(sheetId, id)
    return id
  }

  setHorizontalLabelD(parameters){

    const [x1, y1, x2, y2] = [].concat(...parameters.points)
    const distance = parameters.distance || 5
    const size = parameters.fontSize || 20
    const digit = parameters.digit || 2
    const auxiliaryFlag = parameters.auxiliary || true

    const sheetId = this.svg.getCurrentSheetId()
    const ds = this.svg.getCurrentDheet()
    const id = this.labelData.getId()
    const label = ds.group()

    const length = Math.abs(x2-x1) 
    const yAve = (y1+y2)/2
    const Dx1 = x1
    const Dy1 = yAve - distance
    const Dx2 = x2 
    const Dy2 = yAve - distance
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, size, digit)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    this.labelData.addData(id, label)
    this.record(sheetId, id)
    return id
  }


}
