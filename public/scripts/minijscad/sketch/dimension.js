

export const Dimension = class {
  constructor(parentObj, id, type, param, attr, alterText){
    this.id = id
    this.parentObj = parentObj

    const element = this.add(type, param, attr, alterText)

    this.element = element
    this.param = param
    this.attr = attr
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
    const attr = this.attr
    const obj = {
      type: type,
      param: param,
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

  add(type, param, attr, alterText){
    switch(type){
      case "horizontal":{
        const dimension = this.addHorizontal(param, attr,alterText) 
        return dimension
      }
      case "vertical":{
        const dimension = this.addVertical(param, attr,alterText) 
        return dimension
      }
      case "length":{
        const dimension = this.addLength(param, attr,alterText) 
        return dimension
      }
      case "diameter":{
        const dimension = this.addDiameter(param, attr,alterText) 
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
  makeDiamArrow(arrow, x1, y1, x2, y2, size){
    arrow.line(x1, y1, x2, y2)
    const theta = Math.atan2(y2-y1, x2-x1)
    const thetaDeg = theta*180/Math.PI
    const l = size/5
    const a1 = arrow.line(0, 0, l, l).rotate(thetaDeg).translate(x1, y1)
    const a2 = arrow.line(0, 0, l, -l).rotate(thetaDeg).translate(x1, y1)
    //const a3 = arrow.line(0, 0, -l, l).rotate(thetaDeg).translate(x2, y2)
    //const a4 = arrow.line(0, 0, -l, -l).rotate(thetaDeg).translate(x2, y2)
    return arrow 
  }
  makeValueText(obj, length, Dx1, Dy1, Dx2, Dy2, font, digit, prefix, offsetX=0, offsetY=0, alterText){
    const valueText = alterText || prefix + length.toFixed(digit)

    const tx = (Dx1 + Dx2)/2 + offsetX
    const ty = (Dy1 + Dy2)/2 + offsetY
      
    const theta = Math.atan2(Dy2-Dy1, Dx2-Dx1)
    const thetaDeg = theta*180/Math.PI
    const text = obj.text(valueText).attr(font)
      .flip("y",0).rotate(-thetaDeg+180,0,0).translate(tx, ty)
    
    return text
  }
  makeDiamText(obj, length, Dx1, Dy1, Dx2, Dy2, font, digit, prefix, alterText){
    const valueText = alterText || prefix + length.toFixed(digit)

    const tx = (Dx1 + Dx2)/2
    const ty = Dy1
      
    const theta = Math.atan2(Dy2-Dy1, Dx2-Dx1)
    const thetaDeg = theta*180/Math.PI
    const text = obj.text(valueText).attr(font)
      .flip("y",0).rotate(-thetaDeg+180,0,0).translate(tx, ty)
    
    return text
  }

  addLength(param, attr,alterText){
    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance===0 ? 0 : param.distance || 5
    const font = param.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const digit = param.digit || 2
    const prefix = param.prefix || ""
    const auxiliaryFlag = param?.auxiliary 

    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const length = Math.sqrt((x2-x1)**2+(y2-y1)**2)
    const dx = distance/length*(y2-y1)
    const dy =  -distance/length*(x2-x1)
    const Dx1 = x1+dx
    const Dy1 = y1+dy
    const Dx2 = x2+dx
    const Dy2 = y2+dy
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2, size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, font, digit, prefix, 0, 0, alterText)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label 
  }

  addVertical(param, attr, alterText){

    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const font = param.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.size || 20
    const digit = param.digit || 2
    const prefix = param.prefix || ""
    const offset = param.offset || 0
    const auxiliaryFlag = param.auxiliary || true

    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const length = Math.abs(y2-y1) 
    const xAve = (x1+x2)/2
    const Dx1 = xAve + distance
    const Dy1 = y1
    const Dx2 = xAve + distance
    const Dy2 = y2
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, font, digit, prefix, 0, offset, alterText)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }

  addHorizontal(param, attr,alterText){

    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const font = param.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const digit = param.digit || 2
    const prefix = param.prefix || ""
    const offset = param.offset || 0
    const auxiliaryFlag = param.auxiliary || true

    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)

    const length = Math.abs(x2-x1) 
    const yAve = (y1+y2)/2
    const Dx1 = x1
    const Dy1 = yAve - distance
    const Dx2 = x2 
    const Dy2 = yAve - distance
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, font, digit, prefix, offset, 0,  alterText)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }

  addDiameter(param, attr,alterText){

    const [x1, y1] = param.points 
    const distance = param.distance || 5
    const font = param.font || {"font-size": 20, "stroke-width":0.1}
    const size = font?.["font-size"] || 20
    const digit = param.digit || 2
    const prefix = "Φ" 
    const auxiliaryFlag = param.auxiliary || true

    const ds = this.parentObj
    const label = ds.group()
    label.attr(attr)


    const length = y1*2 
    const xAve = x1
    const Dx1 = xAve
    const Dy1 = y1
    const Dx2= xAve
    const Dy2 = 0

    const arrow = this.makeDiamArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeDiamText(arrow,length, Dx1, Dy1, Dx2, Dy2, font, digit, prefix, alterText)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x1, y1, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }

}
