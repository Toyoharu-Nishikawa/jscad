"use strict";

import {bspline} from "./bspline.js"
import {data as colorCode} from './colorCode.js'
import {dataMap as lineTypeMap} from './dash.js'
export {version} from "./version.js"


const groupCodes = new Map([
  [0,  'entityType'],
  [2,  'blockName'],
  [6,  'lineTypeName'],
  [10, 'x'],
  [11, 'x1'],
  [20, 'y'],
  [21, 'y1'],
  [40, 'r'],
  [41, 's1'],
  [42, 's2'],
  [50, 'a0'],
  [51, 'a1'],
  [62, 'color'],
  [71, 'degree'],
  [72, 'numOfKnots'],
  [73, 'numOfControlPoints'],
  [74, 'numOfFitPoints'],
])

const supportedEntities = new Set([
  'LINE',
  'CIRCLE',
  'ARC',
  'ELLIPSE',
  'LWPOLYLINE',
  'SPLINE',
])


const getColorAndLineType = (color, lineTypeName) => {
  const rgbCode = color !==undefined ? colorCode[color]: undefined
  const dashCode = lineTypeName !== undefined ? lineTypeMap.get(lineTypeName): undefined

  const obj = {
    rgbCode: rgbCode, 
    dashCode: dashCode, 
  } 

  return obj
}

const getColorLineTypeSvg = (rgbCode, dashCode) => {
  const tmpRGB = rgbCode ? `stroke="${rgbCode}" ` : ""
  const tmpDash = dashCode ? `stroke-dasharray="${dashCode}" ` : ""

  const join = tmpRGB + tmpDash
  return join
}

const getLineSvg = (x1, y1, x2, y2, color, lineTypeName) => {
  const tmpMain = `<line x1=${x1} y1=${y1} x2=${x2} y2=${y2} `
  const tmpColorLineType  =getColorLineTypeSvg(color, lineTypeName)
  const tmpEnd = "/>\n"
            
  const join = tmpMain + tmpColorLineType + tmpEnd

  return join 
}

const deg2rad = deg => {
  return deg * (Math.PI/180);
}


const getSvgSnippet = (type, param, attr) => {
  switch (type) {
    case 'line': {
      const points = param.points
      const color = attr.stroke
      const lineTypeName = attr.lineTypeName
      const svg = getLineSvg(points[0][0], points[0][1], points[1][0], points[1][1], color, lineTypeName)
      return svg 
    }
    case 'circle': {
      const cx = param.center[0]
      const cy = param.center[1]
      const radius = param.radius
      const color = attr.stroke
      const lineTypeName = attr.lineTypeName
      const tmpMain = `<circle cx=${cx} cy=${cy} r=${radius} `
      const tmpColorLineType  = getColorLineTypeSvg(color, lineTypeName)
      const tmpEnd = "/>\n"

      const join = tmpMain + tmpColorLineType + tmpEnd

      return join
    }
    case 'arc': {
      const center = param.center
      const radius = param.radius
      const start = param.start
      const end = param.end
      const color = attr.stroke
      const lineTypeName = attr.lineTypeName

      const x1 = center[0] + radius * Math.cos(deg2rad(start))
      const y1 = center[1] + radius * Math.sin(deg2rad(start))
      const x2 = center[0] + radius * Math.cos(deg2rad(end))
      const y2 = center[1] + radius * Math.sin(deg2rad(end))


      const correctedEnd = end < start ? end + 360 : end
      const largeArcFlag = correctedEnd - start > 180 ? 1 : 0

      const tmpMain = `<path d="M${x1},${y1} A${radius}, ${radius} 0 ${largeArcFlag},1 ${x2},${y2}" `
      const tmpColorLineType  =getColorLineTypeSvg(color, lineTypeName)
      const tmpEnd = "/>\n"

      const join = tmpMain + tmpColorLineType + tmpEnd
      return join

    }
    case 'polyline': {
      let svgSnippet = '';
      const vertices = param.points
      const color = attr.stroke
      const lineTypeName = attr.lineTypeName
      for (let i=0; i<vertices.length-1; i++) {
        const vertice1 = vertices[i]
        const vertice2 = vertices[i+1]
        svgSnippet += getLineSvg(vertice1[0], vertice1[1], vertice2[0], vertice2[1], color, lineTypeName)
      }
      return svgSnippet
    }
    case 'bspline': {
      let svgSnippet = '';
      const controlPoints = param.points
      const numOfKnots = param.numOfKnots
      const knots = param.knots
      const degree = param.degree
      const color = attr.stroke
      const lineTypeName = attr.lineTypeName
      const vertices = []
      const func = bspline(controlPoints, degree, knots)

      for(let t=0;t<=100;t++){
        const p = func(t/100)
        vertices.push(p)
      }
      for (let i=0; i<vertices.length-1; i++) {
        const vertice1 = vertices[i]
        const vertice2 = vertices[i+1]
        svgSnippet += getLineSvg(vertice1[0], vertice1[1], vertice2[0], vertice2[1], color, lineTypeName)
      }
      return svgSnippet
    }
  }
}

