
export const cubicspline = (x, y, a0=0, an=0, method="M", differentiation=0) =>{
  try{
    if(x.length !== y.length){
      throw new RangeError("length of x must be equal to length of y") 
    }
    if(method !== "M" && method !=="m"){
      throw new RangeError("method must be M or m") 
    }
    if(differentiation >2){
      throw new RangeError("differentiation must be less than 2") 
    }
  }
  catch(e){
    console.log(e.name + " : " + e.message)
    return null
  }
  const num = x.length
  
  const h = x.map((v,i,arr)=> i ?x[i]-x[i-1]:0) 

  const ramda = h.map((v,i,arr)=> 
    (i===0 || i===arr.length-1)?0:h[i+1]/(h[i]+h[i+1])
  )
  const mu = ramda.map(v=>1-v) 
  const d= y.map((v,i,arr)=>
    (i===0 || i===arr.length-1) ? 0:
    6*((arr[i+1]-arr[i])/h[i+1]-(arr[i]-arr[i-1])/h[i])/(h[i]+h[i+1])
  )
  ramda[0] = method === "M" ? 0:
    method ==="m" ? 1: 0  
    
  mu[num-1] = method === "M" ? 0:
    method ==="m" ? 1: 0  
    
  d[0] = method === "M" ? 2*a0:
    method ==="m" ? 6/h[1]*((y[1]-y[0])/h[1] -a0):0  
    
  d[d.length-1] = method === "M" ? 2*an:
    method ==="m" ? 6/h[num-1]*(an-(y[num-1]-y[num-2])/h[num-1]):0  
  
  const b = [...Array(num)].fill(2)
  const A = b.reduce((pre,current, i)=>{
    const a = i ? current - mu[i]/pre[i-1]*ramda[i-1]:current  
    pre.push(a) 
    return pre
  },[])
  const B = d.reduce((pre,current,i)=>{
    const a2 = i ? current - mu[i]/A[i-1]*pre[i-1]: current 
    pre.push(a2)
    return pre
  },[])
 
  A.reverse()
  B.reverse()
  ramda.reverse()
  const M = A.reduce((pre,current,i)=>{
    const a3 = i? (B[i] - ramda[i]*pre[i-1])/current: B[i]/current 
    pre.push(a3)
    return pre
  }, [])
  M.reverse()

  if(differentiation ===-1){
    const F = (i, x0)=>{
      const y0= M[i]* (-((x[i+1]-x0)**4)/(24*h[i+1]) + (x[i+1]-x0)**2/12*h[i+1] ) 
        + M[i+1]* ( (x0 - x[i])**4/(24*h[i+1]) - (x0-x[i])**2/12*h[i+1] )
        - (x[i+1]-x0)**2/(2*h[i+1])*y[i]
        + (x0-x[i])**2/(2*h[i+1])*y[i+1]
      return y0
    }
    const Fs = (i)=>{
      return M[i]/24*h[i+1]**3 - h[i+1]/2*y[i]
    }
    const Fe =(i)=> {
      return -M[i+1]/24*h[i+1]**3 + h[i+1]/2*y[i+1]
    }
    const Fi = (i)=>{
      return Fe(i)-Fs(i)
    }
    return (x0, x1)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2

      const jndex = x.reduce((pre,current,j)=>current <= x1 ? j: pre,0) 
      const j = jndex <x.length-1 ? jndex : x.length-2

      const y0 = i+1<j ? Fe(i)-F(i,x0) + [...Array(j-i-1)].map((v,k)=>Fi(i+1+k)).reduce((pre,current)=>pre+current,0)+F(j,x1)-Fs(j):
        i+1===j ? Fe(i)-F(i,x0)+F(j, x1)-Fs(j):
        i===j ? F(j,x1) -F(i, x0):
        F(j,x1) -F(i, x0)
      return y0
    }
  }
  else if(differentiation===0){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0= M[i]* ( (x[i+1]-x0)**3/(6*h[i+1]) - (x[i+1]-x0)/6*h[i+1] ) 
        + M[i+1]* ( (x0 - x[i])**3/(6*h[i+1]) - (x0-x[i])/6*h[i+1] )
        + (x[i+1]-x0)/h[i+1]*y[i]
        + (x0-x[i])/h[i+1]*y[i+1]
      return y0
    }
  }
  else if(differentiation===1){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0d = M[i]* ( -1*(x[i+1]-x0)**2/(2*h[i+1]) + h[i+1]/6)
        + M[i+1]* ( (x0-x[i])**2/(2*h[i+1]) - h[i+1]/6)
        + (y[i+1]-y[i])/h[i+1]
      return y0d
    }
  }
  else if(differentiation===2){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0d2 = M[i]* (x[i+1]-x0)/h[i+1]
        + M[i+1]* (x0 - x[i])/h[i+1]
      return y0d2
    }
  }
  else{
    return null 
  }
}


