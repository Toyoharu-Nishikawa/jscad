"strict"

import {checkCross, getCrossPoint} from "./line.mjs"

const dist = (p1, p2)=> Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2)


export const offset = (l, normalizedCubicspline)=>{
  const X = normalizedCubicspline.X  
  const Y = normalizedCubicspline.Y  
  const DX = normalizedCubicspline.DX 
  const DY = normalizedCubicspline.DY 
  return t =>{
    const x = X(t)
    const y = Y(t)
    const dx = DX(t)
    const dy = DY(t)
    const nx = -dy
    const ny = dx
    const ds = Math.sqrt(nx**2+ny**2)
    const deltaX = nx*l/ds
    const deltaY = ny*l/ds
    const x2 = x+deltaX
    const y2 = y+deltaY
    return [x2, y2]
  }
}

const getBoundPoints = (normalizedCurve, N)=>[...Array(N)]
  .map((v,i)=>{
    const p = normalizedCurve(i/N)
    return [p[0], p[1]]
  })
  .map((v,i,arr)=>{
    const x0 = v[0] 
    const y0 = v[1]  
    const x1 = arr.length-1>i ? arr[i+1][0] : normalizedCurve((i+1)/N)[0]
    const y1 = arr.length-1>i ? arr[i+1][1] : normalizedCurve((i+1)/N)[1]
    
   return {
      a0: [x0, y0],
      a1: [x1, y1],
      t0: i/N,
      t1: (i+1)/N
    }
  })  


const getPoints = (boundPoints)=>{
  const n = boundPoints.length  
  const candidate = []
  for(let i=0;i<n-1;i++){
    const b0 = boundPoints[i]
    for(let j=i+1;j<n;j++){
      const b1 = boundPoints[j]
      const flag = checkCross(b0.a0, b0.a1, b1.a0, b1.a1) 
      if(flag){
        candidate.push([i,j])
      }
    }    
  }
  return candidate
}

const getSelfCrossPointCandidate = (normalizedCurve, N)=>{
  const boundPoints = getBoundPoints(normalizedCurve, N)
  
  const points = getPoints(boundPoints)
  const selfCrossPointCandidate = points.map(v=>[ boundPoints[v[0]], boundPoints[v[1]] ])
    .map(v=>[ [v[0].t0, v[0].t1], [v[1].t0, v[1].t1] ] )

  return selfCrossPointCandidate

}
  
export const getCrossPointOfCurves = (t0, t1, s0, s1, curveFuncT, curveFuncS, maxIteration=10, tolerance=1E-5)=>{
  let T0 = t0
  let T1 = t1
  let S0 = s0
  let S1 = s1
  let Pt0 = curveFuncT(T0)
  let Pt1 = curveFuncT(T1)
  
  let Ps0 = curveFuncS(S0)
  let Ps1 = curveFuncS(S1)
  
  let T2, S2, Pt2, Ps2
  
  for(let i=0; i<maxIteration;i++){
    const C = getCrossPoint(Pt0, Pt1, Ps0, Ps1)  
    T2 = T0 + C.t[0]*(T1-T0)
    S2 = S0 + C.t[1]*(S1-S0)
    Pt2 = curveFuncT(T2) 
    Ps2 = curveFuncS(S2) 
    
    const L = dist(Pt2,Ps2) 
    
    if(L<tolerance){
      break
    }
    
    const flagt02s02 = checkCross(Pt0, Pt2, Ps0, Ps2)
    const flagt21s02 = checkCross(Pt2, Pt1, Ps0, Ps2)
    const flagt02s21 = checkCross(Pt0, Pt2, Ps2, Ps1)
    const flagt21s21 = checkCross(Pt2, Pt1, Ps2, Ps1)
  
    if(flagt02s02){
      T1 = T2 
      S1 = S2 
      Pt1 = Pt2
      Ps1 = Ps2
    }   
    else if(flagt21s02){
      T0 = T2 
      S1 = S2 
      Pt0 = Pt2
      Ps1 = Ps2
    }
    else if(flagt02s21){
      T1 = T2 
      S0 = S2 
      Pt1 = Pt2
      Ps0 = Ps2
    } 
    else if(flagt21s21){
      T0 = T2 
      S0 = S2 
      Pt0 = Pt2
      Ps0 = Ps2
    } 
    else {
      T0 = T2 
      S0 = S2 
      Pt0 = Pt2
      Ps0 = Ps2
    }
  }
  return [T2, S2]  
}

export const getStrictSelfCrossPoints = (curveFunc, N=100, maxIteration=10, tolerance=1E-5)=>{
  const selfCrossPointCandidate = getSelfCrossPointCandidate(curveFunc, N)
  const strictT = selfCrossPointCandidate.map(v=>getCrossPointOfCurves(v[0][0], v[0][1], v[1][0], v[1][1], curveFunc, curveFunc, maxIteration, tolerance))
  return strictT
}
 

