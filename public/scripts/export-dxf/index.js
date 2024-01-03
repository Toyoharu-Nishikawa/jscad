import {autocadColorMap} from "./color.js"

import { Writer, point } from "../@tarikjabiri/writer/index.js";

const addHeader = (d) => {

  d.add("$ACADVER"    , {1:"AC1021"})
  d.add("$DWGCODEPAGE", {3:"ANSI_1252"})
  d.add("$INSBASE"    , {10:0, 20:0, 30:0})
  d.add("$EXTMIN"     , {10:-0.25,20:-0.5,30:0})
//  d.addVariable("$EXTMAX", [[10,300.75],[20,107.7194881156377],[30,0]])
//  d.addVariable("$LIMMIN", [[10,0],[20,0]])
//  d.addVariable("$LIMMAX", [[10,420],[20,297]])
//  d.addVariable("$ORTHOMODE", [[70,0]])
//  d.addVariable("$REGENMODE", [[70,1]])
//  d.addVariable("$FILLMODE", [[70,1]])
//  d.addVariable("$QTEXTMODE", [[70,0]])
//  d.addVariable("$MIRRTEXT", [[70,0]])
//  d.addVariable("$LTSCALE", [[40,1]])
//  d.addVariable("$ATTMODE", [[70,0]])
//  d.addVariable("$TEXTSIZE", [[40,2.5]])
//  d.addVariable("$TRACEWID", [[40,15.68]])
//  d.addVariable("$TEXTSTYLE", [[7,"STANDARD"]])
//  d.addVariable("$CLAYER", [[8,0]])
//  d.addVariable("$CELTYPE", [[6,"BYLAYER"]])
//  d.addVariable("$CECOLOR", [[62,256]])
//  d.addVariable("$CELTSCALE", [[40,1]])
//  d.addVariable("$DISPSILH", [[70,0]])
  d.add("$DIMSCALE", {40:100})
//  d.addVariable("$DIMASZ", [[40,2.5]])
//  d.addVariable("$DIMEXO", [[40,0.625]])
//  d.addVariable("$DIMDLI", [[40,3.75]])
//  d.addVariable("$DIMRND", [[40,0]])
//  d.addVariable("$DIMDLE", [[40,0]])
//  d.addVariable("$DIMEXE", [[40,1.25]])
//  d.addVariable("$DIMTP", [[40,0]])
//  d.addVariable("$DIMTM", [[40,0]])
//  d.addVariable("$DIMTXT", [[40,2.5]])
//  d.addVariable("$DIMCEN", [[40,2.5]])
//  d.addVariable("$DIMTSZ", [[40,0]])
//  d.addVariable("$DIMTOL", [[70,0]])
//  d.addVariable("$DIMLIM", [[70,0]])
  d.add("$DIMTIH",{70:0})
  d.add("$DIMTOH",{70:0})
//  d.addVariable("$DIMSE1", [[70,0]])
//  d.addVariable("$DIMSE2", [[70,0]])
//  d.addVariable("$DIMTAD", [[70,1]])
//  d.addVariable("$DIMZIN", [[70,8]])
//  d.addVariable("$DIMBLK", [[1,""]])
//  d.addVariable("$DIMASO", [[70,1]])
//  d.addVariable("$DIMSHO", [[70,1]])
//  d.addVariable("$DIMPOST", [[1,""]])
//  d.addVariable("$DIMAPOST", [[1,""]])
//  d.addVariable("$DIMALT", [[70,0]])
//  d.addVariable("$DIMALTD", [[70,3]])
//  d.addVariable("$DIMALTF", [[40,0.03937]])
//  d.addVariable("$DIMLFAC", [[40,1]])
//  d.addVariable("$DIMTOFL", [[70,1]])
//  d.addVariable("$DIMTVP", [[40,0]])
//  d.addVariable("$DIMTIX", [[70,0]])
//  d.addVariable("$DIMSOXD", [[70,0]])
//  d.addVariable("$DIMSAH", [[70,0]])
//  d.addVariable("$DIMBLK1", [[1,""]])
//  d.addVariable("$DIMBLK2", [[1,""]])
//  d.addVariable("$DIMSTYLE", [[2,"STANDARD"]])
//  d.addVariable("$DIMCLRD", [[70,0]])
//  d.addVariable("$DIMCLRE", [[70,0]])
//  d.addVariable("$DIMCLRT", [[70,0]])
//  d.addVariable("$DIMTFAC", [[40,1]])
//  d.addVariable("$DIMGAP", [[40,0.625]])
//  d.addVariable("$DIMJUST", [[70,0]])
//  d.addVariable("$DIMSD1", [[70,0]])
//  d.addVariable("$DIMSD2", [[70,0]])
//  d.addVariable("$DIMTOLJ", [[70,0]])
//  d.addVariable("$DIMTZIN", [[70,8]])
//  d.addVariable("$DIMALTZ", [[70,0]])
//  d.addVariable("$DIMALTTZ", [[70,0]])
//  d.addVariable("$DIMUPT", [[70,0]])
//  d.addVariable("$DIMDEC", [[70,2]])
//  d.addVariable("$DIMTDEC", [[70,2]])
//  d.addVariable("$DIMALTU", [[70,2]])
//  d.addVariable("$DIMALTTD", [[70,3]])
//  d.addVariable("$DIMTXSTY", [[7,"STANDARD"]])
//  d.addVariable("$DIMAUNIT", [[70,0]])
//  d.addVariable("$DIMADEC", [[70,0]])
//  d.addVariable("$DIMALTRND", [[40,0]])
//  d.addVariable("$DIMAZIN", [[70,0]])
//  d.addVariable("$DIMDSEP", [[70,44]])
//  d.addVariable("$DIMATFIT", [[70,3]])
//  d.addVariable("$DIMFRAC", [[70,0]])
//  d.addVariable("$DIMLDRBLK", [[1,"STANDARD"]])
//  d.addVariable("$DIMLUNIT", [[70,2]])
//  d.addVariable("$DIMLWD", [[70,-2]])
//  d.addVariable("$DIMLWE", [[70,-2]])
//  d.addVariable("$DIMTMOVE", [[70,0]])
//  d.addVariable("$DIMFXL", [[40,1]])
//  d.addVariable("$DIMFXLON", [[70,0]])
//  d.addVariable("$DIMJOGANG", [[40,0.7854]])
//  d.addVariable("$DIMTFILL", [[70,0]])
//  d.addVariable("$DIMTFILLCLR", [[70,0]])
//  d.addVariable("$DIMARCSYM", [[70,0]])
//  d.addVariable("$DIMLTYPE", [[6,""]])
//  d.addVariable("$DIMLTEX1", [[6,""]])
//  d.addVariable("$DIMLTEX2", [[6,""]])
//  d.addVariable("$LUNITS", [[70,2]])
//  d.addVariable("$LUPREC", [[70,4]])
//  d.addVariable("$SKETCHINC", [[40,1]])
//  d.addVariable("$FILLETRAD", [[40,0]])
//  d.addVariable("$AUNITS", [[70,0]])
//  d.addVariable("$AUPREC", [[70,2]])
//  d.addVariable("$MENU", [[1,"."]])
//  d.addVariable("$ELEVATION", [[40,0]])
//  d.addVariable("$PELEVATION", [[40,0]])
//  d.addVariable("$THICKNESS", [[40,0]])
//  d.addVariable("$LIMCHECK", [[70,0]])
//  d.addVariable("$CHAMFERA", [[40,0]])
//  d.addVariable("$CHAMFERB", [[40,0]])
//  d.addVariable("$CHAMFERC", [[40,0]])
//  d.addVariable("$CHAMFERD", [[40,0]])
//  d.addVariable("$SKPOLY", [[70,0]])
//  d.addVariable("$USRTIMER", [[70,1]])
//  d.addVariable("$ANGBASE", [[50,0]])
//  d.addVariable("$ANGDIR", [[70,0]])
//  d.addVariable("$PDMODE", [[70,34]])
//  d.addVariable("$PDSIZE", [[40,0]])
//  d.addVariable("$PLINEWID", [[40,0]])
//  d.addVariable("$SPLFRAME", [[70,0]])
//  d.addVariable("$SPLINETYPE", [[70,2]])
//  d.addVariable("$SPLINESEGS", [[70,8]])
//  d.addVariable("$HANDSEED", [[5,20000]])
//  d.addVariable("$SURFTAB1", [[70,6]])
//  d.addVariable("$SURFTAB2", [[70,6]])
//  d.addVariable("$SURFTYPE", [[70,6]])
//  d.addVariable("$SURFU", [[70,6]])
//  d.addVariable("$SURFV", [[70,6]])
//  d.addVariable("$UCSBASE", [[2,""]])
//  d.addVariable("$UCSNAME", [[2,""]])
//  d.addVariable("$UCSORG", [[10,0],[20,0],[30,0]])
//  d.addVariable("$UCSXDIR", [[10,1],[20,0],[30,0]])
//  d.addVariable("$UCSYDIR", [[10,0],[20,1],[30,0]])
//  d.addVariable("$UCSORTHOREF", [[2,""]])
//  d.addVariable("$UCSORTHOVIEW", [[70,0]])
//  d.addVariable("$UCSORGTOP", [[10,0],[20,0],[30,0]])
//  d.addVariable("$UCSORGBOTTOM", [[10,0],[20,0],[30,0]])
//  d.addVariable("$UCSORGLEFT", [[10,0],[20,0],[30,0]])
//  d.addVariable("$UCSORGRIGHT", [[10,0],[20,0],[30,0]])
//  d.addVariable("$UCSORGFRONT", [[10,0],[20,0],[30,0]])
//  d.addVariable("$UCSORGBACK", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSBASE", [[2,""]])
//  d.addVariable("$PUCSNAME", [[2,""]])
//  d.addVariable("$PUCSORG", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSXDIR", [[10,1],[20,0],[30,0]])
//  d.addVariable("$PUCSYDIR", [[10,0],[20,1],[30,0]])
//  d.addVariable("$PUCSORTHOREF", [[2,""]])
//  d.addVariable("$PUCSORTHOVIEW", [[70,0]])
//  d.addVariable("$PUCSORGTOP", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSORGBOTTOM", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSORGLEFT", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSORGRIGHT", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSORGFRONT", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PUCSORGBACK", [[10,0],[20,0],[30,0]])
//  d.addVariable("$USERI1", [[70,0]])
//  d.addVariable("$USERI2", [[70,0]])
//  d.addVariable("$USERI3", [[70,0]])
//  d.addVariable("$USERI4", [[70,0]])
//  d.addVariable("$USERI5", [[70,0]])
//  d.addVariable("$USERR1", [[40,0]])
//  d.addVariable("$USERR2", [[40,0]])
//  d.addVariable("$USERR3", [[40,0]])
//  d.addVariable("$USERR4", [[40,0]])
//  d.addVariable("$USERR5", [[40,0]])
//  d.addVariable("$WORLDVIEW", [[70,1]])
//  d.addVariable("$SHADEDGE", [[70,3]])
//  d.addVariable("$SHADEDIF", [[70,70]])
//  d.addVariable("$TILEMODE", [[70,1]])
//  d.addVariable("$MAXACTVP", [[70,64]])
//  d.addVariable("$PINSBASE", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PLIMCHECK", [[70,0]])
//  d.addVariable("$PEXTMIN", [[10,0],[20,0],[30,0]])
//  d.addVariable("$PEXTMAX", [[10,0],[20,0],[30,0]])
//  d.addVariable("$SNAPSTYLE", [[70,0]])
//  d.addVariable("$PLIMMIN", [[10,0],[20,0]])
//  d.addVariable("$PLIMMAX", [[10,210],[20,297]])
//  d.addVariable("$UNITMODE", [[70,0]])
//  d.addVariable("$VISRETAIN", [[70,1]])
//  d.addVariable("$PLINEGEN", [[70,0]])
//  d.addVariable("$PSLTSCALE", [[70,1]])
//  d.addVariable("$TREEDEPTH", [[70,3020]])
//  d.addVariable("$CMLSTYLE", [[2,"Standard"]])
//  d.addVariable("$CMLJUST", [[70,0]])
//  d.addVariable("$CMLSCALE", [[40,20]])
//  d.addVariable("$PROXYGRAPHICS", [[70,1]])
//  d.addVariable("$MEASUREMENT", [[70,1]])
//  d.addVariable("$CELWEIGHT", [[370,-1]])
//  d.addVariable("$ENDCAPS", [[280,0]])
//  d.addVariable("$JOINSTYLE", [[280,0]])
//  d.addVariable("$LWDISPLAY", [[290,0]])
//  d.addVariable("$INSUNITS", [[70,4]])
//  d.addVariable("$HYPERLINKBASE", [[1,""]])
//  d.addVariable("$STYLESHEET", [[1,""]])
//  d.addVariable("$XEDIT", [[290,1]])
//  d.addVariable("$CEPSNTYPE", [[380,0]])
//  d.addVariable("$PSTYLEMODE", [[290,1]])
//  d.addVariable("$EXTNAMES", [[290,1]])
//  d.addVariable("$PSVPSCALE", [[40,1]])
//  d.addVariable("$OLESTARTUP", [[290,0]])
//  d.addVariable("$SORTENTS", [[280,127]])
//  d.addVariable("$INDEXCTL", [[280,0]])
//  d.addVariable("$HIDETEXT", [[280,1]])
//  d.addVariable("$XCLIPFRAME", [[290,0]])
//  d.addVariable("$HALOGAP", [[280,0]])
//  d.addVariable("$OBSCOLOR", [[70,257]])
//  d.addVariable("$OBSLTYPE", [[280,0]])
//  d.addVariable("$INTERSECTIONDISPLAY", [[280,0]])
//  d.addVariable("$INTERSECTIONCOLOR", [[70,257]])
//  d.addVariable("$DIMASSOC", [[280,1]])
//  d.addVariable("$PROJECTNAME", [[1,""]])
//  d.addVariable("$CAMERADISPLAY", [[290,0]])
//  d.addVariable("$LENSLENGTH", [[40,50]])
//  d.addVariable("$CAMERAHEIGHT", [[40,0]])
//  d.addVariable("$STEPSPERSEC", [[40,2]])
//  d.addVariable("$STEPSIZE", [[40,50]])
//  d.addVariable("$3DDWFPREC", [[40,2]])
//  d.addVariable("$PSOLWIDTH", [[40,5]])
//  d.addVariable("$PSOLHEIGHT", [[40,80]])
//  d.addVariable("$LOFTANG1", [[40,1.570796326794897]])
//  d.addVariable("$LOFTANG2", [[40,1.570796326794897]])
//  d.addVariable("$LOFTMAG1", [[40,0]])
//  d.addVariable("$LOFTMAG2", [[40,0]])
//  d.addVariable("$LOFTPARAM", [[70,7]])
//  d.addVariable("$LOFTNORMALS", [[280,1]])
//  d.addVariable("$LATITUDE", [[40,1]])
//  d.addVariable("$LONGITUDE", [[40,1]])
//  d.addVariable("$NORTHDIRECTION", [[40,0]])
//  d.addVariable("$TIMEZONE", [[70,-8000]])
//  d.addVariable("$LIGHTGLYPHDISPLAY", [[280,1]])
//  d.addVariable("$TILEMODELIGHTSYNCH", [[280,1]])
//  d.addVariable("$SOLIDHIST", [[280,1]])
//  d.addVariable("$SHOWHIST", [[280,1]])
//  d.addVariable("$DWFFRAME", [[280,2]])
//  d.addVariable("$DGNFRAME", [[280,0]])
//  d.addVariable("$REALWORLDSCALE", [[290,1]])
//  d.addVariable("$INTERFERECOLOR", [[62,1]])
//  d.addVariable("$CSHADOW", [[280,0]])
//  d.addVariable("$SHADOWPLANELOCATION", [[40,0]])

}

