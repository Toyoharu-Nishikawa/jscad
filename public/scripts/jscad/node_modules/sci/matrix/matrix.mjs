import {sumList} from "../funcs/sum.mjs"

//vector
export const mulScalarVec=(a, x0)=>{
  const y=x0.map(x=>x*a)
  return y
}

export const addVec = (x0,x1)=>{
  const y= x0.map((a,i)=>a+x1[i]) 
  return y
}

export const subVec = (x0,x1)=>{
  const y= x0.map((a,i)=>a-x1[i]) 
  return y
}

export const absVec = (x0)=>{
  const a2 = x0.reduce((pre,current)=>pre+current**2,0) 
  const a = Math.sqrt(a2)
  return a
}

export const innerProductVec=(x0,x1)=>{
  const y = x0.reduce((pre,current,i)=>pre+current*x1[i],0) 
  return y
}

//matrix
export const unitMat = (n)=> [...Array(n)].map((v,i)=> 
  [...Array(n)].map((u,j)=>i===j?1:0))

export const mulMatMat= (A,B)=>{
  const BT = transpose(B)
  const C = A.map(
    column=>BT.map(
      row=>row.reduce(
        (pre,current,k)=>pre+current*column[k],0
      )
    )
  )
  return C 
}

export const transpose = A=>A[0].map((k,i)=>A.map((v)=>v[i]))

export const mulScalarMat=(a, A)=>{
  const B=A.map(columns=>columns.map(x=>a*x))
  return B 
}

export const addMatMat = (A,B)=>{
  const C= A.map((columns,i)=>columns.map((a,j)=>a+B[i][j])) 
  return C 
}

export const subMatMat = (A,B)=>{
  const C= A.map((columns,i)=>columns.map((a,j)=>a-B[i][j])) 
  return C 
}

export const directSum = list =>{
  const cols = list.map(v=>v.length)  
  const rows = list.map(v=>v[0].length)  
      
  const colSum = sumList(cols)
  const rowSum = sumList(rows)
  const colTotal = colSum[colSum.length-1]
  const rowTotal = rowSum[rowSum.length-1]
  const matrix = [...Array(colTotal)].map((v,i)=>
    [...Array(rowTotal)].map((u,j)=>{
      const m = colSum.reduce((p,c,k)=>i<c?p:k+1,0)
      const n = rowSum.reduce((p,c,k)=>j<c?p:k+1,0)
      if(m!==n){
        return 0
      }
      else{
        const i0 = m >0 ? colSum[m-1] : 0
        const j0 = n >0 ? rowSum[n-1] : 0
        const A = list[m]  
        const value = A[i-i0][j-j0]  
        return value 
      }
    })
  )
  return matrix
}


export const invMat = (A)=>{
  let temp, div, unko, sum;
  const nrc = A.length
  const m = A.map(a=>[].concat(a))
  const minv =  unitMat(nrc)
  
  for (let i=0;i<nrc;i++){
    for(let j=i+1;j<nrc;j++){ 
      if(m[i][i]*m[i][i]<m[j][i]*m[j][i]){
        for(let k=0;k<nrc;k++){
          temp = m[i][k];
          m[i][k] = m[j][k];
          m[j][k] = temp;
          temp = minv[i][k];
          minv[i][k] = minv[j][k];
          minv[j][k] = temp;
        }
      }
    }
    div = m[i][i];
    for(let j=0;j<nrc;j++){
      m[i][j] /= div;
      minv[i][j] /= div;
    }
    for(let j=0;j<nrc;j++){ 
      if(j!=i){
        unko = m[j][i];
        for(let k=0;k<nrc;k++){
          m[j][k] -= unko*m[i][k];
          minv[j][k] -= unko*minv[i][k];
        }
      }
    }
  }
  return minv
}

//matrix and vector
export const mulMatVec = (A,u)=>{
  const v = A.map(column=>column.reduce((pre,current,i)=>pre+current*u[i],0))
  return v
}
