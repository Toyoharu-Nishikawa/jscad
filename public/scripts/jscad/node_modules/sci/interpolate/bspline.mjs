import * as solve from "../solve/index.mjs"

const search = (knots,order, x)=>{
  const index= knots.slice(0, -order)
    .reduce((pre,current,index)=>current <= x ? index:pre, 0)
  return index
}

const updateN = (N, knots, x, m, i)=>{
  const beta1 = knots.length-1 <m+i ? 0:
    N.length-1 <i ? 0:
    knots[m+i-1] === knots[i] ? 0:
    (x-knots[i])/(knots[m+i-1] - knots[i])*N[i]
    
  const beta2 = knots.length-1 <m+i ? 0:
    N.length-1 <i+1 ? 0:
    knots[m+i] === knots[i+1] ? 0:
    (knots[m+i]-x)/(knots[m+i]-knots[i+1])*N[i+1]
    
  const newN = beta1+beta2 

  return newN
}

const makeN = (knots, order,num, x) => {
  const index = search(knots, order, x)
  const N1 =[...Array(num)].map((v,i)=>i===index?1:0)
  const N = [...Array(order-1)].reduce((pre,current,m)=>{
    return pre.map((v,i,arr)=>updateN(arr, knots, x, m+2,i))
  },N1)
  return N
}

export const bspline = (x, y, degree=3, k)=>{
  const order = degree+1
  const knots = typeof k !=="undefined" ? k:
    [].concat(
      Array(order).fill(x[0]),
      Array(x.length-order).fill(0).map((v,i)=>(i+1)*(x[x.length-1]-x[0])/(x.length-order+1)),
      Array(order).fill(x[x.length-1])
    )
  try{
    if(knots.length !== x.length+order){
      throw new RangeError("length of knots must be equal to x.length + degree + 1") 
    }
    if(x.length !== y.length){
      throw new RangeError("length of x must be equal to y.length") 
    }
  }
  catch(e){
   console.log(e.name +" : " + e.message)
  }
  const A = x.map((value, i, arr) => makeN(knots, order, arr.length, value))
  const c = solve.linEqGauss(A, y)
  const num = x.length 
  return (x0)=>{ 
    const N = makeN(knots, order,num, x0)
    const y0 = N.reduce((pre, current, i)=>pre+current*c[i],0)
    return y0
  }
}


