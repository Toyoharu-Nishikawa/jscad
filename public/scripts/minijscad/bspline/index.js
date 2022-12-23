const quickSearch = (knots, degree, x) => {
  const order = degree + 1
  //const cand = knots.slice(0, -order)
  const cand = knots
  const max = cand[cand.length-1]
  let index = 0
  for(let i=0;i<cand.length;i++){
    if(max<=cand[i]){
      break
    }
    else if(cand[i] <=x){
      index= i
    }
    else{
      break
    }
  }
  return index
}

export const makeNmatrix = (knots, degree, x) => {
  const order = degree + 1
  const i = quickSearch(knots, degree, x)
  const u = knots 
  const m = u.length -order

  const knotIni = knots[0]
  
  const Ntensor = [[[1]]]
  for(let p=1;p<=degree;p++){
    const NpMatrix = []
    for(let k=0;k<=p;k++){
      const list =[]  
      for(let j=0;j<=p;j++){
        const n= i-p+j
        if(k==0){
          const N1 =  Ntensor[p-1][0][j-1] || 0
          const N2 =  Ntensor[p-1][0][j]|| 0
          const c1 = u[n+p]-u[n] >0 ?  (x -u[n])/(u[n+p]-u[n])*N1 : 0
          const c2 = u[n+p+1]-u[n+1] > 0 ? (u[n+p+1]-x)/(u[n+p+1]-u[n+1])*N2 : 0
 
          const Nip = c1 + c2 

          list.push(Nip)
        } 
        else{
          const N1 = j==0 ? 0 : Ntensor[p-1][k-1][j-1]
          const N2 = j==p ? 0 : Ntensor[p-1][k-1][j]
          const c1 = u[n+p]-u[n] > 0 ? p/(u[n+p]-u[n])*N1 : 0
          const c2 = u[n+p+1]-u[n+1] > 0 ? p/(u[n+p+1]-u[n+1])*N2 : 0
          const Nip = c1 - c2 
          list.push(Nip)
        }
      }
      NpMatrix.push(list)
    }
    Ntensor.push(NpMatrix)      
  }
  

  const Nmatrix = Ntensor[Ntensor.length-1]

  //zero padding left and right
  const N = Nmatrix.map(v=>{
    const tmp = i-degree
    const vv = tmp < 0 ?  v.slice(-tmp):
               i > m-1 ? v.slice(0,-i+m-1):
               v
    const prefix = tmp >0? [...Array(tmp)].fill(0): []
    const prefixLength = prefix.length
    const suffixLength = m-vv.length-prefixLength
    const suffix = suffixLength>0 ? [...Array(suffixLength)].fill(0) :[] 
    const list = [].concat(prefix, vv, suffix)
    return list
  }) 

  return N
}

const checkSchoenbergWhitneyCondition = (pointsLength, knotsLength, order) => {
  const flag = knotsLength - (pointsLength + order) === 0
  try{
    if(!flag){
      throw new RangeError("length of knots must be equal to x.length + degree + 1") 
    }
  }
  catch(e){
   console.log(e.name +" : " + e.message)
  }

  return flag
}


export const makeKnots = (num, order, type="openUniformKnots") => {
  // default knot vector is open uniform

  switch(type){
    default : {
      const knots =  [].concat(
          [...Array(order)].fill(0),
          [...Array(num-order)].map((v,i)=>(i+1)),
          [...Array(order)].fill(num-order+1)
        )
      return knots
    }
  }
}


const bsplineBasis = (knots, degree=3,  normalizedFlag=true) => {
  //Matrix(degree+1,  * knots.length - degree -1)
  // [
  //   [ bsplrine basis list] ,
  //   [ 1st derivertive of bsplrine basis list] ,
  //   [ 2nd derivertive of bsplrine basis list] ,
  //  ...
  //   [ degree-th derivertive of bsplrine basis list] ,
  // ]

  // default knot vector is open uniform
  const order = degree+1
  const min = knots[degree]
  const max = knots[knots.length-1-degree]

  if(normalizedFlag){
    return (t)=>{  // 0 <= t <=1
      const s = min + t * (max - min)
      const Nmatrix = makeNmatrix(knots, degree,  s)
      return Nmatrix
    } 
  }
  else{
    return (s)=>{  // knots[0] <= s <=knots[knots.length-1]
      const Nmatrix = makeNmatrix(knots, degree, s)
      return Nmatrix
    } 
  }
}

export const bspline = (points, degree=3, k) =>{
  // default knot vector is open uniform
  const num = points.length
  const order = degree + 1
  if(k){
    const pointsLength = points.length
    const knotsLength = k.length
    checkSchoenbergWhitneyCondition(pointsLength, knotsLength, order)
  }
  const knots = k || makeKnots(num, order, "openUniformKnots")
  const bNmatrix = bsplineBasis(knots, degree,  true)

  return (t, k=0)=>{  // 0 <= t <=1
    const Nmatrix = bNmatrix(t)
    const N = Nmatrix[k]
    const x = N.reduce((p, c, i)=>p+c*points[i][0],0)
    const y = N.reduce((p, c, i)=>p+c*points[i][1],0)
    return [x, y] 
  }
}

