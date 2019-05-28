
import * as DataClass from "../data.js"

export const Dimensions = class {
  constructor(){
    this.labelData = new DataClass.countUpDataManager()
  }

  makeArrow(x1, y1, x2, y2){
    const arrow = this.draw.group()
    const l = arrow.line(x1, y1, x2, y2)
    const theta = Math.atan2(y2-y1, x2-x1)
    const thetaDeg = theta*180/Math.PI
    const a1 = arrow.line(0, 0, 5, 5).rotate(thetaDeg).translate(x1, y1)
    const a2 = arrow.line(0, 0, 5, -5).rotate(thetaDeg).translate(x1, y1)
    const a3 = arrow.line(0, 0, -5, 5).rotate(thetaDeg).translate(x2, y2)
    const a4 = arrow.line(0, 0, -5, -5).rotate(thetaDeg).translate(x2, y2)
    return arrow 
  }

  setVerticalLabelD(id, x1, y1, x2, y2, dX=30){
    const ds = this.dimensionScreen
    const value = y2 - y1 
    const valueText = value.toFixed(2)

    const tx = Math.max(x1, x2) + dX 
    const ty = (y1 + y2)/2

    const text = ds.text(valueText)
      .flip("y").rotate(90).translate(tx, ty)

    const dx1 = tx > x1 ? 15 : -15
    const dx2 = tx > x2 ? 15 : -15
    const label = ds.group()

    const l1 = ds.line(x1, y1, tx+dx1, y1 )
    const l2 = ds.line(x2, y2, tx+dx2, y2 )
    const arrow = this.makeArrow(tx, y1, tx, y2)
      .data("id",{id: id, type:"arrow"})
    
    const clone = this.makeDimensionClone(arrow).draggable()
    arrow.add(text) 
    label.add(arrow)
    label.add(l1)
    label.add(l2)
    label.data("info", {dX: dX})

    clone.on("dragmove",(e)=>{
      if(!arrow.data("isSelected")){
        arrow.stroke({color:"yellow"})
      }
      const {handler, p} = e.detail
      e.preventDefault()
      const x = p.x - handler.startPoints.point.x 
      const y = p.y - handler.startPoints.point.y 
      const gx = p.x + handler.startPoints.transform.x
 
      handler.el.matrix(handler.startPoints.transform).transform({x:x, y: 0}, true)
      arrow.matrix(handler.startPoints.transform).transform({x:x, y: 0}, true)  

      const dx1 = gx > x1 ? 15 : -15
      const dx2 = gx > x2 ? 15 : -15
 
      l1.plot(x1, y1, gx+dx1, y1)
      l2.plot(x2, y2, gx+dx2, y2)
      const rX = gx-tx+dX
      label.data("info", {dX: rX})
    })

    this.labelData.addData(id, label)

  }

  changeVerticalLabelD(id, x1, y1, x2, y2, dX){
    const label = this.labelData.getDataFromId(id)
    label.remove()
    this.setVerticalLabelD(id, x1, y1, x2, y2, dX)
  }

  setHorizontalLabelD(id, x1, y1, x2, y2, dY=-30){
    const ds = this.dimensionScreen
    const value = x2 - x1 
    const valueText = value.toFixed(2)

    const tx = (x1 + x2)/2
    const ty = Math.min(y1, y2) + dY

    const text = ds.text(valueText)
      .flip("y").translate(tx, ty)

    const dy1 = ty > y1 ? 15 : -15
    const dy2 = ty > y2 ? 15 : -15
    const label = ds.group()

    const l1 = ds.line(x1, y1, x1, ty+dy1 )
    const l2 = ds.line(x2, y2, x2, ty+dy2 )
    const arrow = this.makeArrow(x1, ty, x2, ty)
      .data("id",{id: id, type:"arrow"})
    
    const clone = this.makeDimensionClone(arrow).draggable()
    arrow.add(text) 
    label.add(arrow)
    label.add(l1)
    label.add(l2)
    label.data("info", {dY: dY, type:"horizontal"})

    clone.on("dragmove",(e)=>{
      if(!arrow.data("isSelected")){
        arrow.stroke({color:"yellow"})
      }
      const {handler, p} = e.detail
      e.preventDefault()
      const x = p.x - handler.startPoints.point.x 
      const y = p.y - handler.startPoints.point.y 
      const gy = p.y + handler.startPoints.transform.y
 
      handler.el.matrix(handler.startPoints.transform).transform({x:0, y: y}, true)
      arrow.matrix(handler.startPoints.transform).transform({x:0, y: y}, true)  

      const dy1 = gy > y1 ? 15 : -15
      const dy2 = gy > y2 ? 15 : -15
 
      l1.plot(x1, y1, x1, gy+dy1)
      l2.plot(x2, y2, x2, gy+dy2)
      const rY = gy-ty+dY
      label.data("info", {dY: rY })
    })

    this.labelData.addData(id, label)

  }

  changeHorizontalLabelD(id, x1, y1, x2, y2, dY){
    const label = this.labelData.getDataFromId(id)
    label.remove()
    this.setHorizontalLabelD(id, x1, y1, x2, y2, dY)
  }

}
