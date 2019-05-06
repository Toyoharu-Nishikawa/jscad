
"use strict"

export const gradientDescent = (x0, f, dfdx0, alpha, tolerance, maxIteration) =>{
  let f1 = f(x0) 
  let x = x0 - alpha * dfdx0
  let dx = x - x0
  let f2 = f(x)
  let dfdx = (f2-f1)/dx
  let count = 0
  const history=[]
  while(count < maxIteration){
    const tempX =  x -alpha*dfdx 
    const tempF = f(tempX)
    dx = tempX - x
    x = tempX
    f1 = f2
    f2 = tempF
    dfdx = (f2-f1)/dx
    history.push([x, f2])
    if(Math.abs(dfdx)<tolerance)break 
    count++
  }
  const flag = count < maxIteration ? true:false
  const result = {
    converged:flag,
    value: x,
    history:history,
  }
  return result
}

export const asyncGradientDescent = async (x0, f, dfdx0, alpha, tolerance, maxIteration) =>{
  let f1 = await f(x0) 
  let x = x0 - alpha * dfdx0
  let dx = x - x0
  let f2 = await f(x)
  let dfdx = (f2-f1)/dx
  let count = 0
  const history=[]
  while(count < maxIteration){
    const tempX =  x -alpha*dfdx 
    const tempF = await f(tempX)
    dx = tempX - x
    x = tempX
    f1 = f2
    f2 = tempF
    dfdx = (f2-f1)/dx
    history.push([x, f2])
    if(Math.abs(dfdx)<tolerance)break 
    count++
  }
  const flag = count < maxIteration ? true:false
  const result = {
    converged:flag,
    value: x,
    history:history,
  }
  return result
}
