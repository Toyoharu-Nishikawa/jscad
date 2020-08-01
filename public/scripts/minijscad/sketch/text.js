

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

  add(param, attr){
    const parentObj = this.parentObj
    const string = param?.text
    const font = param?.font || {}
    const position = param?.position
    const theta = param?.theta || 0
    const att = attr || {}
    const x = position ? position[0] : 0
    const y = position ? position[1] : 0
    const text = parentObj.text(string).font(font).attr(att)
      .flip("y",0).rotate(-theta+180,0,0).translate(x, y)
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