const addLineTypeTemplate = (d) =>{
  d.add({name: "CENTER"   , descriptive: "____ _ ____"   , elements:[31.75, -6.35, 6.35, -6.35]                   })
  d.add({name: "CENTER2"  , descriptive: "____ _ ____"   , elements:[19.05, -3.175, 3.175, -3.175]                })
  d.add({name: "CENTERX2" , descriptive: "____ _ ____"   , elements:[63.5, -12.7, 12.7, -12.7]                    })
  d.add({name: "DASHED"   , descriptive: "__  __"        , elements:[5, -5]                                       })
  d.add({name: "DASHED2"  , descriptive: "__  __"        , elements:[6.35, -3.175]                                })
  d.add({name: "DASHEDX2" , descriptive: "__  __"        , elements:[25.4, -12.7]                                 })
  d.add({name: "PHANTOM"  , descriptive: "____ _ _ ____" , elements:[31.75, -6.35, 6.35, -6.35, 6.35, -6.35]      })
  d.add({name: "PHANTOM2" , descriptive: "____ _ _ ____" , elements:[15.875, -3.175, 3.175, -3.175, 3.175, -3.175]})
  d.add({name: "PHANTOMX2", descriptive: "____ _ _ ____" , elements:[63.5, -12.7, 12.7, -12.7, 12.7, -12.7]       })
  d.add({name: "DASHDOT"  , descriptive: "__ . __ . __"  , elements:[12.7, -6.35, 0.1, -6.35]                     })
  d.add({name: "DASHDOT2" , descriptive: "__ . __ . __"  , elements:[6.35, -3.175, 0.1, -3.175]                   })
  d.add({name: "DASHDOTX2", descriptive: "__ . __ . __"  , elements:[25.4, -12.7, 0.1, -12.7]                     })
  d.add({name: "DOT"      , descriptive: ".  . ."        , elements:[0.1, -6.35]                                  })
  d.add({name: "DOT2"     , descriptive: ".  . ."        , elements:[0.1, -3.175]                                 })
  d.add({name: "DOTX2"    , descriptive: ".  . ."        , elements:[0.1, -12.7]                                  })
  d.add({name: "DIVIDE"   , descriptive: "__ . . __"     , elements:[12.7, -6.35, 0.1, -6.35, 0.1, -6.35]         })
  d.add({name: "DIVIDE2"  , descriptive: "__ . . __"     , elements:[6.35, -3.175, 0.1, -3.175, 0.1, -3.175]      })
  d.add({name: "DIVIDEX2" , descriptive: "__ . . __"     , elements:[25.4, -12.7, 0.1, -12.7, 0.1, -12.7]         })
}

