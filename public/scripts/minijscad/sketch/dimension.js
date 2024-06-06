

export const Dimension = class {
  constructor(parentObj, id, type, param, dimStyle, attr){
    this.id = id
    this.parentObj = parentObj

    const element = this.add(type, param, dimStyle, attr)

    this.element = element
    this.param = param
    this.attr = attr
    this.dimStyle = dimStyle
    this.type = type
  }

  setAttr(attr){
    const element = this.element
    const attrOri = this.attr
    const newAttr = Object.assign(attrOri, attr)
    element.attr(newAttr)
    this.attr = newAttr 
  }
  getParam(){
    const type = this.type
    const param = this.param
    const dimStyle = this.dimStyle
    const attr = this.attr
    const obj = {
      type: type,
      param: param,
      dimStyle: dimStyle,
      attr: attr,
    }
    return obj
  }

  getId(){
    const id = this.id
    return id
  }
  getElement(){
    const element = this.element
    return element 
  }

  add(type, param, dimStyle, attr){
    switch(type){
      case "horizontal":{
        const dimension = this.addHorizontal(param, dimStyle, attr) 
        return dimension
      }
      case "vertical":{
        const dimension = this.addVertical(param, dimStyle, attr) 
        return dimension
      }
      case "aligned":{
        const dimension = this.addAligned(param, dimStyle, attr) 
        return dimension
      }
      case "radius":{
        const dimension = this.addRadius(param, dimStyle,  attr) 
        return dimension
      }
      case "diameter":{
        const dimension = this.addDiameter(param, dimStyle,  attr) 
        return dimension
      }
      case "angle":{
        const dimension = this.addAngle(param, dimStyle,  attr) 
        return dimension
      }
    } 
  }
  remove(){
    const element = this.element
    element.remove()
  }
  hide(){
    const element = this.element
    element.hide()
  }
  show(){
    const element = this.element
    element.show()
  }
 
  makeDimLine(arrow,dimLineParams ){
    const Dx1                    = dimLineParams.Dx1
    const Dy1                    = dimLineParams.Dy1 
    const Dx2                    = dimLineParams.Dx2 
    const Dy2                    = dimLineParams.Dy2
    const size                   = dimLineParams.size
    const showStartSideArrow     = dimLineParams.showStartSideArrow
    const showTerminalSideArrow  = dimLineParams.showTerminalSideArrow

    arrow.line(Dx1, Dy1, Dx2, Dy2)
    const theta = Math.atan2(Dy2-Dy1, Dx2-Dx1)
    const thetaDeg = theta*180/Math.PI
    const l = size/5
    if(showStartSideArrow){
      const a1 = arrow.line(0, 0, l, l).rotate(thetaDeg,0,0).translate(Dx1, Dy1)
      const a2 = arrow.line(0, 0, l, -l).rotate(thetaDeg,0,0).translate(Dx1, Dy1)
    }
    if(showTerminalSideArrow){
      const a3 = arrow.line(0, 0, -l, l).rotate(thetaDeg,0,0).translate(Dx2, Dy2)
      const a4 = arrow.line(0, 0, -l, -l).rotate(thetaDeg,0,0).translate(Dx2, Dy2)
    }
    return arrow 
  }
  makeDimArc(arrow,dimLineParams ){
    const cx                     = dimLineParams.cx
    const cy                     = dimLineParams.cy 
    const radius                 = dimLineParams.radius 
    const start                  = dimLineParams.start
    const end                    = dimLineParams.end
    const size                   = dimLineParams.size
    const showStartSideArrow     = dimLineParams.showStartSideArrow
    const showTerminalSideArrow  = dimLineParams.showTerminalSideArrow

    const Dx1 = cx + radius*Math.cos(start/180*Math.PI)
    const Dy1 = cy + radius*Math.sin(start/180*Math.PI)
    const Dx2 = cx + radius*Math.cos(end/180*Math.PI)
    const Dy2 = cy + radius*Math.sin(end/180*Math.PI)

    arrow.arc(cx,cy,radius,start,end).fill("none")
    const l = size/5
    if(showStartSideArrow){
      const a1 = arrow.line(0, 0, -l , l).rotate(start,0,0).translate(Dx1, Dy1)
      const a2 = arrow.line(0, 0,  l,  l).rotate(start,0,0).translate(Dx1, Dy1)
    }
    if(showTerminalSideArrow){
      const a3 = arrow.line(0, 0, -l, -l).rotate(end,0,0).translate(Dx2, Dy2)
      const a4 = arrow.line(0, 0,  l, -l).rotate(end,0,0).translate(Dx2, Dy2)
    }
    return arrow 
  }
  makeDimText(obj, textParams){
    const dimText         = textParams.dimText
    const DCx             = textParams.DCx
    const DCy             = textParams.DCy
    const textAngle       = textParams.textAngle 
    const font            = textParams.font 
    const decimalPlaces   = textParams.decimalPlaces 
    const prefix          = textParams.prefix 
    const suffix          = textParams.suffix  
    const offsetX         = textParams.offsetX || 0 
    const offsetY         = textParams.offsetY || 0 
    const alternativeText = textParams.alternativeText

    const valueText = alternativeText || prefix + dimText.toFixed(decimalPlaces) + suffix

    const tx = DCx + offsetX
    const ty = DCy + offsetY
      
    const fontSize = font["font-size"]  
    const height = -fontSize/2
    const text = obj.text(valueText).attr(font).center(0, height)
      .flip("y",0).rotate(textAngle,0,0).translate(tx, ty)
    return text
  }

  addAligned(param, dimStyle, attr){
    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance===0 ? 0 : param.distance || 5
    const alternativeText = param?.alternativeText
    const offsetX = param.offsetX
    const offsetY = param.offsetY

    const prefix = dimStyle?.prefix || ""
    const suffix = dimStyle?.suffix || ""
    const showAuxiliaryLines = dimStyle?.showAuxiliaryLines ===false ? false : true
    const showStartSideArrow = dimStyle?.showStartSideArrow ===false ? false : true
    const showTerminalSideArrow = dimStyle?.showTerminalSideArrow ===false ? false : true
    const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const decimalPlaces = isNaN(dimStyle?.decimalPlaces)? 2 : dimStyle?.decimalPlaces
 

    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const length = Math.sqrt((x2-x1)**2+(y2-y1)**2)
    const dimText = length
    const dx = distance/length*(y2-y1)
    const dy =  -distance/length*(x2-x1)
    const Dx1 = x1+dx
    const Dy1 = y1+dy
    const Dx2 = x2+dx
    const Dy2 = y2+dy

    const DCx = (Dx1+Dx2)/2
    const DCy = (Dy1+Dy2)/2
    const textAngle = Math.atan2(Dy2-Dy1, Dx2-Dx1)*180/Math.PI

    const dimLineParams = {Dx1, Dy1, Dx2, Dy2, size,showStartSideArrow,showTerminalSideArrow}
    const textParams = {
      dimText, DCx, DCy, textAngle, 
      font, decimalPlaces, prefix, suffix,
      offsetX, offsetY,
      alternativeText
    }
    const arrow = this.makeDimLine(label,dimLineParams)
    const text = this.makeDimText(arrow, textParams)
    
    if(showAuxiliaryLines){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label 
  }

  addVertical(param, dimStyle, attr){

    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const alternativeText = param?.alternativeText
    const offsetX = param.offsetX
    const offsetY = param.offsetY

    const prefix = dimStyle?.prefix || ""
    const suffix = dimStyle?.suffix || ""
    const showAuxiliaryLines = dimStyle?.showAuxiliaryLines ===false ? false : true
    const showStartSideArrow = dimStyle?.showStartSideArrow ===false ? false : true
    const showTerminalSideArrow = dimStyle?.showTerminalSideArrow ===false ? false : true
    const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const decimalPlaces = isNaN(dimStyle?.decimalPlaces)? 2 : dimStyle?.decimalPlaces
 
    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const dimText = Math.abs(y2-y1) 
    const xMax = Math.max(x1,x2) 
    const Dx1 = xMax + distance
    const Dy1 = y1
    const Dx2 = xMax + distance
    const Dy2 = y2

    const DCx = (Dx1+Dx2)/2
    const DCy = (Dy1+Dy2)/2
    const textAngle = Math.atan2(Dy2-Dy1, Dx2-Dx1)*180/Math.PI


    const dimLineParams = {Dx1, Dy1, Dx2, Dy2, size,showStartSideArrow,showTerminalSideArrow}
    const textParams = {
      dimText, DCx, DCy, textAngle, 
      font, decimalPlaces, prefix, suffix,
      offsetX, offsetY,
      alternativeText
    }

    const arrow = this.makeDimLine(label,dimLineParams)
    const text = this.makeDimText(arrow, textParams)
    
    if(showAuxiliaryLines){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }

  addHorizontal(param, dimStyle, attr){

    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const alternativeText = param?.alternativeText
    const offsetX = param.offsetX
    const offsetY = param.offsetY

    const prefix = dimStyle?.prefix || ""
    const suffix = dimStyle?.suffix || ""
    const showAuxiliaryLines = dimStyle?.showAuxiliaryLines || true
    const showStartSideArrow = dimStyle?.showStartSideArrow || true
    const showTerminalSideArrow = dimStyle?.showTerminalSideArrow || true
    const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const decimalPlaces = isNaN(dimStyle?.decimalPlaces)? 2 : dimStyle?.decimalPlaces
 
    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const dimText = Math.abs(x2-x1) 
    const yMin = Math.min(y1,y2)
    const Dx1 = x1
    const Dy1 = yMin - distance
    const Dx2 = x2 
    const Dy2 = yMin - distance

    const DCx = (Dx1+Dx2)/2
    const DCy = (Dy1+Dy2)/2
    const textAngle = Math.atan2(Dy2-Dy1, Dx2-Dx1)*180/Math.PI


    const dimLineParams = {Dx1, Dy1, Dx2, Dy2, size,showStartSideArrow,showTerminalSideArrow}
    const textParams = {
      dimText, DCx,DCy,textAngle, 
      font, decimalPlaces, prefix, suffix,
      offsetX, offsetY,
      alternativeText
    }

    const arrow = this.makeDimLine(label,dimLineParams)
    const text = this.makeDimText(arrow, textParams)
 
    
    if(showAuxiliaryLines){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }
  addRadius(param, dimStyle, attr){
    const [cx, cy] = param.center 
    const radius = param.radius
    const angle = param.angle
    const alternativeText = param?.alternativeText
    const offsetX = param.offsetX
    const offsetY = param.offsetY

    const prefixTmp = dimStyle?.prefix || ""
    const prefix = prefixTmp + "R"
    const suffix = dimStyle?.suffix || ""
    const showStartSideArrow = dimStyle?.showStartSideArrow || false
    const showTerminalSideArrow = dimStyle?.showTerminalSideArrow || true
    const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const decimalPlaces = isNaN(dimStyle?.decimalPlaces)? 2 : dimStyle?.decimalPlaces
 
    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const dimText = radius
    const angleRad = angle/180*Math.PI
    const Dx1 = cx 
    const Dy1 = cy
    const Dx2 = cx + radius * Math.cos(angleRad)
    const Dy2 = cy + radius * Math.sin(angleRad)

    const DCx = (Dx1+Dx2)/2
    const DCy = (Dy1+Dy2)/2
    const textAngle = Math.atan2(Dy2-Dy1, Dx2-Dx1)*180/Math.PI

    const dimLineParams = {Dx1, Dy1, Dx2, Dy2, size,showStartSideArrow,showTerminalSideArrow}
    const textParams = {
      dimText, DCx, DCy, textAngle, 
      font, decimalPlaces, prefix, suffix,
      offsetX, offsetY,
      alternativeText
    }

    const arrow = this.makeDimLine(label,dimLineParams)
    const text = this.makeDimText(arrow, textParams)
 
    return label
  }

  addDiameter(param, dimStyle, attr){
    const [cx, cy] = param.center 
    const radius = param.radius
    const angle = param.angle
    const alternativeText = param?.alternativeText
    const offsetX = param.offsetX
    const offsetY = param.offsetY

    const prefixTmp = dimStyle?.prefix || ""
    const prefix = prefixTmp + "Φ"
    const suffix = dimStyle?.suffix || ""
    const showStartSideArrow = dimStyle?.showStartSideArrow || true
    const showTerminalSideArrow = dimStyle?.showTerminalSideArrow || true
    const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const decimalPlaces = isNaN(dimStyle?.decimalPlaces)? 2 : dimStyle?.decimalPlaces
 
    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const length = radius*2
    const dimText = length
    const angleRad = angle/180*Math.PI
    const Dx1 = cx + radius * Math.cos(angleRad+Math.PI) 
    const Dy1 = cy + radius * Math.sin(angleRad+Math.PI)
    const Dx2 = cx + radius * Math.cos(angleRad)
    const Dy2 = cy + radius * Math.sin(angleRad)

    const DCx = (Dx1+Dx2)/2
    const DCy = (Dy1+Dy2)/2
    const textAngle = Math.atan2(Dy2-Dy1, Dx2-Dx1)*180/Math.PI


    const dimLineParams = {Dx1, Dy1, Dx2, Dy2, size,showStartSideArrow,showTerminalSideArrow}
    const textParams = {
      dimText, DCx, DCy, textAngle, 
      font, decimalPlaces, prefix, suffix,
      offsetX, offsetY,
      alternativeText
    }

    const arrow = this.makeDimLine(label,dimLineParams)
    const text = this.makeDimText(arrow, textParams)
 
    return label
  }
  addAngle(param, dimStyle, attr){
    const [cx, cy] = param.center 
    const radius = param.radius
    const start = param.start
    const end = param.end
    const alternativeText = param?.alternativeText
    const offsetX = param.offsetX
    const offsetY = param.offsetY

    const prefix = dimStyle?.prefix || ""
    const suffixTmp = dimStyle?.suffix || ""
    const suffix = dimStyle?.suffix || "°"
    const showStartSideArrow = dimStyle?.showStartSideArrow || true
    const showTerminalSideArrow = dimStyle?.showTerminalSideArrow || true
    const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const decimalPlaces = isNaN(dimStyle?.decimalPlaces)? 2 : dimStyle?.decimalPlaces
 
    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const degree = end - start
    const dimText = degree
    const DCangle = degree/2+start
    const DCx = cx + radius*Math.cos(DCangle/180*Math.PI)
    const DCy = cy + radius*Math.sin(DCangle/180*Math.PI)
    const textAngle = (end+start)/2-90
    const dimLineParams = {cx, cy, radius, start,end, size,showStartSideArrow,showTerminalSideArrow}
    const textParams = {
      dimText, DCx, DCy, textAngle, 
      font, decimalPlaces, prefix, suffix,
      offsetX, offsetY,
      alternativeText
    }
    const arrow = this.makeDimArc(label,dimLineParams)
    const text = this.makeDimText(arrow, textParams)
 
    return label
  }

}
