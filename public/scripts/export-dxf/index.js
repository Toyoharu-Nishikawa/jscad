import {DxfWriter,point3d} from "../@tarikjabiri/dxf/lib/index.esm.js"
import {autocadColorMap} from "./color.js"

const addHeader = (d) => {

  d.setVariable("$ACADVER"    , {1:"AC1021"})
  d.setVariable("$DWGCODEPAGE", {3:"ANSI_1252"})
  d.setVariable("$INSBASE"    , {10:0, 20:0, 30:0})
  d.setVariable("$EXTMIN"     , {10:-0.25,20:-0.5,30:0})
//  d.setVariable("$EXTMAX", [[10,300.75],[20,107.7194881156377],[30,0]])
//  d.setVariable("$LIMMIN", [[10,0],[20,0]])
//  d.setVariable("$LIMMAX", [[10,420],[20,297]])
//  d.setVariable("$ORTHOMODE", [[70,0]])
//  d.setVariable("$REGENMODE", [[70,1]])
//  d.setVariable("$FILLMODE", [[70,1]])
//  d.setVariable("$QTEXTMODE", [[70,0]])
//  d.setVariable("$MIRRTEXT", [[70,0]])
//  d.setVariable("$LTSCALE", [[40,1]])
//  d.setVariable("$ATTMODE", [[70,0]])
//  d.setVariable("$TEXTSIZE", [[40,2.5]])
//  d.setVariable("$TRACEWID", [[40,15.68]])
//  d.setVariable("$TEXTSTYLE", [[7,"STANDARD"]])
//  d.setVariable("$CLAYER", [[8,0]])
//  d.setVariable("$CELTYPE", [[6,"BYLAYER"]])
//  d.setVariable("$CECOLOR", [[62,256]])
//  d.setVariable("$CELTSCALE", [[40,1]])
//  d.setVariable("$DISPSILH", [[70,0]])
  d.setVariable("$DIMSCALE", {40:2.5})
//  d.setVariable("$DIMASZ", [[40,2.5]])
//  d.setVariable("$DIMEXO", [[40,0.625]])
//  d.setVariable("$DIMDLI", [[40,3.75]])
//  d.setVariable("$DIMRND", [[40,0]])
//  d.setVariable("$DIMDLE", [[40,0]])
//  d.setVariable("$DIMEXE", [[40,1.25]])
//  d.setVariable("$DIMTP", [[40,0]])
//  d.setVariable("$DIMTM", [[40,0]])
//  d.setVariable("$DIMTXT", [[40,2.5]])
//  d.setVariable("$DIMCEN", [[40,2.5]])
//  d.setVariable("$DIMTSZ", [[40,0]])
//  d.setVariable("$DIMTOL", [[70,0]])
//  d.setVariable("$DIMLIM", [[70,0]])
  d.setVariable("$DIMTIH",{70:0})
  d.setVariable("$DIMTOH",{70:0})
//  d.setVariable("$DIMSE1", [[70,0]])
//  d.setVariable("$DIMSE2", [[70,0]])
//  d.setVariable("$DIMTAD", [[70,1]])
//  d.setVariable("$DIMZIN", [[70,8]])
//  d.setVariable("$DIMBLK", [[1,""]])
//  d.setVariable("$DIMASO", [[70,1]])
//  d.setVariable("$DIMSHO", [[70,1]])
//  d.setVariable("$DIMPOST", [[1,""]])
//  d.setVariable("$DIMAPOST", [[1,""]])
//  d.setVariable("$DIMALT", [[70,0]])
//  d.setVariable("$DIMALTD", [[70,3]])
//  d.setVariable("$DIMALTF", [[40,0.03937]])
//  d.setVariable("$DIMLFAC", [[40,1]])
//  d.setVariable("$DIMTOFL", [[70,1]])
//  d.setVariable("$DIMTVP", [[40,0]])
//  d.setVariable("$DIMTIX", [[70,0]])
//  d.setVariable("$DIMSOXD", [[70,0]])
//  d.setVariable("$DIMSAH", [[70,0]])
//  d.setVariable("$DIMBLK1", [[1,""]])
//  d.setVariable("$DIMBLK2", [[1,""]])
//  d.setVariable("$DIMSTYLE", [[2,"STANDARD"]])
//  d.setVariable("$DIMCLRD", [[70,0]])
//  d.setVariable("$DIMCLRE", [[70,0]])
//  d.setVariable("$DIMCLRT", [[70,0]])
//  d.setVariable("$DIMTFAC", [[40,1]])
//  d.setVariable("$DIMGAP", [[40,0.625]])
//  d.setVariable("$DIMJUST", [[70,0]])
//  d.setVariable("$DIMSD1", [[70,0]])
//  d.setVariable("$DIMSD2", [[70,0]])
//  d.setVariable("$DIMTOLJ", [[70,0]])
//  d.setVariable("$DIMTZIN", [[70,8]])
//  d.setVariable("$DIMALTZ", [[70,0]])
//  d.setVariable("$DIMALTTZ", [[70,0]])
//  d.setVariable("$DIMUPT", [[70,0]])
//  d.setVariable("$DIMDEC", [[70,2]])
//  d.setVariable("$DIMTDEC", [[70,2]])
//  d.setVariable("$DIMALTU", [[70,2]])
//  d.setVariable("$DIMALTTD", [[70,3]])
//  d.setVariable("$DIMTXSTY", [[7,"STANDARD"]])
//  d.setVariable("$DIMAUNIT", [[70,0]])
//  d.setVariable("$DIMADEC", [[70,0]])
//  d.setVariable("$DIMALTRND", [[40,0]])
//  d.setVariable("$DIMAZIN", [[70,0]])
//  d.setVariable("$DIMDSEP", [[70,44]])
//  d.setVariable("$DIMATFIT", [[70,3]])
//  d.setVariable("$DIMFRAC", [[70,0]])
//  d.setVariable("$DIMLDRBLK", [[1,"STANDARD"]])
//  d.setVariable("$DIMLUNIT", [[70,2]])
//  d.setVariable("$DIMLWD", [[70,-2]])
//  d.setVariable("$DIMLWE", [[70,-2]])
//  d.setVariable("$DIMTMOVE", [[70,0]])
//  d.setVariable("$DIMFXL", [[40,1]])
//  d.setVariable("$DIMFXLON", [[70,0]])
//  d.setVariable("$DIMJOGANG", [[40,0.7854]])
//  d.setVariable("$DIMTFILL", [[70,0]])
//  d.setVariable("$DIMTFILLCLR", [[70,0]])
//  d.setVariable("$DIMARCSYM", [[70,0]])
//  d.setVariable("$DIMLTYPE", [[6,""]])
//  d.setVariable("$DIMLTEX1", [[6,""]])
//  d.setVariable("$DIMLTEX2", [[6,""]])
//  d.setVariable("$LUNITS", [[70,2]])
//  d.setVariable("$LUPREC", [[70,4]])
//  d.setVariable("$SKETCHINC", [[40,1]])
//  d.setVariable("$FILLETRAD", [[40,0]])
//  d.setVariable("$AUNITS", [[70,0]])
//  d.setVariable("$AUPREC", [[70,2]])
//  d.setVariable("$MENU", [[1,"."]])
//  d.setVariable("$ELEVATION", [[40,0]])
//  d.setVariable("$PELEVATION", [[40,0]])
//  d.setVariable("$THICKNESS", [[40,0]])
//  d.setVariable("$LIMCHECK", [[70,0]])
//  d.setVariable("$CHAMFERA", [[40,0]])
//  d.setVariable("$CHAMFERB", [[40,0]])
//  d.setVariable("$CHAMFERC", [[40,0]])
//  d.setVariable("$CHAMFERD", [[40,0]])
//  d.setVariable("$SKPOLY", [[70,0]])
//  d.setVariable("$USRTIMER", [[70,1]])
//  d.setVariable("$ANGBASE", [[50,0]])
//  d.setVariable("$ANGDIR", [[70,0]])
//  d.setVariable("$PDMODE", [[70,34]])
//  d.setVariable("$PDSIZE", [[40,0]])
//  d.setVariable("$PLINEWID", [[40,0]])
//  d.setVariable("$SPLFRAME", [[70,0]])
//  d.setVariable("$SPLINETYPE", [[70,2]])
//  d.setVariable("$SPLINESEGS", [[70,8]])
//  d.setVariable("$HANDSEED", [[5,20000]])
//  d.setVariable("$SURFTAB1", [[70,6]])
//  d.setVariable("$SURFTAB2", [[70,6]])
//  d.setVariable("$SURFTYPE", [[70,6]])
//  d.setVariable("$SURFU", [[70,6]])
//  d.setVariable("$SURFV", [[70,6]])
//  d.setVariable("$UCSBASE", [[2,""]])
//  d.setVariable("$UCSNAME", [[2,""]])
//  d.setVariable("$UCSORG", [[10,0],[20,0],[30,0]])
//  d.setVariable("$UCSXDIR", [[10,1],[20,0],[30,0]])
//  d.setVariable("$UCSYDIR", [[10,0],[20,1],[30,0]])
//  d.setVariable("$UCSORTHOREF", [[2,""]])
//  d.setVariable("$UCSORTHOVIEW", [[70,0]])
//  d.setVariable("$UCSORGTOP", [[10,0],[20,0],[30,0]])
//  d.setVariable("$UCSORGBOTTOM", [[10,0],[20,0],[30,0]])
//  d.setVariable("$UCSORGLEFT", [[10,0],[20,0],[30,0]])
//  d.setVariable("$UCSORGRIGHT", [[10,0],[20,0],[30,0]])
//  d.setVariable("$UCSORGFRONT", [[10,0],[20,0],[30,0]])
//  d.setVariable("$UCSORGBACK", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSBASE", [[2,""]])
//  d.setVariable("$PUCSNAME", [[2,""]])
//  d.setVariable("$PUCSORG", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSXDIR", [[10,1],[20,0],[30,0]])
//  d.setVariable("$PUCSYDIR", [[10,0],[20,1],[30,0]])
//  d.setVariable("$PUCSORTHOREF", [[2,""]])
//  d.setVariable("$PUCSORTHOVIEW", [[70,0]])
//  d.setVariable("$PUCSORGTOP", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSORGBOTTOM", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSORGLEFT", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSORGRIGHT", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSORGFRONT", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PUCSORGBACK", [[10,0],[20,0],[30,0]])
//  d.setVariable("$USERI1", [[70,0]])
//  d.setVariable("$USERI2", [[70,0]])
//  d.setVariable("$USERI3", [[70,0]])
//  d.setVariable("$USERI4", [[70,0]])
//  d.setVariable("$USERI5", [[70,0]])
//  d.setVariable("$USERR1", [[40,0]])
//  d.setVariable("$USERR2", [[40,0]])
//  d.setVariable("$USERR3", [[40,0]])
//  d.setVariable("$USERR4", [[40,0]])
//  d.setVariable("$USERR5", [[40,0]])
//  d.setVariable("$WORLDVIEW", [[70,1]])
//  d.setVariable("$SHADEDGE", [[70,3]])
//  d.setVariable("$SHADEDIF", [[70,70]])
//  d.setVariable("$TILEMODE", [[70,1]])
//  d.setVariable("$MAXACTVP", [[70,64]])
//  d.setVariable("$PINSBASE", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PLIMCHECK", [[70,0]])
//  d.setVariable("$PEXTMIN", [[10,0],[20,0],[30,0]])
//  d.setVariable("$PEXTMAX", [[10,0],[20,0],[30,0]])
//  d.setVariable("$SNAPSTYLE", [[70,0]])
//  d.setVariable("$PLIMMIN", [[10,0],[20,0]])
//  d.setVariable("$PLIMMAX", [[10,210],[20,297]])
//  d.setVariable("$UNITMODE", [[70,0]])
//  d.setVariable("$VISRETAIN", [[70,1]])
//  d.setVariable("$PLINEGEN", [[70,0]])
//  d.setVariable("$PSLTSCALE", [[70,1]])
//  d.setVariable("$TREEDEPTH", [[70,3020]])
//  d.setVariable("$CMLSTYLE", [[2,"Standard"]])
//  d.setVariable("$CMLJUST", [[70,0]])
//  d.setVariable("$CMLSCALE", [[40,20]])
//  d.setVariable("$PROXYGRAPHICS", [[70,1]])
//  d.setVariable("$MEASUREMENT", [[70,1]])
//  d.setVariable("$CELWEIGHT", [[370,-1]])
//  d.setVariable("$ENDCAPS", [[280,0]])
//  d.setVariable("$JOINSTYLE", [[280,0]])
//  d.setVariable("$LWDISPLAY", [[290,0]])
//  d.setVariable("$INSUNITS", [[70,4]])
//  d.setVariable("$HYPERLINKBASE", [[1,""]])
//  d.setVariable("$STYLESHEET", [[1,""]])
//  d.setVariable("$XEDIT", [[290,1]])
//  d.setVariable("$CEPSNTYPE", [[380,0]])
//  d.setVariable("$PSTYLEMODE", [[290,1]])
//  d.setVariable("$EXTNAMES", [[290,1]])
//  d.setVariable("$PSVPSCALE", [[40,1]])
//  d.setVariable("$OLESTARTUP", [[290,0]])
//  d.setVariable("$SORTENTS", [[280,127]])
//  d.setVariable("$INDEXCTL", [[280,0]])
//  d.setVariable("$HIDETEXT", [[280,1]])
//  d.setVariable("$XCLIPFRAME", [[290,0]])
//  d.setVariable("$HALOGAP", [[280,0]])
//  d.setVariable("$OBSCOLOR", [[70,257]])
//  d.setVariable("$OBSLTYPE", [[280,0]])
//  d.setVariable("$INTERSECTIONDISPLAY", [[280,0]])
//  d.setVariable("$INTERSECTIONCOLOR", [[70,257]])
//  d.setVariable("$DIMASSOC", [[280,1]])
//  d.setVariable("$PROJECTNAME", [[1,""]])
//  d.setVariable("$CAMERADISPLAY", [[290,0]])
//  d.setVariable("$LENSLENGTH", [[40,50]])
//  d.setVariable("$CAMERAHEIGHT", [[40,0]])
//  d.setVariable("$STEPSPERSEC", [[40,2]])
//  d.setVariable("$STEPSIZE", [[40,50]])
//  d.setVariable("$3DDWFPREC", [[40,2]])
//  d.setVariable("$PSOLWIDTH", [[40,5]])
//  d.setVariable("$PSOLHEIGHT", [[40,80]])
//  d.setVariable("$LOFTANG1", [[40,1.570796326794897]])
//  d.setVariable("$LOFTANG2", [[40,1.570796326794897]])
//  d.setVariable("$LOFTMAG1", [[40,0]])
//  d.setVariable("$LOFTMAG2", [[40,0]])
//  d.setVariable("$LOFTPARAM", [[70,7]])
//  d.setVariable("$LOFTNORMALS", [[280,1]])
//  d.setVariable("$LATITUDE", [[40,1]])
//  d.setVariable("$LONGITUDE", [[40,1]])
//  d.setVariable("$NORTHDIRECTION", [[40,0]])
//  d.setVariable("$TIMEZONE", [[70,-8000]])
//  d.setVariable("$LIGHTGLYPHDISPLAY", [[280,1]])
//  d.setVariable("$TILEMODELIGHTSYNCH", [[280,1]])
//  d.setVariable("$SOLIDHIST", [[280,1]])
//  d.setVariable("$SHOWHIST", [[280,1]])
//  d.setVariable("$DWFFRAME", [[280,2]])
//  d.setVariable("$DGNFRAME", [[280,0]])
//  d.setVariable("$REALWORLDSCALE", [[290,1]])
//  d.setVariable("$INTERFERECOLOR", [[62,1]])
//  d.setVariable("$CSHADOW", [[280,0]])
//  d.setVariable("$SHADOWPLANELOCATION", [[40,0]])

}

