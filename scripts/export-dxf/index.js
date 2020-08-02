
import {Drawing} from "../dxf-writer/Drawing.js"
import {autocadColorMap} from "./color.js"

const addHeader = (d) => {
  d.header("ACADVER", [[1, "AC1021"]])
  d.header("SPLINETYPE", [[70, 2]])
  d.header("SPLINESEGS", [[70, 8]])
}

const addLineTypeTemplate = (d) =>{
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
}


export const getDxf = (param) => {
  const d = new Drawing()
  //addHeader(d)
  addLineTypeTemplate(d)

  const screenStroke = "green"

  param.forEach(v=>{
    const sheetId = v[0]
    const sheetParams = v[1]

    const lineType = sheetParams.figsAttr?.lineType || "CONTINUOUS"
    const stroke = sheetParams.figsAttr?.stroke || screenStroke
    const colorId = autocadColorMap.get(stroke)
    d.addLayer(sheetId, colorId, lineType)
    d.setActiveLayer(sheetId)

    const figs = sheetParams.figs
    figs.forEach(v=>{
      const type = v.type
      const param = v.param
      const attr = v.attr
      switch(type){
        case "line":{
          const points = [].concat(...param.points)
          d.drawLine(...points)
          break
        }
        case "polyline":
        case "lines":{
          const points = param.points
          points.forEach((v,i,arr)=>{
            if(i>0){
              d.drawLine(arr[i-1][0], arr[i-1][1],v[0],v[1])
            }
          })
          break
        }
        case "circle":{
          const center = param.center
          const radius = param.radius
          d.drawCircle(center[0], center[1], radius)
          break
        }
        case "arc":{
          const center = param.center
          const radius = param.radius
          const start = param.start
          const end = param.end
          d.drawArc(center[0], center[1], radius, start, end)
          break
        }
        case "bspline":{
          const points  = param.points
          const knots = param.knots
          const degree = param.degree
          d.drawSpline(8, degree, points, knots, [] )
          break
        }
      }
    })
  })


  const string = d.toDxfString()
  return string
} 
