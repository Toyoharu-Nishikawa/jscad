export const linEqGauss = (A, Va) =>{
  const nrc = Va.length

  const va = [].concat(Va)
  const m = A.map(a=>[].concat(a))
  const vx = [...Array(nrc)].fill(0)

  for (let i=0;i<nrc;i++){
    // ピボット選択（初項の絶対値が最大の行を一番上に持ってくる
    const col = m.slice(i,nrc).map(v=>Math.abs(v[i])) //i行目以降のi列絶値の配列
    const j = col.indexOf(Math.max(...col))+i //最大の要素の列番号
    if(j>-1 && i !==j){
      const tempV = va[i]
      const tempM = m[i]
      va[i] = va[j]
      va[j] = tempV
      m[i]  = m[j]
      m[j]  = tempM 
    }
   // i行目を1/m[i][i]倍 
    const div = m[i][i];
    va[i] /=div
    for(let j=i;j<nrc;j++){
      m[i][j] /= div
    }
    // j行目からi行目のm[j][i]倍を引く 
    for(let j=i+1;j<nrc;j++){ 
      const p = m[j][i]
      va[j] -= p*va[i]
      for(let k=i;k<nrc;k++)
        m[j][k] -= p*m[i][k]
    }
  }
  // 後退代入により解を求める 
  vx[nrc-1] = va[nrc-1];
  for (let j=2;j<=nrc;j++){
    let sum = 0
    for(let i = nrc-j+1;i<nrc;i++){
      sum += vx[i]*m[nrc-j][i]
    }
    vx[nrc-j] = va[nrc-j] - sum
  }
  
  return vx
}

export const LUDecomposition = (A, pivotFlag=true) =>{
  const nrc = A.length

  const m = A.map(a=>[].concat(a))
  const L = [...Array(nrc)].map(v=>[...Array(nrc)].fill(0))
  const P = [...Array(nrc)].map((v,i)=>i)

  for (let i=0;i<nrc;i++){
    if(pivotFlag){
      // ピボット選択（初項の絶対値が最大の行を一番上に持ってくる
      const col = m.slice(i,nrc).map(v=>Math.abs(v[i])) //i行目以降のi列絶値の配列
      const n = col.indexOf(Math.max(...col))+i //最大の要素の列番号
      
      if(n>-1 && i !==n){
        const tempP = P[i]
        const tempM = m[i]
        const tempL = L[i]
        P[i] = P[n]
        P[n] = tempP
        m[i] = m[n]
        m[n] = tempM 
        L[i] = L[n]
        L[n] = tempL 
      }
    }
    // j行目からi行目のm[j][i]倍を引く 
    for(let j=i+1;j<nrc;j++){ 
      const p = m[j][i]/m[i][i]
      L[j][i] = p
      for(let k=i;k<nrc;k++)
        m[j][k] -= p*m[i][k]
    }
  }
  for(let i=0;i<nrc;i++){
    L[i][i]=1
  }
  return {
    L: L,
    U: m,
    P: P,
  } 
}

export const LUSolve = (L,U,P,Va) =>{
  const nrc = Va.length
  const y = [...Array(nrc)].fill(0)
  const x = [...Array(nrc)].fill(0)
  const b = P.map((v,i)=>Va[v]) 
  //前進代入
  for(let i=0;i<nrc;i++){
    let sum = 0 
    for(let j=0;j<i;j++){
      sum  += L[i][j]*y[j]  
    }
    y[i] = (b[i] - sum)/L[i][i]
  } 
  //後進代入
  x[nrc-1] = y[nrc-1]/U[nrc-1][nrc-1]
  for(let j=2;j<=nrc;j++){
    let sum = 0
    for(let i = nrc-j+1;i<nrc;i++){
      sum += x[i]*U[nrc-j][i]
    }
    x[nrc-j] = (y[nrc-j] - sum)/U[nrc-j][nrc-j]
  }
  return x
} 

export const modifiedCholeskyDecomposition =(A)=>{
  const nrc = A.length
 
  const d = [...Array(nrc)].fill(0)
  const L = [...Array(nrc)].map((v,i)=>[...Array(nrc)].map((u,j)=>i==j?1:0))
  
  d[0] = A[0][0]
  for(let i=1;i<nrc;i++){
    for(let j=0;j<i;j++){
      let s = 0
      for(let k=0;k<j;k++){
        s += L[i][k]*L[j][k]*d[k] 
      }
      L[i][j] = (A[i][j]-s)/d[j]
    } 
    let t = 0
    for(let k=0;k<i;k++){
      t += L[i][k]**2*d[k]
    }
    d[i]=A[i][i]-t
  }
  return {
    L: L,
    D: d,
  }
}

export const modifiedCholeskySolve =(L,D,Va)=>{
  const DLT = L.map((v,i,arr)=>v.map((u,j)=>arr[j][i]*D[i]))  
  const P = Va.map((v,i)=>i)
  const x = LUSolve(L,DLT,P,Va)
  return x
}


