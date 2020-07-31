
//import {Drawing} from "../dxf-writer/Drawing.js"

const addLineTypeTemplate() = (d) =>{
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

export getDxf(sheetList){
  const d = new Drawing()
  addLineTypeTemplate(d)

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
