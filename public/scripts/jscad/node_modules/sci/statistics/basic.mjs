"use strict"
export const average = data =>{
  const N = data.length
  const ave = data.reduce((p,c)=>p+c,0)/N
  return ave
}

export const variance = data =>{
  const vari = average(data.map(v=>v**2)) -average(data)**2
  return vari   
}

export const standard = data =>{
  return Math.sqrt(variance(data))
}

export const normalize = (data,...minMax) => {
  const min = minMax.length===2 ? minMax[0] : Math.min(...data)
  const max = minMax.length===2 ? minMax[1] : Math.max(...data)
  const delta = max -min
  const norm = delta >0 ? data.map(v=>(v-min)/delta) : data
  return norm
}  

export const standardize = (data, ...aveStd) => {
  const ave = aveStd.length===2 ? aveStd[0] : average(data)
  const std=  aveStd.length===2 ? aveStd[1] : standard(data)
  const stdr = std>0 ? data.map(v=>(v-ave)/std) : data
  return stdr 
} 

export const reNormalize = (data, min, max)=>{
  const delta = max -min
  const re = data.map(v=>v*delta+min)
  return re
}

export const reStandardize = (data,ave,std)=>{
  const re = data.map(v=>v*std+ave)
  return re
}

export const R2 = (x, y, f)=>{
  const std = variance(y)
  const N = x.length
  const estimated = x.map(f)
  const res = estimated.reduce((p,c,i)=>p+(y[i]-c)**2,0)/N
  const R2 = 1- res/std 

  return R2
}