const dxfToObj = dxfObject => {
  const color = dxfObject.color
  const lineTypeName = dxfObject.lineTypeName
  const {rgbCode, dashCode} = getColorAndLineType(color, lineTypeName) 
  const attr = {stroke: rgbCode, lineTypeName: dashCode}

  switch (dxfObject.type) {
    case 'LINE': {
      const param ={  points: [ [dxfObject.x, dxfObject.y], [dxfObject.x1, dxfObject.y1] ] } 
      const obj  = {type: "line", param: param , attr: attr }

      return obj 
    }
    case 'CIRCLE': {
      const param = {center: [dxfObject.x, dxfObject.y], radius: dxfObject.r}
      const obj = {type: "circle",  param: param, attr: attr }
      return obj 
    }
    case 'ARC': {
      const param = {center: [dxfObject.x, dxfObject.y], radius: dxfObject.r, start:dxfObject.a0, end: dxfObject.a1}
      const obj = {type: "arc",  param: param, attr: attr }
      return obj 
    }
    case 'ELLIPSE': {
      const center = [dxfObject.x, dxfObject.y]
      const endP = [dxfObject.x1, dxfObject.y1]
      const ratio = dxfObject.r
      const vec = [endP[0] - center[0],endP[1] - center[1]]
      const rx = Math.sqrt(vec[0]**2 + vec[1]**2)
      const ry = rx * ratio
      const radius = [rx,ry]

      const startRad = dxfObject.s1
      const endRad = dxfObject.s2
      const start = startRad/Math.PI*180
      const end = endRad/Math.PI*180
      const rotationRad = Math.atan2(vec[1],vec[0])
      const rotation = rotationRad/Math.PI*180

      if(start===0 && end===360){
        const param = {center, radius,rotation}
        const obj = {type: "ellipse",  param: param, attr: attr }
        return obj
      }
      else{
        const param = {center, radius,rotation, start, end}
        const obj = {type: "ellipticalArc",  param: param, attr: attr }
        return obj
      }
    }
    case 'LWPOLYLINE': {
      const vertices = dxfObject.vertices;
      const points = []
      const N = vertices.length
      for (let i=0; i<N; i++) {
        const x = vertices[i].x
        const y = vertices[i].y
        const point = [x, y]
        points.push(point)
      }
      const param = {points: points}
      const obj = {type: "polyline",   param: param, attr: attr  }
      return obj 
    }
    case 'SPLINE': {
      const vertices = dxfObject.vertices;
      const points = []
      const N = vertices.length
      for (let i=0; i<N; i++) {
        const x = vertices[i].x
        const y = vertices[i].y
        const point = [x, y]
        points.push(point)
      }

      const knots = dxfObject.knots;
      const degree = dxfObject.degree;
      const segments = 100
      const param = {points: points, knots: knots, degree: degree, segments:segments}
      const obj = {type: "bspline",  param: param, attr: attr }

      return obj 
    }
  }
}

export const parseDxf = dxfString => {

  let code = null
  let isEntitiesSectionActive = false
  let object = {}
  const objList = []

  // Normalize platform-specific newlines.

  const lines = dxfString.split(/\r?\n/)
  const N = lines.length

  
  for(let i=0; i<N; i++){
    const value = lines[i].trim()
    if(i%2===0){
      code = parseInt(value)
      continue
    }
    const groupCode = groupCodes.get(code)

    if(groupCode === 'blockName' && value === 'ENTITIES') {
      isEntitiesSectionActive = true
      continue
    }

    if(isEntitiesSectionActive) {
      if(groupCode === 'entityType') {  // New entity starts or ends. code = 0
        if (object.type) {
          objList.push(object)
        }
        object = supportedEntities.has(value) ? {type: value} : {}
        if (value === 'ENDSEC') {
          isEntitiesSectionActive = false
        }
      }
      else if (object.type && typeof groupCode !== 'undefined') {  // Known entity property recognized.
        object[groupCode] = isNaN(value) ? value : parseFloat(value)
        if ( object.type == 'SPLINE'  && groupCode === 'r') {
          if(!object.knots){
            object.knots =[]
          }
          object.knots.push(object.r)
        }
        if ( (object.type == 'LWPOLYLINE' || object.type == 'SPLINE')  && groupCode === 'y') {
          if (!object.vertices) {
            object.vertices = []
          }
          object.vertices.push({x:object.x, y:object.y})
        }
      }
    }
  } 

  return objList 
}



export const getParamFromDxf = dxfString => {
  const objList = parseDxf(dxfString )
  const N = objList.length
  const objects = []
  for(let i=0; i<N; i++){
    const obj = dxfToObj(objList[i])
    objects.push(obj) 
  }
  return objects 
}

export const getSvgFromParam = objList => {
  let svg = ""
  const N = objList.length
  for(let i=0; i<N;i++){
    svg += getSvgSnippet(objList[i].type, objList[i].param, objList[i].attr)
  }
  return svg
}

export const dxftosvg = dxfString => {
  const objList = getParamFromDxf(dxfString )
  const svg = getSvgFromParam(objList)
  return svg 
}

