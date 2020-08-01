

export const Dimension = class {
  constructor(parentObj, id, type, param, attr){
    this.id = id
    this.parentObj = parentObj

    const element = this.add(type, param, attr)

    this.element = element
    this.param = param
    this.attr = attr
    this.type = type
  }

  setAttr(attr){
    const element = this.element
    element.attr(attr)
  }
  getId(){
    const id = this.id
    return id
  }
  getElement(){
    const element = this.element
    return element 
  }

  add(type, param, attr){
    switch(type){
      case "horizontal":{
        const dimension = this.addHorizontal(param, attr) 
        return dimension
      }
      case "vertical":{
        const dimension = this.addVertical(param, attr) 
        return dimension
      }
      case "length":{
        const dimension = this.addLength(param, attr) 
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

  makeValueText(obj, length, Dx1, Dy1, Dx2, Dy2, size, digit){
    const valueText = length.toFixed(digit)

    const tx = (Dx1 + Dx2)/2
    const ty = (Dy1 + Dy2)/2
      
    const theta = Math.atan2(Dy2-Dy1, Dx2-Dx1)
    const thetaDeg = theta*180/Math.PI
    const text = obj.text(valueText).font({size:size}).attr({"stroke-width": 0.1})
      .flip("y",0).rotate(-thetaDeg+180,0,0).translate(tx, ty)
    
    return text
  }

  addLength(param, attr){
    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const size = param.fontSize || 20
    const digit = param.digit || 2
    const auxiliaryFlag = param.auxiliary || true

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
    const arrow = this.makeArrow(label, Dx1, Dy1, Dx2, Dy2,size)
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, size, digit)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label 
  }

  addVertical(param, attr){

    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const size = param.fontSize || 20
    const digit = param.digit || 2
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
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, size, digit)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }

  addHorizontal(param, attr){

    const [x1, y1, x2, y2] = [].concat(...param.points)
    const distance = param.distance || 5
    const size = param.fontSize || 20
    const digit = param.digit || 2
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
    const text = this.makeValueText(arrow,length, Dx1, Dy1, Dx2, Dy2, size, digit)
    
    if(auxiliaryFlag){
      const l1 = ds.line(x1, y1, Dx1, Dy1)
      const l2 = ds.line(x2, y2, Dx2, Dy2)
      label.add(l1)
      label.add(l2)
    }
 
    return label
  }


}