export const cubicsplineLinear = (x, y, a0=0, an=0, method="M")=>{
  const spline = cubicspline(x, y, a0, an, method, 0) 
  const splineDiff1 = cubicspline(x, y, a0, an, method,1) 
  const x0 = x[0]
  const xN = x[x.length-1]

  const y0 = y[0]
  const yN = y[y.length-1]

  const diff0 = splineDiff1(x0)
  const diffN = splineDiff1(xN)

  const minX = Math.min(...x)
  const maxX = Math.max(...x)
  return x1 => x1  < minX ? (x1-x0)*diff0+y0:
    x1 > maxX ? (x1-xN)*diffN+yN:
    spline(x1)
}


export const cyclicCubicspline = (x, y, differentiation=0) =>{
  try{
    if(x.length !== y.length){
      throw new RangeError("length of x must be equal to length of y") 
    }
    if(differentiation >2){
      throw new RangeError("differentiation must be less than 2") 
    }
  }
  catch(e){
    console.log(e.name + " : " + e.message)
    return null
  }
  const num = x.length
  
  const h = x.map((v,i,arr)=> i ?arr[i]-arr[i-1]:0)  //0,1,2, ..., N-1

  const ramda = h.map((v,i,arr)=> 
    i === 0 ?0:
    i === arr.length-1 ? h[1]/(h[arr.length-1]+h[1]):
    h[i+1]/(h[i]+h[i+1])
  )
  
  const mu = ramda.map(v=>1-v) 
  const d= y.map((v,i,arr)=>
    i ===0 ? 0:
    i ===arr.length-1 ? 6*((arr[1]-arr[0])/h[1] -(arr[0]-arr[i-1])/h[i])/(h[i]+h[1]) :
    6*((arr[i+1]-arr[i])/h[i+1]-(arr[i]-arr[i-1])/h[i])/(h[i]+h[i+1])
  )
 
  const b = [...Array(num-1)].fill(2)  //0,1, ... ,N-2
  const A = b.reduce((p,c, i)=>{
    const a = i === 0 ? 0 :
              i === 1 ? c :
              c - mu[i]/p[i-1]*ramda[i-1]  
    p.push(a) 
    return p
  },[])
  
  const P = A.map((v,i)=> i===0 ? 0: -mu[i]/A[i]) 
  const Q = [...Array(num-1)].reduce((p,c,i)=>{
    const a = i === 0 ? 0 :
              i === 1 ? ramda[1] :
              -ramda[i]*p[i-1] 
    p.push(a) 
    return p   
  },[])
  
  const R = [...Array(num-1)].reduce((p,c,i)=>{
    const a = i === 0 ? 0 :
              i === 1 ? d[1] :
              d[i]-ramda[i]*p[i-1] 
    p.push(a) 
    return p   
  },[])

  P.reverse()
  Q.reverse()
  
  const t = [...Array(num)].reduce((p,c,i)=>{
    const a = i === 0 ? 1 :
              i === num-1 ? 0:
              P[i]*p[i-1] + Q[i]
    p.push(a) 
    return p   
  },[]) 
  
  const v = [...Array(num)].reduce((p,c,i)=>{
    const a = i === 0 ? 0 :
              i === num-1 ? 0:
              P[i]*p[i-1] + R[i]
    p.push(a) 
    return p   
  },[]) 

  t.reverse()  
  v.reverse()  

  const zn = (d[num-1] - (ramda[num-1]*v[1]+mu[num-1]*v[num-2]))/(ramda[num-1]*t[1]+mu[num-1]*t[num-2]+b[num-2])
  const M = [...Array(num)].map((u,i)=>i === 0 ? 0: t[i]*zn +v[i] )
  
  if(differentiation ===-1){
    const F = (i, x0)=>{
      const y0= M[i]* (-((x[i+1]-x0)**4)/(24*h[i+1]) + (x[i+1]-x0)**2/12*h[i+1] ) 
        + M[i+1]* ( (x0 - x[i])**4/(24*h[i+1]) - (x0-x[i])**2/12*h[i+1] )
        - (x[i+1]-x0)**2/(2*h[i+1])*y[i]
        + (x0-x[i])**2/(2*h[i+1])*y[i+1]
      return y0
    }
    const Fs = (i)=>{
      return M[i]/24*h[i+1]**3 - h[i+1]/2*y[i]
    }
    const Fe =(i)=> {
      return -M[i+1]/24*h[i+1]**3 + h[i+1]/2*y[i+1]
    }
    const Fi = (i)=>{
      return Fe(i)-Fs(i)
    }
    return (x0, x1)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2

      const jndex = x.reduce((pre,current,j)=>current <= x1 ? j: pre,0) 
      const j = jndex <x.length-1 ? jndex : x.length-2

      const y0 = i+1<j ? Fe(i)-F(i,x0) + [...Array(j-i-1)].map((v,k)=>Fi(i+1+k)).reduce((pre,current)=>pre+current,0)+F(j,x1)-Fs(j):
        i+1===j ? Fe(i)-F(i,x0)+F(j, x1)-Fs(j):
        i===j ? F(j,x1) -F(i, x0):
        F(j,x1) -F(i, x0)
      return y0
    }
  }
  else if(differentiation===0){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0= M[i]* ( (x[i+1]-x0)**3/(6*h[i+1]) - (x[i+1]-x0)/6*h[i+1] ) 
        + M[i+1]* ( (x0 - x[i])**3/(6*h[i+1]) - (x0-x[i])/6*h[i+1] )
        + (x[i+1]-x0)/h[i+1]*y[i]
        + (x0-x[i])/h[i+1]*y[i+1]
      return y0
    }
  }
  else if(differentiation===1){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0d = M[i]* ( -1*(x[i+1]-x0)**2/(2*h[i+1]) + h[i+1]/6)
        + M[i+1]* ( (x0-x[i])**2/(2*h[i+1]) - h[i+1]/6)
        + (y[i+1]-y[i])/h[i+1]
      return y0d
    }
  }
  else if(differentiation===2){
    return (x0)=>{
      const index = x.reduce((pre,current,i)=>current <= x0 ? i: pre,0) 
      const i = index <x.length-1 ? index : x.length-2
      const y0d2 = M[i]* (x[i+1]-x0)/h[i+1]
        + M[i+1]* (x0 - x[i])/h[i+1]
      return y0d2
    }
  }
  else{
    return null 
  }
}

