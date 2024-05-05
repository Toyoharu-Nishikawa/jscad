

export const Text = class {
  constructor(parentObj, id, param, attr){
    this.id = id
    this.parentObj = parentObj

    const element = this.add(param, attr)

    this.element = element
    this.param = param
    this.attr = attr
  }

  setAttr(attr){
    const element = this.element
    const attrOri = this.attr
    const newAttr = Object.assign(attrOri, attr)
    element.attr(newAttr)
    this.attr = newAttr 
  }
  getParam(){
    const param = this.param
    const attr = this.attr
    const obj = {
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

  add(param, attr){
    const parentObj = this.parentObj
    const string = param?.text
    const font = param?.font || {}
    const position = param?.position
    const theta = param?.theta || 0
    const att = attr || {}
    const x = position ? position[0] : 0
    const y = position ? position[1] : 0
    const text = parentObj.text(add=>{
      add.tspan(string)
    })
    text.font(font).attr(att)
      //.flip("y",0).rotate(-theta+180,0,0).translate(x, y)
      .flip("y",0).translate(x, y)
    text.attr(attr)
 
    return text
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
}
