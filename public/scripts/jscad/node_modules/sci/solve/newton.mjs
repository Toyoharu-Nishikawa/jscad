import * as matrix from "../matrix/index.mjs"

"use strict"

export const newtonMethod = (x0, f, invJ, maxIteration,torelance)=>{
  let dx = [0,0] 
  let x = x0
  let y = f(x0) 
  
  let count=0
  while(count<maxIteration){
    dx =mulScalarVec(-1,matrix.mulMatVec(invJ(x), y))
    x = matrix.addVec(x,dx)
    y =  f(x) 
    const rem = matrix.absVec(y)
    if(rem<torelance){
      break  
    }
    count++
  }
  const result = {
    converged: count < maxIteration ? true: false,
    error : y,
    count :count,
    value: x,
  }
  return result
}

export const asyncNewtonMethod = async (x0, f, invJ, maxIteration,torelance)=>{
  let dx = [0,0] 
  let x = x0
  let y = await f(x0) 
  
  let count=0
  while(count<maxIteration){
    dx =mulScalarVec(-1,matrix.mulMatVec(invJ(x), y))
    x = matrix.addVec(x,dx)
    y = await f(x) 
    const rem = matrix.absVec(y)
    if(rem<torelance){
      break  
    }
    count++
  }
  const result = {
    converged: count < maxIteration ? true: false,
    error : y,
    count :count,
    value: x,
  }
  return result
}