const addLineTypeTemplate = (d) =>{
  d.addLType("CENTER", "____ _ ____",[31.75, -6.35, 6.35, -6.35])
  d.addLType("CENTER2", "____ _ ____",[19.05, -3.175, 3.175, -3.175])
  d.addLType("CENTERX2", "____ _ ____",[63.5, -12.7, 12.7, -12.7])
  d.addLType("DASHED", "__  __",[5, -5])
  d.addLType("DASHED2", "__  __",[6.35, -3.175])
  d.addLType("DASHEDX2", "__  __",[25.4, -12.7])
  d.addLType("PHANTOM", "____ _ _ ____",[31.75, -6.35, 6.35, -6.35, 6.35, -6.35])
  d.addLType("PHANTOM2", "____ _ _ ____",[15.875, -3.175, 3.175, -3.175, 3.175, -3.175])
  d.addLType("PHANTOMX2", "____ _ _ ____",[63.5, -12.7, 12.7, -12.7, 12.7, -12.7])
  d.addLType("DASHDOT", "__ . __ . __",[12.7, -6.35, 0.1, -6.35])
  d.addLType("DASHDOT2", "__ . __ . __",[6.35, -3.175, 0.1, -3.175])
  d.addLType("DASHDOTX2", "__ . __ . __",[25.4, -12.7, 0.1, -12.7])
  d.addLType("DOT", ".  . .",[0.1, -6.35])
  d.addLType("DOT2", ".  . .",[0.1, -3.175])
  d.addLType("DOTX2", ".  . .",[0.1, -12.7])
  d.addLType("DIVIDE", "__ . . __",[12.7, -6.35, 0.1, -6.35, 0.1, -6.35])
  d.addLType("DIVIDE2", "__ . . __",[6.35, -3.175, 0.1, -3.175, 0.1, -3.175])
  d.addLType("DIVIDEX2", "__ . . __",[25.4, -12.7, 0.1, -12.7, 0.1, -12.7])
}