const dist = (p1, p2)=> Math.sqrt((p1[0]-p2[0])**2+(p1[1]-p2[1])**2)

export const normalizedCubicspline = (list, cyclicFlag=false )=>{
  /* input : double array of float */
  /* output: function args from 0 to 1, return [x, y]  */

  const x = list.map(v=>v[0])
  const y = list.map(v=>v[1])
  const ds = list.map((v,i,arr)=>i>0 ? dist(v,arr[i-1]) : 0) 
  const total = ds.reduce((p,c)=>p+c,0)
  const s = ds.reduce((p,c)=>{
    const pre = p.length > 0 ?  p[p.length-1] :0
    const sum = pre+c
    const l = p.concat(sum)
    return l 
  },[]).map(v=>v/total) 
  
  const X =  cyclicFlag ? cyclicCubicspline(s, x, 0) : cubicspline(s, x, 0, 0, "M", 0)
  const Y =  cyclicFlag ? cyclicCubicspline(s, y, 0) : cubicspline(s, y, 0, 0, "M", 0)
  const DX = cyclicFlag ? cyclicCubicspline(s, x, 1) : cubicspline(s, x, 0, 0, "M", 1)
  const DY = cyclicFlag ? cyclicCubicspline(s, y, 1) : cubicspline(s, y, 0, 0, "M", 1)
  return {
    X: X,
    Y: Y,
    DX: DX,
    DY: DY,
  }
}

export const normalize = (X, Y) => (t)=>[X(t), Y(t)]

export const renormalize = (t0, t1, normalizedFunc) => {
  return t => {
    const s = t0+(t1 -t0)*t
    const p = normalizedFunc(s)
    return p
  } 
} 
 
