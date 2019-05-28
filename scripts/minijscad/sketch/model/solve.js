
export const solve=()=>{
  const constraints = [...this.constraintsData.getValues()]
  const dimensions = [...this.dimensionsData.getValues()]
  const figsKeys = this.figsData.getKeys()
  const N = figsKeys.length*4
  const constraintsMatrix = constraints.flatMap(v=>v.map(u=>this._makeMatrixColumn(u, N,figsKeys)))
  const constraintsVector = constraints.flatMap(v=>v.map(u=>u.value))

  const dimensionsMatrix = dimensions.flatMap(v=>v.map(u=>this._makeMatrixColumn(u, N, figsKeys)))
  const dimensionsVector = dimensions.flatMap(v=>v.map(u=>u.value))


  const initialParameters = [].concat(...this.initialParameters.param.getValues())
  const initialParametersValid = [].concat(...this.initialParameters.valid.getValues())
  const initialParametersMatrix = initialParametersValid.map((v,i)=>!v?null:[...Array(N)].map((u,j)=>j==i?1:0)).filter(v=>v!==null)
  const initialParametersVector = initialParametersValid.map((v,i)=>!v?null:initialParameters[i]).filter(v=>v!==null)

  const geometryMatrix = [].concat(constraintsMatrix, dimensionsMatrix, initialParametersMatrix)
  const valueVector = [].concat(constraintsVector, dimensionsVector, initialParametersVector)

  console.log("M",geometryMatrix)
  console.log("V",valueVector)

  const sol = solve.linEqGauss(geometryMatrix, valueVector)

  figsKeys.forEach((v,i)=>{
    const parameters = sol.slice(i*4, i*4+4)    
    this.changeFig(v, parameters)
  })

  const freedomDegree = this.degreesOfFreedom.get()
  console.log("degrees of feedom", freedomDegree)
}

const  _makeMatrixColumn=(u, N, figKeys)=>{ 
  const s = u.s
  const t = u.t
  const sId = u.sId
  const tId = u.tId

  const ss = sId === "YAXIS" ? -1 :
             sId === "XAXIS" ? -1 :
             sId === "ORIGIN"? -1 :
             figKeys.indexOf(sId)

  const tt = tId === "YAXIS" ? -1 :
             tId === "XAXIS" ? -1 :
             tId === "ORIGIN"? -1 :
             figKeys.indexOf(tId)

  const list = [...Array(N)].fill(0)
  if(ss>-1){
    const sn = ss*4 + s
    list[sn] = -1
  }
 if(tt>-1){
    const tn = tt*4 + t 
    list[tn] = 1
  }
  return list
}

