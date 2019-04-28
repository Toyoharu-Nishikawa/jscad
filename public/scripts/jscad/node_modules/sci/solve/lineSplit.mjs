import * as matrix from "../matrix/index.mjs"


export const lineSplitMethod = (x0,f,dfdx0,maxIteration,tolerance)=>{
  let x=x0
  let y = f(x)
  let dfdx = dfdx0
  let count=0
  while(count<maxIteration){
    const dx = -y/dfdx
    x +=dx
    const tempY = f(x)
    const dy = tempY-y
    y=tempY
    if(Math.abs(y)<tolerance){
      break
    }
    dfdx =  dy/dx
    count++
  }
  const result = {
    converged: count < maxIteration ? true: false,
    error : Math.abs(y),
    count :count,
    value: x,
  }
  return result 
}

export const asyncLineSplitMethod = async (x0,f,dfdx0,maxIteration,tolerance)=>{
  let x=x0
  let y = await f(x)
  let dfdx = dfdx0
  let count=0
  while(count<maxIteration){
    const dx = -y/dfdx
    x +=dx
    const tempY = await f(x)
    const dy = tempY-y
    y=tempY
    if(Math.abs(y)<tolerance){
      break
    }
    dfdx =  dy/dx
    count++
  }
  const result = {
    converged: count < maxIteration ? true: false,
    error : Math.abs(y),
    count :count,
    value: x,
  }
  return result 
}

