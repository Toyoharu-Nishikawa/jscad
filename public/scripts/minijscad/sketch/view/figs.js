import {dataMap as dashMap} from "./dash.js"
import * as DataClass from "../data.js"
import {EventHandler} from "./eventHandler.js"
import {arcPath} from "./arcPath.js"
import {Drawing} from "../../dxf-writer/Drawing.js"


const autocadColorMap = new Map([
  ["black", 0],
  ["red", 1],
  ["yellow", 2],
  ["green", 3],
  ["cyan", 4],
  ["blue", 5],
  ["magenta", 6],
  ["white", 7],
])

export const Figs = class {
  constructor(svg){
    this.flag = true 
    this.svg = svg
    this.eH = new EventHandler(svg.draw, svg.cloneScreen, svg.nodeScreen) 
    this.data = new DataClass.countUpDataManager()
    this.parameters = new DataClass.DataManager()
    this.figsInSheet = new DataClass.DataManager()
  }
  invalidEvent(){
    this.flag = false
  }

  removeFig(id, sheetID){
    const selected = this.data.getDataFromId(id)
    const clone = this.eH.clonesData.getDataFromId(id)
    const nodes = this.eH.nodesData.getDataFromId(id)
    const sheetId =  sheetID || this.svg.getCurrentSheetId()

    selected.remove()
    this.data.removeData(id)
    this.parameters.removeData(id)
    const includedIds = this.figsInSheet.getDataFromId(sheetId)
    if(includedIds){
      includedIds.delete(id)
    }

    if(this.flag){
      clone.remove()
      nodes.forEach(node=>node.remove())

      this.eH.clonesData.removeData(id)
      this.eH.nodesData.removeData(id)
    }
  }

  record(sheetId, fid){
    const figsInSheet = this.figsInSheet
    const flag = figsInSheet.hasData(sheetId)
    if(!flag){
      figsInSheet.addData(sheetId, new Set())
    }
    const sheetSet = figsInSheet.getDataFromId(sheetId)
    //console.log(sheetId)
    sheetSet.add(fid)
  }

  removeFigsInSheet(id){
    const sheetId = id ? id : this.svg.getCurrentSheetId() 
    const includedIds = this.figsInSheet.getDataFromId(sheetId)   
    if(includedIds && includedIds.size){
      includedIds.forEach(v=>{
          this.removeFig(v, sheetId)
      })
      includedIds.clear()
    }
  }

  addLine(parameters, attr, fid){
    const sheetId =  this.svg.getCurrentSheetId()
    const sheet = this.svg.getCurrentSheet()
    const id = fid ? fid : this.data.getId()
 
    this.data.setId(id)
    const [x1, y1, x2, y2] = [].concat(...parameters.points)
    const line = sheet.line(x1, y1, x2, y2)

    const color = (attr !== undefined && attr.hasOwnProperty("color")) ? attr.color : undefined
    const lineTypeName = (attr !== undefined && attr.hasOwnProperty("lineTypeName")) ? attr.lineTypeName : undefined
    if(color){
      line.stroke({color: color})
    }
    if(lineTypeName){
      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
      line.attr("stroke-dasharray", dashCode)
    }

    line.data("id",{id:id, type:"line"})
    this.data.addData(id, line)
    this.parameters.addData(id, {parameters:parameters, type:"line"})
    this.record(sheetId, id)

    if(this.flag){
      const p1 = [x1, y1]
      const p2 = [x2, y2]
      const nodes = [p1, p2]
      line.data("nodes",nodes)
      const pointType =  ["start", "end"]
      this.eH.makeClone(line, 5, id, "elementclick")
      this.eH.makeNodes(nodes, pointType, id, "nodeclick")
    }

    return id 
  }

  addLines(parameters, attr, fid){
    const sheetId =  this.svg.getCurrentSheetId()
    const sheet = this.svg.getCurrentSheet()
    const id = fid ? fid : this.data.getId()

    this.data.setId(id)
    const points = parameters.points
    const lines = sheet.group()

    points.forEach((v,i,arr)=>{
      if(i>0){
        lines.line(arr[i-1][0], arr[i-1][1], v[0], v[1])
      }
    })
    const color = (attr !== undefined && attr.hasOwnProperty("color")) ? attr.color : undefined
    const lineTypeName = (attr !== undefined && attr.hasOwnProperty("lineTypeName")) ? attr.lineTypeName : undefined
 
    if(color){
      lines.stroke({color: color})
    }
    if(lineTypeName){
      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
      lines.attr("stroke-dasharray", dashCode)
    }

    lines.data("id",{id:id, type:"lines"})

    this.data.addData(id, lines)
    this.parameters.addData(id, {parameters:parameters, type:"lines", attr: attr})
    this.record(sheetId, id)

    if(this.flag){
      lines.data("nodes",points)
      const pointType =  ["start", "end"]
      this.eH.makeClone(lines, 5, id, "elementclick")
      this.eH.makeNodes(points, pointType, id, "nodeclick")
    }

    return id 
  }

  addPolyline(parameters, attr, fid){
    const sheetId =  this.svg.getCurrentSheetId()
    const sheet = this.svg.getCurrentSheet()
    const id = fid ? fid : this.data.getId()


    this.data.setId(id)
    const points = parameters.points
    const polyline = sheet.polyline(points)

    const color = (attr !== undefined && attr.hasOwnProperty("color")) ? attr.color : undefined
    const lineTypeName = (attr !== undefined && attr.hasOwnProperty("lineTypeName")) ? attr.lineTypeName : undefined
 
    if(color){
      polyline.stroke({color: color})
      
    }
    if(lineTypeName){
      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
      polyline.attr("stroke-dasharray", dashCode)
    }

    polyline.data("id",{id:id, type:"polyline"})

    this.data.addData(id, polyline)
    this.parameters.addData(id, {parameters:parameters, type:"polyline", attr: attr})
    this.record(sheetId, id)

    if(this.flag){
      polyline.data("nodes",points)
      const pointType =  ["start", "end"]
      this.eH.makeClone(polyline, 5, id, "elementclick")
      this.eH.makeNodes(points, pointType, id, "nodeclick")
    }

    return id 
  }

  addCircle(parameters, attr, fid){
    const sheetId =  this.svg.getCurrentSheetId()
    const sheet = this.svg.getCurrentSheet()
    const id = fid ? fid : this.data.getId()


    this.data.setId(id)
    const [cx, cy] = parameters.center 
    const r = parameters.radius
    const circle = sheet.circle(2*r).center(cx, cy)

    const color = (attr !== undefined && attr.hasOwnProperty("color")) ? attr.color : undefined
    const lineTypeName = (attr !== undefined && attr.hasOwnProperty("lineTypeName")) ? attr.lineTypeName : undefined
 
    if(color){
      circle.stroke({color: color})
      
    }
    if(lineTypeName){
      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
      circle.attr("stroke-dasharray", dashCode)
    }

  
    circle.data("id",{id:id, type:"circle"})

    this.data.addData(id, circle)
    this.parameters.addData(id, {parameters:parameters, type:"circle", attr: attr})
    this.record(sheetId, id)

    if(this.flag){
      const nodes = [[cx, cy]]
      circle.data("nodes",nodes)
      const pointType =  ["center"]
      this.eH.makeClone(circle, 5, id, "elementclick")
      this.eH.makeNodes(nodes, pointType, id, "nodeclick")
    }

    return id 
  }

  changeLine(id, x1,y1,x2,y2){
    const line = this.data.getDataFromId(id)
    const cloneLine = this.eH.clonesData.getDataFromId(id)
    const nodes = this.eH.nodesData.getDataFromId(id)
    line.plot(x1, y1, x2, y2)
    cloneLine.plot(x1, y1, x2, y2)
    nodes[0].center(x1, y1)
    nodes[1].center(x2, y2)
    return id
  }

  addArc( parameters, attr, fid){
    const sheetId =  this.svg.getCurrentSheetId()
    const sheet = this.svg.getCurrentSheet()
    const id = fid ? fid : this.data.getId()

    this.data.setId(id)
    //console.log("parameters",parameters)
    const [cx, cy] = parameters.center 
    const r = parameters.radius
    const theta1 = parameters.start
    const theta2 = parameters.end
    const arc = sheet.arc(cx, cy, r, theta1, theta2)

    const color = (attr !== undefined && attr.hasOwnProperty("color")) ? attr.color : undefined
    const lineTypeName = (attr !== undefined && attr.hasOwnProperty("lineTypeName")) ? attr.lineTypeName : undefined
 
    if(color){
      arc.stroke({color: color})
      
    }
    if(lineTypeName){
      const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
      arc.attr("stroke-dasharray", dashCode)
    }


    arc.data("id",{id:id, type:"arc"})
    arc.data("parameters",{cx:cx, cy:cy, r:r, theta1:theta1, theta2: theta2})

    this.data.addData(id, arc)
    this.parameters.addData(id, {parameters:parameters, type:"arc", attr: attr})
    this.record(sheetId, id)

    if(this.flag){
      const c = [cx, cy]
      const p1 = [cx+r*Math.cos(theta1*Math.PI/180), cy+r*Math.sin(theta1*Math.PI/180)]
      const p2 = [cx+r*Math.cos(theta2*Math.PI/180), cy+r*Math.sin(theta2*Math.PI/180)]
      const nodes = [ c, p1, p2 ]
      arc.data("nodes",nodes)
      const pointType =  ["center", "start", "end"]
      this.eH.makeClone(arc, 5, id, "elementclick")
      this.eH.makeNodes(nodes, pointType, id, "nodeclick")
    }

    return id 
  }

  changeArc(id, cx, cy, r, theta1, theta2){
    const arc = this.data.getDataFromId(id)
    const cloneArc = this.eH.clonesData.getDataFromId(id)
    const nodes = this.eH.nodesData.getDataFromId(id)
    //console.log(arc)
    //console.log(cloneArc)
    const pathText = arcPath(cx, cy, r, theta1, theta2)
    arc.attr({d:pathText})
    cloneArc.attr({d:pathText})
    const c = [cx, cy]
    const p1 = [cx+r*Math.cos(theta1*Math.PI/180), cy+r*Math.sin(theta1*Math.PI/180)]
    const p2 = [cx+r*Math.cos(theta2*Math.PI/180), cy+r*Math.sin(theta2*Math.PI/180)]
    nodes[0].center(c[0], c[1])
    nodes[1].center(p1[0], p1[1])
    nodes[2].center(p2[0], p2[1])
    return id
  }

  getDxf(sheetList){
    const d = new Drawing()

    d.addLineType("CENTER", "____ _ ____",[31.75, -6.35, 6.35, -6.35])
    d.addLineType("CENTER2", "____ _ ____",[19.05, -3.175, 3.175, -3.175])
    d.addLineType("CENTERX2", "____ _ ____",[63.5, -12.7, 12.7, -12.7])
    d.addLineType("DASHED", "__  __",[5, -5])
    d.addLineType("DASHED2", "__  __",[6.35, -3.175])
    d.addLineType("DASHEDX2", "__  __",[25.4, -12.7])
    d.addLineType("PHANTOM", "____ _ _ ____",[31.75, -6.35, 6.35, -6.35, 6.35, -6.35])
    d.addLineType("PHANTOM2", "____ _ _ ____",[15.875, -3.175, 3.175, -3.175, 3.175, -3.175])
    d.addLineType("PHANTOMX2", "____ _ _ ____",[63.5, -12.7, 12.7, -12.7, 12.7, -12.7])
    d.addLineType("DASHDOT", "__ . __ . __",[12.7, -6.35, 0.1, -6.35])
    d.addLineType("DASHDOT2", "__ . __ . __",[6.35, -3.175, 0.1, -3.175])
    d.addLineType("DASHDOTX2", "__ . __ . __",[25.4, -12.7, 0.1, -12.7])
    d.addLineType("DOT", ".  . .",[0.1, -6.35])
    d.addLineType("DOT2", ".  . .",[0.1, -3.175])
    d.addLineType("DOTX2", ".  . .",[0.1, -12.7])
    d.addLineType("DIVIDE", "__ . . __",[12.7, -6.35, 0.1, -6.35, 0.1, -6.35])
    d.addLineType("DIVIDE2", "__ . . __",[6.35, -3.175, 0.1, -3.175, 0.1, -3.175])
    d.addLineType("DIVIDEX2", "__ . . __",[25.4, -12.7, 0.1, -12.7, 0.1, -12.7])

    const sheets = this.svg.sheets
    const screen = this.svg.screen
    const screenStroke = screen.attr("stroke")

    for(let [key, value] of sheets){
      if(sheetList && !sheetList.includes(key) ){
        continue
      }
      const figsInSheet = this.figsInSheet.getDataFromId(key)
      if(figsInSheet && figsInSheet.size){
        const sheetData = value.data("key")
        const sheetAttr = sheetData.attr
        const sheetStroke = sheetAttr.hasOwnProperty("stroke") ? sheetAttr.stroke : undefined
        const sheetLineType = sheetAttr.hasOwnProperty("stroke-dasharray") ? 
          sheetAttr["stroke-dasharray"] : undefined

        const stroke = sheetStroke || screenStroke 
        const color = autocadColorMap.get(stroke)
        const lineType = sheetLineType || "CONTINUOUS" 
        d.addLayer(key, color, lineType)
        d.setActiveLayer(key)
        for(let figId of figsInSheet){
          const fig = this.data.getDataFromId(figId) 
          const param = this.parameters.getDataFromId(figId)
          const type = param.type

          switch(type){
            case "line":{
              const points = [].concat(...param.parameters.points)
              d.drawLine(...points)
              break
            }
            case "polyline":
            case "lines":{
              const points = param.parameters.points
              points.forEach((v,i,arr)=>{
                if(i>0){
                  d.drawLine(arr[i-1][0], arr[i-1][1],v[0],v[1])
                }
              })
              break
            }
            case "circle":{
              const center = param.parameters.center
              const radius = param.parameters.radius
              d.drawCircle(center[0], center[1], radius)
              break
            }
            case "arc":{
              const center = param.parameters.center
              const radius = param.parameters.radius
              const start = param.parameters.start
              const end = param.parameters.end
              d.drawArc(center[0], center[1], radius, start, end)
              break
            }
          }
        }
      }
    }

    const string = d.toDxfString()
    return string
  } 
}
