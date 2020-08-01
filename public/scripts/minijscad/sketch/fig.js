import {bspline} from "../bspline/index.js"
import {setLineType} from "./setLineType.js"

export const Fig = class {
  constructor(parentObj,id, type, param, attr){
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
    element.setAttr(attr)
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
      case "line":{
        const fig = this.addLine(param, attr)
        return fig 
      }
      case "lines":{
        const fig = this.addLines(param, attr)
        return fig 
      }
      case "polyline":{
        const fig = this.addPolyline(param, attr)
        return fig 
      }
      case "bspline":{
        const fig = this.addBSpline(param, attr)
        return fig 
      }
      case "circle":{
        const fig = this.addCircle(param, attr)
        return fig 
      }
      case "arc":{
        const fig = this.addArc(param, attr)
        return fig 
      }
      default:{
        console.log("type is out of list", type)
        return null
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
  addLine(param, attr){
    const parentObj = this.parentObj
 
    const [x1, y1, x2, y2] = [].concat(...param.points)
    const fig = parentObj.line(x1, y1, x2, y2)
    fig.attr(attr) 
    setLineType(fig, attr)

    return fig
  }
  addLines(param, attr){
    const parentObj = this.parentObj
 
    const points = param.points
    const fig = parentObj.group()
    points.forEach((v,i,arr)=>{
      if(i>0){
        fig.line(arr[i-1][0], arr[i-1][1], v[0], v[1])
      }
    })

    fig.attr(attr) 
    setLineType(fig, attr)

    return fig
  }

  addPolyline(param, attr){
    const parentObj = this.parentObj
 
    const points = param.points
    const fig = parentObj.polyline(points)

    fig.attr(attr) 
    setLineType(fig, attr)

    return fig
  }

  addBSpline(param, attr){
    const parentObj = this.parentObj

    const knots = param.knots
    const points = param.points
    const degree = param.degree

    const func = bspline(points, degree, knots) 
    const N = 100
    const curvePoints = [...Array(N+1)].map((v,i)=>func(i/N,0))
    const fig = parentObj.polyline(curvePoints)

    fig.attr(attr) 
    setLineType(fig, attr)

    return fig
  }

  addCircle(param, attr){
    const parentObj = this.parentObj

    const [cx, cy] = param.center 
    const r = param.radius
    const fig = parentObj.circle(2*r).center(cx, cy)

    fig.attr(attr) 
    setLineType(fig, attr)

    return fig
  }

  addArc(param, attr){
    const parentObj = this.parentObj

    const [cx, cy] = param.center 
    const r = param.radius
    const theta1 = param.start
    const theta2 = param.end
    const fig = parentObj.arc(cx, cy, r, theta1, theta2)

    fig.attr(attr) 
    setLineType(fig, attr)

    return fig
 
  }
}
