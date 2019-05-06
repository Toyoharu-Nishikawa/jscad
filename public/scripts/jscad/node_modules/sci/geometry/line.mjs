import {linEqGauss} from "../solve/linearEquation.mjs"

export const checkCross = (a1, a2, b1, b2) =>{
  //line p1 -p2 
  //line p3 -p4
  const x1 = a1[0]
  const x2 = a2[0]
  const x3 = b1[0]
  const x4 = b2[0]
  const y1 = a1[1]
  const y2 = a2[1]
  const y3 = b1[1]
  const y4 = b2[1]
 
  const tc=(x1-x2)*(y3-y1)+(y1-y2)*(x1-x3)
  const td=(x1-x2)*(y4-y1)+(y1-y2)*(x1-x4)

  const ta=(x3-x4)*(y1-y3)+(y3-y4)*(x3-x1)
  const tb=(x3-x4)*(y2-y3)+(y3-y4)*(x3-x2)

  const flagCD = tc*td<0  
  const flagAB = ta*tb<0  
  const flag = flagCD && flagAB
  return flag
}

export const getCrossPoint = (a1, a2, b1, b2)=>{
  const x1 = a1[0]
  const x2 = a2[0]
  const x3 = b1[0]
  const x4 = b2[0]
  const y1 = a1[1]
  const y2 = a2[1]
  const y3 = b1[1]
  const y4 = b2[1]

  const A = [
    [x2 -x1, -(x4-x3)],
    [y2 -y1, -(y4-y3)],
  ]  
  const v = [-(x1-x3), -(y1-y3)]
  const t = linEqGauss(A,v)
  const point = [x1+t[0]*(x2-x1), y1+t[0]*(y2-y1)]
  return {
    point: point,
    t: t
  }
}