export const getDxfTmp = (param) => {
  const writer = new Writer();
  const modelSpace = writer.document.modelSpace;
  
  // Add entites to the model space
  modelSpace.addLine({
    start: point(),
    end: point(100, 100),
    // Other options...
  });
  
  // To get the dxf content just call the stringify() method
  const content = writer.stringify();
  return content
}


export const getDxf = (param) => {
  const writer = new Writer()
  console.log({writer})
  const modelSpace = writer.document.modelSpace
  const paperSpace = writer.document.paperSpace
 
//  const d = new DxfWriter()
  console.log({paperSpace})
  console.log({modelSpace})
  //addHeader(writer.document.header)
  addLineTypeTemplate(writer.document.tables.ltype)

  const screenStroke = "black"

  param.forEach((pv,pi)=>{
    const sheetId = pv[0]
    const sheetParams = pv[1]

    const lineType = sheetParams.figsAttr?.lineType //|| "CONTINUOUS"
    const sheetColor = sheetParams.figsAttr?.stroke
    console.log({sheetColor})
    const colorId =autocadColorMap.get(sheetColor)
    //modelSpace.addLayer(sheetId, colorId, lineType)
    writer.document.tables.layer.add({name:sheetId, colorNumber:colorId, lineTypeName:lineType})

    const figs = sheetParams.figs
    figs.forEach(fv=>{
      const type = fv.type
      const param = fv.param
      const attr = fv.attr
      const lineTypeName = attr?.lineTypeName
      const lineColor = attr?.stroke 
      //const lineWeight = attr?.["stroke-width"] 
      const colorIndex =autocadColorMap.get(lineColor)
      const option = {
        lineTypeName: lineTypeName, 
        colorNumber:colorIndex,
        layerName: sheetId,
       // lineWeight,
      }

      switch(type){
        case "line":{
          const start = point(...param.points[0])
          const end   = point(...param.points[1])
          const parameters = {start,end,...option} 
          modelSpace.addLine(parameters)
          break
        }
        case "lines":{
          const points = param.points.map(v=>point(...v))
          points.forEach((v,i,arr)=>{
            if(i>0){
              const start = arr[i-1] 
              const end   = v 
              const parameters = {start,end,...option} 
              modelSpace.addLine(parameters)
            }
          })
          break
        }
        case "polyline": {
          const vertices = param.points.map(v=>point(...v))
          const parameters = {vertices,...option} 
          modelSpace.addLWPolyline(parameters);
          break
        }
        case "circle":{
          const center = point(...param.center)
          const radius = param.radius
          const parameters = {center,radius,...option} 
          modelSpace.addCircle(parameters)
          break
        }
        case "ellipse":{
          const center = point(...param.center)
          const [rx,ry] = param.radius
          const ratio = rx>=ry ?  ry/rx : rx/ry
          const rotation = rx>=ry  ? (param.rotation || 0):(param.rotation || 0)+90 
          const endpointX = rx*Math.cos(rotation/180*Math.PI)
          const endpointY = rx*Math.sin(rotation/180*Math.PI)
          const endpoint = point(endpointX,endpointY,0)
          const start = 0
          const end = 2*Math.PI
          const parameters = {center, endpoint, ratio, start, end,...option}
          console.log("ellipse",{parameters})
          modelSpace.addEllipse(parameters)
          break
        }
        case "arc":{
          const center = point(...param.center)
          const radius = param.radius
          const startAngle = param.start
          const endAngle = param.end
          const parameters = {center, radius, startAngle, endAngle, ...option}
          modelSpace.addArc(parameters)
          break
        }
        case "ellipticalArc":{
          const center = point(...param.center)
          const [rx,ry] = param.radius
          const ratio = rx>=ry ?  ry/rx : rx/ry
          const rotation = rx>=ry  >1 ? (param.rotation || 0) :(param.rotation || 0)+90
          const endpointX = rx*Math.cos(rotation/180*Math.PI)
          const endpointY = rx*Math.sin(rotation/180*Math.PI)
          const endpoint = point(endpointX,endpointY,0)


          const start = rx >=ry ?  param.start/180*Math.PI: param.start/180*Math.PI - Math.PI/2
          const end   = rx>=ry  ?  param.end/180*Math.PI  : param.end/180*Math.PI   - Math.PI/2

          const parameters = {center, endpoint, ratio, start, end,...option}
          console.log("ellipse",{parameters})
          modelSpace.addEllipse(parameters)
          break
        }

        case "bspline":{
          const controls = param.points.map(v=>point(...v))
          const knots = param.knots
          const degree = param.degree
          const weights= []
          const parameters = {
            controls ,
            knots,
            degree,
            weights,
            ...option
          }
          modelSpace.addSpline(parameters)
          break
        }
      }
    })

    const dimensions = sheetParams.dimensions
    dimensions.forEach((dv,di)=>{
      const type = dv.type
      const param = dv.param
      const dimStyle = dv.dimStyle
      const attr = dv.attr
      const lineTypeName = attr?.lineTypeName
      const lineColor = attr?.stroke 
      const colorIndex =autocadColorMap.get(lineColor)
      const prefix = dimStyle?.prefix
      const surffix = dimStyle?.surffix
      const decimalPlaces =  dimStyle.decimalPlaces

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


          const start      = point(x1,y1,0)
          const end        = point(x2,y2,0)

          const dimStyleName = `dim_${pi}_${di}`
          const dimParams = {name:dimStyleName, 
            DIMSCALE:1,DIMTXT:size,DIMASZ:size,DIMDEC:decimalPlaces
          }
          writer.document.tables.dimStyle.add(dimParams)

          options.offset = distance
          options.dimStyleName = dimStyleName
          //options.textRotation = 45
          const parameters = {start,end, ...options}
          modelSpace.addAlignedDim(parameters)
          break
        }
        case "horizontal" :{
          const [x1, y1] = param.points[0]
          const [x2, y2] = param.points[1]
          const distance = param.distance
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20

          const start  = point(x1,y1,0)
          const end    = point(x2,y2,0)
          //const definitionPoint= {x:x3,y:y3,z:0}
          //const middlePoint= {x:x4,y:y4,z:0}


          const dimStyleName = `dim_${pi}_${di}`
          const dimParams = {name:dimStyleName, 
            DIMSCALE:1,DIMTXT:size,DIMASZ:size,DIMDEC:decimalPlaces
          }
          writer.document.tables.dimStyle.add(dimParams)

          options.angle = 0
          options.offset = distance
          options.dimStyleName = dimStyleName
          const parameters = {start, end, ...options}
          modelSpace.addLinearDim(parameters)
          break
        }
        case "vertical" :{
          const [x1, y1] = param.points[0]
          const [x2, y2] = param.points[1]
          const distance = param.distance
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20


          const start  = point(x1,y1,0)
          const end    = point(x2,y2,0)


          const dimStyleName = `dim_${pi}_${di}`
          const dimParams = {name:dimStyleName, 
            DIMSCALE:1,DIMTXT:size,DIMASZ:size,DIMDEC:decimalPlaces
          }
          writer.document.tables.dimStyle.add(dimParams)

          options.angle = 90
          options.offset = distance
          options.dimStyleName = dimStyleName
          const parameters = {start, end, ...options}
          modelSpace.addLinearDim(parameters)

          break
        }
        case "diameter" :{
          const [x1, y1] = param.center
          const radius   = param.radius
          const angle    = param.angle
          const firstX = x1+radius*Math.cos(angle/180*Math.PI)
          const firstY = y1+radius*Math.sin(angle/180*Math.PI)
          const first = point(firstX,firstY,0)
          const defX = x1-radius*Math.cos(angle/180*Math.PI)
          const defY = y1-radius*Math.sin(angle/180*Math.PI)
          const definition = point(defX,defY,0)
          const middle = point(...param.center)
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20

          const dimStyleName = `dim_${pi}_${di}`
          const dimParams = {name:dimStyleName, 
            DIMSCALE:1,DIMTXT:size,DIMASZ:size,DIMDEC:decimalPlaces
          }
          writer.document.tables.dimStyle.add(dimParams)

          options.dimStyleName = dimStyleName
          const parameters = {first,middle,definition, ...options}

          modelSpace.addDiameterDim(parameters)

          break
        }
        case "radius" :{
          const [x1, y1] = param.center
          const radius   = param.radius
          const angle    = param.angle
          const firstX = x1+radius*Math.cos(angle/180*Math.PI)
          const firstY = y1+radius*Math.sin(angle/180*Math.PI)
          const first = point(firstX,firstY,0)
          const defX = x1-radius*Math.cos(angle/180*Math.PI)
          const defY = y1-radius*Math.sin(angle/180*Math.PI)
          //const definition = point(defX,defY,0)
          const definition = point(...param.center)
          const middle = point(...param.center)
          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
          const size = font?.["font-size"] || 20
          const decimalPlaces =  dimStyle.decimalPlaces

          const dimStyleName = `dim_${pi}_${di}`
          //const dimParams = {name:dimStyleName, DIMSCALE:1,DIMTXT:size,DIMASZ:size}
          const dimParams = {name:dimStyleName, 
            DIMSCALE:1,DIMTXT:size,DIMASZ:size,DIMDEC:decimalPlaces
          }
          writer.document.tables.dimStyle.add(dimParams)

          options.dimStyleName = dimStyleName
          const parameters = {first,middle,definition, ...options}

          modelSpace.addRadialDim(parameters)


          break
        }
        case "angle" :{
//          const [x1, y1] = param.center
//          const center = point(...param.center)
//          const radius   = param.radius
//          const start    = param.start
//          const end    = param.end
//          const startAngle = start/180*Math.PI
//          const endAngle   = end/180*Math.PI
//          const midAngle = (startAngle+endAngle)/2
//          const sX = x1+radius*Math.cos(startAngle)
//          const sY = y1+radius*Math.sin(startAngle)
//          const mX = x1+radius*Math.cos(midAngle)
//          const mY = y1+radius*Math.sin(midAngle)
//          const eX = x1+radius*Math.cos(endAngle)
//          const eY = y1+radius*Math.sin(endAngle)
//          const startPoint = point(sX,sY,0)
//          const midPoint = point(mX,mY,0)
//          const endPoint = point(eX,eY,0)
//          console.log({center},{startPoint},{endPoint})
//          const font = dimStyle?.font || {"font-size": 20, "stroke-width":0.1}
//          const size = font?.["font-size"] || 20
//          const decimalPlaces =  dimStyle.decimalPlaces
//
//          const dimStyleName = `dim_${pi}_${di}`
//          const dimParams = {name:dimStyleName, DIMSCALE:1,DIMTXT:size,DIMASZ:size}
//          writer.document.tables.dimStyle.add(dimParams)
//
//          options.dimStyleName = dimStyleName
//          const parameters = {center, startAngle,endAngle,firstLeaderPoint:midPoint, ...options}
//
//          modelSpace.addArcDim(parameters)


          break
        }

      }
    })
    const texts = sheetParams.texts
    texts.forEach((tv,ti)=>{

      const param = tv.param
      const attr = tv.attr

      const lineTypeName = attr?.lineTypeName

      const firstAlignmentPoint = point(...param.position)
      const value = param.text

      const font = param.font
      const size = font?.size || 24
      const height = size /1.6
      const textColor = font?.stroke 
      const colorIndex =autocadColorMap.get(textColor)

      const rotation= param?.theta || 0
      const horizontalJustification= 0//TextHorizontalAlignment.Center,
      const verticalJustification= 0  //TextVerticalAlignment.Middle,
        //secondAlignmentPoint: point3d(20, 20),

      const option = {
        lineTypeName: lineTypeName, 
        colorNumber:colorIndex,
        layerName: sheetId,
      }

      
      const parameters = {
        firstAlignmentPoint,value,height,rotation,
        colorIndex,
        horizontalJustification, verticalJustification,
        ...option,
      }
      
      modelSpace.addText(parameters)
    })
  })
 

  const string = writer.stringify()
  return string
} 