export const getDxf = (param) => {
  const d = new DxfWriter()
  console.log({d})
  addHeader(d)
  addLineTypeTemplate(d)

  const screenStroke = "black"

  param.forEach(v=>{
    const sheetId = v[0]
    const sheetParams = v[1]

    const lineType = sheetParams.figsAttr?.lineType || "CONTINUOUS"
    const stroke = sheetParams.figsAttr?.stroke || screenStroke
    const colorId = autocadColorMap.get(stroke)
    d.addLayer(sheetId, colorId, lineType)

    const figs = sheetParams.figs
    figs.forEach(v=>{
      const type = v.type
      const param = v.param
      const attr = v.attr
      const lineTypeName = attr?.lineTypeName
      const lineColor = attr?.stroke 
      const colorIndex =autocadColorMap.get(lineColor)
      const option = {
        lineType: lineTypeName, 
        colorNumber:colorIndex,
        layerName: sheetId,
      }

      switch(type){
        case "line":{
          const points = param.points.map(v=>point3d(...v))
          d.addLine(...points,option )
          break
        }
        case "lines":{
          const points = param.points.map(v=>point3d(...v))
          points.forEach((v,i,arr)=>{
            if(i>0){
              d.addLine(arr[i-1], v, option)
            }
          })
          break
        }
        case "polyline": {
          const vertices = param.points.map(v=>Object({point:point3d(...v)}))
          d.addLWPolyline(vertices, option);
          break
        }
        case "circle":{
          const center = point3d(...param.center)
          const radius = param.radius
          d.addCircle(center, radius, option)
          break
        }
        case "ellipse":{
          const center = point3d(...param.center)
          const [rx,ry] = param.radius
          const rotation = param.rotation || 0
          const endPointX = rx*Math.cos(rotation/180*Math.PI)
          const endPointY = rx*Math.sin(rotation/180*Math.PI)
          const endPoint = point3d(endPointX,endPointY,0)
          const ellipticity = ry/rx
          d.addEllipse(center, endPoint, ellipticity,0, 2*Math.PI, option)
          break
        }
        case "arc":{
          const center = point3d(...param.center)
          const radius = param.radius
          const start = param.start
          const end = param.end
          d.addArc(center, radius, start, end, option)
          break
        }
        case "ellipticalArc":{
          const center = point3d(...param.center)
          const [rx,ry] = param.radius
          const rotation = param.rotation || 0
          const endPointX = rx*Math.cos(rotation/180*Math.PI)
          const endPointY = rx*Math.sin(rotation/180*Math.PI)
          const endPoint = point3d(endPointX,endPointY,0)
          const ellipticity = ry/rx

          const start = param.start/180*Math.PI
          const end = param.end/180*Math.PI
          d.addEllipse(center, endPoint, ellipticity,start, end, option)
          break
        }

        case "bspline":{
          const controlPoints = param.points.map(v=>point3d(v))
          const knots = param.knots
          const degreeCurve = param.degree
          const weights= []
          const parameters = {
            controlPoints ,
            knots,
            degreeCurve,
            weights,
          }
          d.addSpline(parameters, option)
          break
        }
      }
    })

    const dimensions = sheetParams.dimensions
    dimensions.forEach((v,i)=>{
      const type = v.type
      const param = v.param
      const dimStyle = v.dimStyle
      const attr = v.attr
      const lineTypeName = attr?.lineTypeName
      const lineColor = attr?.stroke 
      const colorIndex =autocadColorMap.get(lineColor)
      const prefix = dimStyle?.prefix
      const surffix = dimStyle?.surffix


      const options = {
        lineType: lineTypeName, 
        colorNumber:colorIndex,
        layerName: sheetId,
      }

      switch(type){
        case "aligned" :{
          const [x1, y1] = param.points[0]
          const [x2, y2] = param.points[1]
          const distance = param.distance
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20

          const length = Math.sqrt((x2-x1)**2+(y2-y1)**2)
          const dx = distance/length*(y2-y1)
          const dy =  -distance/length*(x2-x1)
          const Dx1 = x1+dx
          const Dy1 = y1+dy
          const Dx2 = x2+dx
          const Dy2 = y2+dy
          const tx = (Dx1 + Dx2)/2
          const ty = (Dy1 + Dy2)/2

          const x3 = Dx2
          const y3 = Dy2
          const x4 = tx
          const y4 = ty

          const first  = {x:x1,y:y1,z:0}
          const second = {x:x2,y:y2,z:0}
          const definitionPoint= {x:x3,y:y3,z:0}
          const middlePoint= {x:x4,y:y4,z:0}

          const dimStyleName = "dim"+i
          const r = d.addDimStyle(dimStyleName)
          r.DIMSCALE =size 
//          r.DIMTXT =size 
//          r.DIMTIH = 1
          //r.options={obliqueAngle:40}

          options.definitionPoint = definitionPoint
          options.middlePoint = middlePoint
          options.styleName = dimStyleName
          //options.textRotation = 45
          d.addAlignedDim(first, second, options)
          break
        }
        case "horizontal" :{
          const [x1, y1] = param.points[0]
          const [x2, y2] = param.points[1]
          const distance = param.distance
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20



          const yMin = Math.min(y1,y2) 
          const Dx1 = x1
          const Dy1 = yMin - distance
          const Dx2 = x2 
          const Dy2 = yMin - distance

          const tx = (Dx1 + Dx2)/2
          const ty = (Dy1 + Dy2)/2

          const x3 = Dx2
          const y3 = Dy2
          const x4 = tx
          const y4 = ty

          const first  = {x:x1,y:y1,z:0}
          const second = {x:x2,y:y2,z:0}
          const definitionPoint= {x:x3,y:y3,z:0}
          const middlePoint= {x:x4,y:y4,z:0}

          const dimStyleName = "dim"+i
          const r = d.addDimStyle(dimStyleName)
          r.DIMSCALE =size 
          //r.DIMTXT =size 

          options.definitionPoint = definitionPoint
          options.middlePoint = middlePoint
          options.angle = 0
          options.styleName = dimStyleName

          //options.textRotation = 45
          d.addLinearDim(first, second, options)
          break
        }
        case "vertical" :{
          const [x1, y1] = param.points[0]
          const [x2, y2] = param.points[1]
          const distance = param.distance
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20


          const xMax = (x1+x2)/2
          const Dx1 = xMax + distance
          const Dy1 = y1
          const Dx2 = xMax + distance
          const Dy2 = y2

          const tx = (Dx1 + Dx2)/2
          const ty = (Dy1 + Dy2)/2

          const x3 = Dx2
          const y3 = Dy2
          const x4 = tx
          const y4 = ty

          const first  = {x:x1,y:y1,z:0}
          const second = {x:x2,y:y2,z:0}
          const definitionPoint= {x:x3,y:y3,z:0}
          const middlePoint= {x:x4,y:y4,z:0}

          const dimStyleName = "dim"+i
          const r = d.addDimStyle(dimStyleName)
          r.DIMSCALE =size 
          //r.DIMTXT =size 


          options.definitionPoint = definitionPoint
          options.middlePoint = middlePoint

          options.angle = 90
          options.styleName = dimStyleName

          d.addLinearDim(first, second, options)

          break
        }
        case "diameter" :{
          break
        }
        case "radius" :{
          break
        }
        case "angle" :{
          break
        }

      }
    })
    const texts = sheetParams.texts
    texts.forEach(v=>{

      const param = v.param
      const attr = v.attr

      const lineTypeName = attr?.lineTypeName
      const lineColor = attr?.stroke 
      const colorIndex =autocadColorMap.get(lineColor)

      const position = param.position
      const font = param.font
      const text = param.text
      const theta = param?.theta || 0
      const size = font?.size || 24
      const height = size /1.6
      const point = {x:position[0],y:position[1],z:0}
      const option = {
        rotation: theta,
        horizontalAlignment: 0,//TextHorizontalAlignment.Center,
        verticalAlignment: 0,//TextVerticalAlignment.Middle,
        //secondAlignmentPoint: point3d(20, 20),
      }
      
      d.addText(point, height, text,option)
    })
  })
 

  const string = d.stringify()
  return string
} 
