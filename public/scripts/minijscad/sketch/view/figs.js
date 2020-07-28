//import {dataMap as dashMap} from "./dash.js"
//import * as DataClass from "../data.js"
//import {EventHandler} from "./eventHandler.js"
//import {arcPath} from "./arcPath.js"
//import {Drawing} from "../../dxf-writer/Drawing.js"
//import {autocadColorMap} from "./color.js"
import {bspline} from "../../bspline/index.js"
import {setLineType} from "./setLineType.js"

export const Figs = class {
  constructor(parentObj,id, type, param, attr){
    this.id = id
    this.parentObj = parentObj

    const fig = this.addFig(type, param, attr)
    this.fig = fig
    this.param = param
    this.attr = attr
    this.type = type
  }
  getId(){
    const id = this.id
    return id
  }
  getFig(){
    const fig = this.fig
    return fig
  }
  addFig(type, param, attr){
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
    const fig = this.fig
    fig.remove()
  }
  hide(){
    const fig = this.fig
    fig.hide()
  }
  show(){
    const fig = this.fig
    fig.show()
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



//export const Figs = class {
//  constructor(svg){
//    this.flag = true 
//    this.svg = svg
//    this.eH = new EventHandler(svg.draw, svg.cloneScreen, svg.nodeScreen) 
//    this.data = new DataClass.countUpDataManager()
//    this.parameters = new DataClass.DataManager()
//    this.figsInSheet = new DataClass.DataManager()
//  }
//  invalidEvent(){
//    this.flag = false
//  }
//
//  removeFig(id){
//    const selected = this.data.getDataFromId(id)
//    const clone = this.eH.clonesData.getDataFromId(id)
//    const nodes = this.eH.nodesData.getDataFromId(id)
//    const sheetId =  this.parameters.getDataFromId(id).sheetId
//
//    selected.remove()
//    this.data.removeData(id)
//    this.parameters.removeData(id)
//    const includedIds = this.figsInSheet.getDataFromId(sheetId)
//    if(includedIds){
//      includedIds.delete(id)
//    }
//
//    if(this.flag){
//      clone.remove()
//      nodes.forEach(node=>node.remove())
//
//      this.eH.clonesData.removeData(id)
//      this.eH.nodesData.removeData(id)
//    }
//  }
//
//  record(sheetId, fid){
//    const figsInSheet = this.figsInSheet
//    const flag = figsInSheet.hasData(sheetId)
//    if(!flag){
//      figsInSheet.addData(sheetId, new Set())
//    }
//    const sheetSet = figsInSheet.getDataFromId(sheetId)
//    //console.log(sheetId)
//    sheetSet.add(fid)
//  }
//
//  removeFigsInSheet(sheetID){
//    const sheetId = sheetID || this.svg.getCurrentSheetId() 
//    const includedIds = this.figsInSheet.getDataFromId(sheetId)   
//    if(includedIds && includedIds.size){
//      includedIds.forEach(v=>{
//          this.removeFig(v, sheetId)
//      })
//      includedIds.clear()
//    }
//  }
//
//  addLine(parameters, attr, sheetID, fid){
//    if(fid){
//      const checkFlag = this.data.hasData(fid)
//      if(checkFlag){
//        throw new Error(`Figure ID ${fid} exitsts more than two`)
//      }
//    }
//    const sheetId =  sheetID || this.svg.getCurrentSheetId()
//    const sheet = this.svg.getSheet(sheetId)
//    const id = fid || this.data.getId()
// 
//    const [x1, y1, x2, y2] = [].concat(...parameters.points)
//    const line = sheet.line(x1, y1, x2, y2)
//    line.attr(attr) 
//    const lineTypeName =  attr?.lineTypeName
//    if(lineTypeName){
//      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//      line.attr("stroke-dasharray", dashCode)
//    }
//
//    line.data("id",{id:id, type:"line", sheetId: sheetId, parmeters: parameters})
//    this.data.addData(id, line)
//    this.parameters.addData(id, {parameters:parameters, attr: attr, sheetId: sheetId, type:"line"})
//    this.record(sheetId, id)
//
//    if(this.flag){
//      const p1 = [x1, y1]
//      const p2 = [x2, y2]
//      const nodes = [p1, p2]
//      line.data("nodes",nodes)
//      const pointType =  ["start", "end"]
//      this.eH.makeClone(line, 5, id, "elementclick")
//      this.eH.makeNodes(nodes, pointType, id, "nodeclick")
//    }
//
//    return id 
//  }
//
//  changeLine(id, parameters, attr){
//    const line = this.data.getDataFromId(id)
//    if(parameters){
//      const [p1, p2] = parameters.points 
//      const [x1,y1] = p1
//      const [x2,y2] = p2
//      line.plot(x1, y1, x2, y2)
//    }
//    if(attr){
//      line.attr(attr) 
//      const lineTypeName =  attr?.lineTypeName
//      if(lineTypeName){
//        const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//        line.attr("stroke-dasharray", dashCode)
//      }
//    }
//    //const cloneLine = this.eH.clonesData.getDataFromId(id)
//    //const nodes = this.eH.nodesData.getDataFromId(id)
//    //cloneLine.plot(x1, y1, x2, y2)
//    //nodes[0].center(x1, y1)
//    //nodes[1].center(x2, y2)
//    return id
//  }
//
//  addLines(parameters, attr, sheetID, fid){
//    if(fid){
//      const checkFlag = this.data.hasData(fid)
//      if(checkFlag){
//        throw new Error(`Figure ID ${fid} exitsts more than two`)
//      }
//    }
//    const sheetId =  sheetID || this.svg.getCurrentSheetId()
//    const sheet = this.svg.getSheet(sheetId)
//    const id = fid || this.data.getId()
//
//    const points = parameters.points
//    const lines = sheet.group()
//
//    points.forEach((v,i,arr)=>{
//      if(i>0){
//        lines.line(arr[i-1][0], arr[i-1][1], v[0], v[1])
//      }
//    })
//    const lineTypeName =  attr?.lineTypeName
// 
//    lines.attr(attr) 
//    if(lineTypeName){
//      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//      lines.attr("stroke-dasharray", dashCode)
//    }
//
//    lines.data("id",{id:id, type:"lines", sheetId: sheetId, parameters:parameters})
//
//    this.data.addData(id, lines)
//    this.parameters.addData(id, {parameters:parameters, type:"lines", attr: attr, sheetId: sheetId})
//    this.record(sheetId, id)
//
//    if(this.flag){
//      lines.data("nodes",points)
//      const pointType =  ["start", "end"]
//      this.eH.makeClone(lines, 5, id, "elementclick")
//      this.eH.makeNodes(points, pointType, id, "nodeclick")
//    }
//
//    return id 
//  }
//
//  addPolyline(parameters, attr, sheetID, fid){
//    if(fid){
//      const checkFlag = this.data.hasData(fid)
//      if(checkFlag){
//        throw new Error(`Figure ID ${fid} exitsts more than two`)
//      }
//    }
//    const sheetId =  sheetID || this.svg.getCurrentSheetId()
//    const sheet = this.svg.getSheet(sheetId)
//    const id = fid || this.data.getId()
//
//
//    const points = parameters.points
//    const polyline = sheet.polyline(points)
//
//    const lineTypeName = attr?.lineTypeName
// 
//    polyline.attr(attr) 
//    if(lineTypeName){
//      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//      polyline.attr("stroke-dasharray", dashCode)
//    }
//
//    polyline.data("id",{id:id, type:"polyline", sheetId: sheetId, paramters: parameters})
//
//    this.data.addData(id, polyline)
//    this.parameters.addData(id, {parameters:parameters, type:"polyline", attr: attr, parameters: parameters})
//    this.record(sheetId, id)
//
//    if(this.flag){
//      polyline.data("nodes",points)
//      const pointType =  ["start", "end"]
//      this.eH.makeClone(polyline, 5, id, "elementclick")
//      this.eH.makeNodes(points, pointType, id, "nodeclick")
//    }
//
//    return id 
//  }
//
//  addCircle(parameters, attr, sheetID, fid){
//    if(fid){
//      const checkFlag = this.data.hasData(fid)
//      if(checkFlag){
//        throw new Error(`Figure ID ${fid} exitsts more than two`)
//      }
//    }
//    const sheetId =  sheetID || this.svg.getCurrentSheetId()
//    const sheet = this.svg.getSheet(sheetId)
//    const id = fid || this.data.getId()
//
//
//    const [cx, cy] = parameters.center 
//    const r = parameters.radius
//    const circle = sheet.circle(2*r).center(cx, cy)
//
//    const lineTypeName = (attr !== undefined && attr.hasOwnProperty("lineTypeName")) ? attr.lineTypeName : undefined
//    
//    circle.attr(attr) 
//    if(lineTypeName){
//      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//      circle.attr("stroke-dasharray", dashCode)
//    }
//
//  
//    circle.data("id",{id:id, type:"circle", sheetId: sheetId, parameters:parameters})
//
//    this.data.addData(id, circle)
//    this.parameters.addData(id, {parameters:parameters, type:"circle", attr: attr, sheetId: sheetId})
//    this.record(sheetId, id)
//
//    if(this.flag){
//      const nodes = [[cx, cy]]
//      circle.data("nodes",nodes)
//      const pointType =  ["center"]
//      this.eH.makeClone(circle, 5, id, "elementclick")
//      this.eH.makeNodes(nodes, pointType, id, "nodeclick")
//    }
//
//    return id 
//  }
//
//
//  addArc( parameters, attr, sheetID, fid){
//    if(fid){
//      const checkFlag = this.data.hasData(fid)
//      if(checkFlag){
//        throw new Error(`Figure ID ${fid} exitsts more than two`)
//      }
//    }
//
//    const sheetId =  sheetID || this.svg.getCurrentSheetId()
//    const sheet = this.svg.getSheet(sheetId)
//    const id = fid || this.data.getId()
//
//    const [cx, cy] = parameters.center 
//    const r = parameters.radius
//    const theta1 = parameters.start
//    const theta2 = parameters.end
//    const arc = sheet.arc(cx, cy, r, theta1, theta2)
//
//    const lineTypeName =  attr?.lineTypeName
// 
//    arc.attr(attr)
//    if(lineTypeName){
//      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//      arc.attr("stroke-dasharray", dashCode)
//    }
//
//
//    arc.data("id",{id:id, type:"arc", sheetId: sheetId, parameters: parameters })
//
//    this.data.addData(id, arc)
//    this.parameters.addData(id, {parameters:parameters, type:"arc", attr: attr, sheetId: sheetId})
//    this.record(sheetId, id)
//
//    if(this.flag){
//      const c = [cx, cy]
//      const p1 = [cx+r*Math.cos(theta1*Math.PI/180), cy+r*Math.sin(theta1*Math.PI/180)]
//      const p2 = [cx+r*Math.cos(theta2*Math.PI/180), cy+r*Math.sin(theta2*Math.PI/180)]
//      const nodes = [ c, p1, p2 ]
//      arc.data("nodes",nodes)
//      const pointType =  ["center", "start", "end"]
//      this.eH.makeClone(arc, 5, id, "elementclick")
//      this.eH.makeNodes(nodes, pointType, id, "nodeclick")
//    }
//
//    return id 
//  }
//
//  changeArc(id, parameters, attr){
//    const {center, r, theta1, theta2} = parameters
//
//    const arc = this.data.getDataFromId(id)
//    const cloneArc = this.eH.clonesData.getDataFromId(id)
//    const nodes = this.eH.nodesData.getDataFromId(id)
//    const pathText = arcPath(cx, cy, r, theta1, theta2)
//    arc.attr({d:pathText})
//    cloneArc.attr({d:pathText})
//    const c = [cx, cy]
//    const p1 = [cx+r*Math.cos(theta1*Math.PI/180), cy+r*Math.sin(theta1*Math.PI/180)]
//    const p2 = [cx+r*Math.cos(theta2*Math.PI/180), cy+r*Math.sin(theta2*Math.PI/180)]
//    nodes[0].center(c[0], c[1])
//    nodes[1].center(p1[0], p1[1])
//    nodes[2].center(p2[0], p2[1])
//    return id
//  }
//
//  addBSpline( parameters, attr, sheetID, fid){
//    if(fid){
//      const checkFlag = this.data.hasData(fid)
//      if(checkFlag){
//        throw new Error(`Figure ID ${fid} exitsts more than two`)
//      }
//    }
//
//    const sheetId =  sheetID || this.svg.getCurrentSheetId()
//    const sheet = this.svg.getSheet(sheetId)
//    const id = fid || this.data.getId()
//
//    const knots = parameters.knots
//    const points = parameters.points
//    const degree = parameters.degree
//
//    const func = bspline(points, degree, knots) 
//    const N = 100
//    const curvePoints = [...Array(N+1)].map((v,i)=>func(i/N,0))
//    const bsplineCurve = sheet.polyline(curvePoints)
//
//    const lineTypeName =  attr?.lineTypeName
// 
//    bsplineCurve.attr(attr)
//    if(lineTypeName){
//      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
//      bspline.attr("stroke-dasharray", dashCode)
//    }
//
//
//    bsplineCurve.data("id",{id:id, type:"bspline", sheetId: sheetId, parameters: parameters })
//
//    this.data.addData(id, bsplineCurve)
//    this.parameters.addData(id, {parameters:parameters, type:"bspline", attr: attr, sheetId: sheetId})
//    this.record(sheetId, id)
//
//    return id 
//  }
//
//  getDxf(sheetList){
//    const d = new Drawing()
//
//    d.addLineType("CENTER", "____ _ ____",[31.75, -6.35, 6.35, -6.35])
//    d.addLineType("CENTER2", "____ _ ____",[19.05, -3.175, 3.175, -3.175])
//    d.addLineType("CENTERX2", "____ _ ____",[63.5, -12.7, 12.7, -12.7])
//    d.addLineType("DASHED", "__  __",[5, -5])
//    d.addLineType("DASHED2", "__  __",[6.35, -3.175])
//    d.addLineType("DASHEDX2", "__  __",[25.4, -12.7])
//    d.addLineType("PHANTOM", "____ _ _ ____",[31.75, -6.35, 6.35, -6.35, 6.35, -6.35])
//    d.addLineType("PHANTOM2", "____ _ _ ____",[15.875, -3.175, 3.175, -3.175, 3.175, -3.175])
//    d.addLineType("PHANTOMX2", "____ _ _ ____",[63.5, -12.7, 12.7, -12.7, 12.7, -12.7])
//    d.addLineType("DASHDOT", "__ . __ . __",[12.7, -6.35, 0.1, -6.35])
//    d.addLineType("DASHDOT2", "__ . __ . __",[6.35, -3.175, 0.1, -3.175])
//    d.addLineType("DASHDOTX2", "__ . __ . __",[25.4, -12.7, 0.1, -12.7])
//    d.addLineType("DOT", ".  . .",[0.1, -6.35])
//    d.addLineType("DOT2", ".  . .",[0.1, -3.175])
//    d.addLineType("DOTX2", ".  . .",[0.1, -12.7])
//    d.addLineType("DIVIDE", "__ . . __",[12.7, -6.35, 0.1, -6.35, 0.1, -6.35])
//    d.addLineType("DIVIDE2", "__ . . __",[6.35, -3.175, 0.1, -3.175, 0.1, -3.175])
//    d.addLineType("DIVIDEX2", "__ . . __",[25.4, -12.7, 0.1, -12.7, 0.1, -12.7])
//
//    const sheets = this.svg.sheets
//    const screen = this.svg.screen
//    const screenStroke = screen.attr("stroke")
//
//    for(let [key, value] of sheets){
//      if(sheetList && !sheetList.includes(key) ){
//        continue
//      }
//      const figsInSheet = this.figsInSheet.getDataFromId(key)
//      if(figsInSheet && figsInSheet.size){
//        const sheetData = value.data("key")
//        const sheetAttr = sheetData.attr
//        const sheetStroke = sheetAttr.hasOwnProperty("stroke") ? sheetAttr.stroke : undefined
//        const sheetLineType = sheetAttr.hasOwnProperty("stroke-dasharray") ? 
//          sheetAttr["stroke-dasharray"] : undefined
//
//        const stroke = sheetStroke || screenStroke 
//        const color = autocadColorMap.get(stroke)
//        const lineType = sheetLineType || "CONTINUOUS" 
//        d.addLayer(key, color, lineType)
//        d.setActiveLayer(key)
//        for(let figId of figsInSheet){
//          const fig = this.data.getDataFromId(figId) 
//          const param = this.parameters.getDataFromId(figId)
//          const type = param.type
//
//          switch(type){
//            case "line":{
//              const points = [].concat(...param.parameters.points)
//              d.drawLine(...points)
//              break
//            }
//            case "polyline":
//            case "lines":{
//              const points = param.parameters.points
//              points.forEach((v,i,arr)=>{
//                if(i>0){
//                  d.drawLine(arr[i-1][0], arr[i-1][1],v[0],v[1])
//                }
//              })
//              break
//            }
//            case "circle":{
//              const center = param.parameters.center
//              const radius = param.parameters.radius
//              d.drawCircle(center[0], center[1], radius)
//              break
//            }
//            case "arc":{
//              const center = param.parameters.center
//              const radius = param.parameters.radius
//              const start = param.parameters.start
//              const end = param.parameters.end
//              d.drawArc(center[0], center[1], radius, start, end)
//              break
//            }
//          }
//        }
//      }
//    }
//
//    const string = d.toDxfString()
//    return string
//  } 
//}
