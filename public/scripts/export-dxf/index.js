import {DxfWriter,point3d} from "../@tarikjabiri/dxf/lib/esm/index.js"
import {autocadColorMap} from "./color.js"

const addHeader = (d) => {

  d.header("ACADVER", [[1,"AC1021"]])
  d.header("DWGCODEPAGE", [[3,"ANSI_1252"]])
  d.header("INSBASE", [[10,0],[20,0],[30,0]])
  d.header("EXTMIN", [[10,-0.25],[20,-0.5],[30,0]])
  d.header("EXTMAX", [[10,300.75],[20,107.7194881156377],[30,0]])
  d.header("LIMMIN", [[10,0],[20,0]])
  d.header("LIMMAX", [[10,420],[20,297]])
  d.header("ORTHOMODE", [[70,0]])
  d.header("REGENMODE", [[70,1]])
  d.header("FILLMODE", [[70,1]])
  d.header("QTEXTMODE", [[70,0]])
  d.header("MIRRTEXT", [[70,0]])
  d.header("LTSCALE", [[40,1]])
  d.header("ATTMODE", [[70,0]])
  d.header("TEXTSIZE", [[40,2.5]])
  d.header("TRACEWID", [[40,15.68]])
  d.header("TEXTSTYLE", [[7,"STANDARD"]])
  d.header("CLAYER", [[8,0]])
  d.header("CELTYPE", [[6,"BYLAYER"]])
  d.header("CECOLOR", [[62,256]])
  d.header("CELTSCALE", [[40,1]])
  d.header("DISPSILH", [[70,0]])
  d.header("DIMSCALE", [[40,2.5]])
  d.header("DIMASZ", [[40,2.5]])
  d.header("DIMEXO", [[40,0.625]])
  d.header("DIMDLI", [[40,3.75]])
  d.header("DIMRND", [[40,0]])
  d.header("DIMDLE", [[40,0]])
  d.header("DIMEXE", [[40,1.25]])
  d.header("DIMTP", [[40,0]])
  d.header("DIMTM", [[40,0]])
  d.header("DIMTXT", [[40,2.5]])
  d.header("DIMCEN", [[40,2.5]])
  d.header("DIMTSZ", [[40,0]])
  d.header("DIMTOL", [[70,0]])
  d.header("DIMLIM", [[70,0]])
  d.header("DIMTIH", [[70,0]])
  d.header("DIMTOH", [[70,0]])
  d.header("DIMSE1", [[70,0]])
  d.header("DIMSE2", [[70,0]])
  d.header("DIMTAD", [[70,1]])
  d.header("DIMZIN", [[70,8]])
  d.header("DIMBLK", [[1,""]])
  d.header("DIMASO", [[70,1]])
  d.header("DIMSHO", [[70,1]])
  d.header("DIMPOST", [[1,""]])
  d.header("DIMAPOST", [[1,""]])
  d.header("DIMALT", [[70,0]])
  d.header("DIMALTD", [[70,3]])
  d.header("DIMALTF", [[40,0.03937]])
  d.header("DIMLFAC", [[40,1]])
  d.header("DIMTOFL", [[70,1]])
  d.header("DIMTVP", [[40,0]])
  d.header("DIMTIX", [[70,0]])
  d.header("DIMSOXD", [[70,0]])
  d.header("DIMSAH", [[70,0]])
  d.header("DIMBLK1", [[1,""]])
  d.header("DIMBLK2", [[1,""]])
  d.header("DIMSTYLE", [[2,"STANDARD"]])
  d.header("DIMCLRD", [[70,0]])
  d.header("DIMCLRE", [[70,0]])
  d.header("DIMCLRT", [[70,0]])
  d.header("DIMTFAC", [[40,1]])
  d.header("DIMGAP", [[40,0.625]])
  d.header("DIMJUST", [[70,0]])
  d.header("DIMSD1", [[70,0]])
  d.header("DIMSD2", [[70,0]])
  d.header("DIMTOLJ", [[70,0]])
  d.header("DIMTZIN", [[70,8]])
  d.header("DIMALTZ", [[70,0]])
  d.header("DIMALTTZ", [[70,0]])
  d.header("DIMUPT", [[70,0]])
  d.header("DIMDEC", [[70,2]])
  d.header("DIMTDEC", [[70,2]])
  d.header("DIMALTU", [[70,2]])
  d.header("DIMALTTD", [[70,3]])
  d.header("DIMTXSTY", [[7,"STANDARD"]])
  d.header("DIMAUNIT", [[70,0]])
  d.header("DIMADEC", [[70,0]])
  d.header("DIMALTRND", [[40,0]])
  d.header("DIMAZIN", [[70,0]])
  d.header("DIMDSEP", [[70,44]])
  d.header("DIMATFIT", [[70,3]])
  d.header("DIMFRAC", [[70,0]])
  d.header("DIMLDRBLK", [[1,"STANDARD"]])
  d.header("DIMLUNIT", [[70,2]])
  d.header("DIMLWD", [[70,-2]])
  d.header("DIMLWE", [[70,-2]])
  d.header("DIMTMOVE", [[70,0]])
  d.header("DIMFXL", [[40,1]])
  d.header("DIMFXLON", [[70,0]])
  d.header("DIMJOGANG", [[40,0.7854]])
  d.header("DIMTFILL", [[70,0]])
  d.header("DIMTFILLCLR", [[70,0]])
  d.header("DIMARCSYM", [[70,0]])
  d.header("DIMLTYPE", [[6,""]])
  d.header("DIMLTEX1", [[6,""]])
  d.header("DIMLTEX2", [[6,""]])
  d.header("LUNITS", [[70,2]])
  d.header("LUPREC", [[70,4]])
  d.header("SKETCHINC", [[40,1]])
  d.header("FILLETRAD", [[40,0]])
  d.header("AUNITS", [[70,0]])
  d.header("AUPREC", [[70,2]])
  d.header("MENU", [[1,"."]])
  d.header("ELEVATION", [[40,0]])
  d.header("PELEVATION", [[40,0]])
  d.header("THICKNESS", [[40,0]])
  d.header("LIMCHECK", [[70,0]])
  d.header("CHAMFERA", [[40,0]])
  d.header("CHAMFERB", [[40,0]])
  d.header("CHAMFERC", [[40,0]])
  d.header("CHAMFERD", [[40,0]])
  d.header("SKPOLY", [[70,0]])
  d.header("USRTIMER", [[70,1]])
  d.header("ANGBASE", [[50,0]])
  d.header("ANGDIR", [[70,0]])
  d.header("PDMODE", [[70,34]])
  d.header("PDSIZE", [[40,0]])
  d.header("PLINEWID", [[40,0]])
  d.header("SPLFRAME", [[70,0]])
  d.header("SPLINETYPE", [[70,2]])
  d.header("SPLINESEGS", [[70,8]])
  d.header("HANDSEED", [[5,20000]])
  d.header("SURFTAB1", [[70,6]])
  d.header("SURFTAB2", [[70,6]])
  d.header("SURFTYPE", [[70,6]])
  d.header("SURFU", [[70,6]])
  d.header("SURFV", [[70,6]])
  d.header("UCSBASE", [[2,""]])
  d.header("UCSNAME", [[2,""]])
  d.header("UCSORG", [[10,0],[20,0],[30,0]])
  d.header("UCSXDIR", [[10,1],[20,0],[30,0]])
  d.header("UCSYDIR", [[10,0],[20,1],[30,0]])
  d.header("UCSORTHOREF", [[2,""]])
  d.header("UCSORTHOVIEW", [[70,0]])
  d.header("UCSORGTOP", [[10,0],[20,0],[30,0]])
  d.header("UCSORGBOTTOM", [[10,0],[20,0],[30,0]])
  d.header("UCSORGLEFT", [[10,0],[20,0],[30,0]])
  d.header("UCSORGRIGHT", [[10,0],[20,0],[30,0]])
  d.header("UCSORGFRONT", [[10,0],[20,0],[30,0]])
  d.header("UCSORGBACK", [[10,0],[20,0],[30,0]])
  d.header("PUCSBASE", [[2,""]])
  d.header("PUCSNAME", [[2,""]])
  d.header("PUCSORG", [[10,0],[20,0],[30,0]])
  d.header("PUCSXDIR", [[10,1],[20,0],[30,0]])
  d.header("PUCSYDIR", [[10,0],[20,1],[30,0]])
  d.header("PUCSORTHOREF", [[2,""]])
  d.header("PUCSORTHOVIEW", [[70,0]])
  d.header("PUCSORGTOP", [[10,0],[20,0],[30,0]])
  d.header("PUCSORGBOTTOM", [[10,0],[20,0],[30,0]])
  d.header("PUCSORGLEFT", [[10,0],[20,0],[30,0]])
  d.header("PUCSORGRIGHT", [[10,0],[20,0],[30,0]])
  d.header("PUCSORGFRONT", [[10,0],[20,0],[30,0]])
  d.header("PUCSORGBACK", [[10,0],[20,0],[30,0]])
  d.header("USERI1", [[70,0]])
  d.header("USERI2", [[70,0]])
  d.header("USERI3", [[70,0]])
  d.header("USERI4", [[70,0]])
  d.header("USERI5", [[70,0]])
  d.header("USERR1", [[40,0]])
  d.header("USERR2", [[40,0]])
  d.header("USERR3", [[40,0]])
  d.header("USERR4", [[40,0]])
  d.header("USERR5", [[40,0]])
  d.header("WORLDVIEW", [[70,1]])
  d.header("SHADEDGE", [[70,3]])
  d.header("SHADEDIF", [[70,70]])
  d.header("TILEMODE", [[70,1]])
  d.header("MAXACTVP", [[70,64]])
  d.header("PINSBASE", [[10,0],[20,0],[30,0]])
  d.header("PLIMCHECK", [[70,0]])
  d.header("PEXTMIN", [[10,0],[20,0],[30,0]])
  d.header("PEXTMAX", [[10,0],[20,0],[30,0]])
  d.header("SNAPSTYLE", [[70,0]])
  d.header("PLIMMIN", [[10,0],[20,0]])
  d.header("PLIMMAX", [[10,210],[20,297]])
  d.header("UNITMODE", [[70,0]])
  d.header("VISRETAIN", [[70,1]])
  d.header("PLINEGEN", [[70,0]])
  d.header("PSLTSCALE", [[70,1]])
  d.header("TREEDEPTH", [[70,3020]])
  d.header("CMLSTYLE", [[2,"Standard"]])
  d.header("CMLJUST", [[70,0]])
  d.header("CMLSCALE", [[40,20]])
  d.header("PROXYGRAPHICS", [[70,1]])
  d.header("MEASUREMENT", [[70,1]])
  d.header("CELWEIGHT", [[370,-1]])
  d.header("ENDCAPS", [[280,0]])
  d.header("JOINSTYLE", [[280,0]])
  d.header("LWDISPLAY", [[290,0]])
  d.header("INSUNITS", [[70,4]])
  d.header("HYPERLINKBASE", [[1,""]])
  d.header("STYLESHEET", [[1,""]])
  d.header("XEDIT", [[290,1]])
  d.header("CEPSNTYPE", [[380,0]])
  d.header("PSTYLEMODE", [[290,1]])
  d.header("EXTNAMES", [[290,1]])
  d.header("PSVPSCALE", [[40,1]])
  d.header("OLESTARTUP", [[290,0]])
  d.header("SORTENTS", [[280,127]])
  d.header("INDEXCTL", [[280,0]])
  d.header("HIDETEXT", [[280,1]])
  d.header("XCLIPFRAME", [[290,0]])
  d.header("HALOGAP", [[280,0]])
  d.header("OBSCOLOR", [[70,257]])
  d.header("OBSLTYPE", [[280,0]])
  d.header("INTERSECTIONDISPLAY", [[280,0]])
  d.header("INTERSECTIONCOLOR", [[70,257]])
  d.header("DIMASSOC", [[280,1]])
  d.header("PROJECTNAME", [[1,""]])
  d.header("CAMERADISPLAY", [[290,0]])
  d.header("LENSLENGTH", [[40,50]])
  d.header("CAMERAHEIGHT", [[40,0]])
  d.header("STEPSPERSEC", [[40,2]])
  d.header("STEPSIZE", [[40,50]])
  d.header("3DDWFPREC", [[40,2]])
  d.header("PSOLWIDTH", [[40,5]])
  d.header("PSOLHEIGHT", [[40,80]])
  d.header("LOFTANG1", [[40,1.570796326794897]])
  d.header("LOFTANG2", [[40,1.570796326794897]])
  d.header("LOFTMAG1", [[40,0]])
  d.header("LOFTMAG2", [[40,0]])
  d.header("LOFTPARAM", [[70,7]])
  d.header("LOFTNORMALS", [[280,1]])
  d.header("LATITUDE", [[40,1]])
  d.header("LONGITUDE", [[40,1]])
  d.header("NORTHDIRECTION", [[40,0]])
  d.header("TIMEZONE", [[70,-8000]])
  d.header("LIGHTGLYPHDISPLAY", [[280,1]])
  d.header("TILEMODELIGHTSYNCH", [[280,1]])
  d.header("SOLIDHIST", [[280,1]])
  d.header("SHOWHIST", [[280,1]])
  d.header("DWFFRAME", [[280,2]])
  d.header("DGNFRAME", [[280,0]])
  d.header("REALWORLDSCALE", [[290,1]])
  d.header("INTERFERECOLOR", [[62,1]])
  d.header("CSHADOW", [[280,0]])
  d.header("SHADOWPLANELOCATION", [[40,0]])

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
  //addHeader(d)
  addLineTypeTemplate(d)

  const screenStroke = "black"

  param.forEach(v=>{
    const sheetId = v[0]
    const sheetParams = v[1]

    if(sheetParams.figs.length>0){
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
            r.DIMTXT =size 

            options.definitionPoint = definitionPoint
            options.middlePoint = middlePoint
            options.styleName = dimStyleName
            d.addAlignedDim(first, second, options)
            break
          }
          case "horizontal" :{
            const [x1, y1] = param.points[0]
            const [x2, y2] = param.points[1]
            const distance = param.distance


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
            options.definitionPoint = definitionPoint
            options.middlePoint = middlePoint
            options.angle = 0
            d.addLinearDim(first, second, options)
            break
          }
          case "vertical" :{
            const [x1, y1] = param.points[0]
            const [x2, y2] = param.points[1]
            const distance = param.distance

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
            options.definitionPoint = definitionPoint
            options.middlePoint = middlePoint

            options.angle = 90
            d.addLinearDim(first, second, options)
 
            break
          }
        }
      })
    }
//    if(sheetParams.texts.length>0){
//
//      const textStroke = sheetParams.textsAttr?.stroke || screenStroke
//      const textColorId = autocadColorMap.get(textStroke)
//      const textSheetId = sheetId + "_text"
//      d.addLayer(textSheetId, textColorId, "CONTINUOUS")
//      d.setActiveLayer(textSheetId)
//
//      const texts = sheetParams.texts
//      texts.forEach(v=>{
//
//        const param = v.param
//        const attr = v.attr
//
//        const lineTypeName = attr?.lineTypeName
//        const lineColor = attr?.stroke 
//        const colorIndex =autocadColorMap.get(lineColor)
//
//        const position = param.position
//        const font = param.font
//        const text = param.text
//        const theta = param?.theta || 0
//        const size = font?.size || 24
//        const height = size /1.6
//        if(position.length>1){
//          d.drawText(position[0], position[1], height, theta, text, "left", "baseline", lineTypeName, colorIndex)  
//        }
//      })
//    }
  })
 

  const string = d.stringify()
  return string
} 
