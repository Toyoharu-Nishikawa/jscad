import {dataMap as dashMap} from "./dash.js"

export const setLineType = (fig, attr) => { 
  const lineTypeName =  attr?.lineTypeName
  if(lineTypeName){
    const dashCode = dashMap.has(lineTypeName) ? dashMap.get(lineTypeName) : lineTypeName
    fig.attr("stroke-dasharray", dashCode)
  }
}
