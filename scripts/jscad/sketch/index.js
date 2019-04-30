import {Constraints} from "./class/constraints.js"
import * as solve from "../../sci/solve/index.mjs"


export const Sketch = class extends Constraints {
  constructor(elem){
    super(elem)
    this.tmp = null
    this.drawMode = null
    this.drawStartFlag = null
  }
  import(json){
    const figs = json.figs 
    const constraints = json.constraints
    const dimensions = json.dimensions
    figs.forEach(v=>this.addFig(v.id, v.type, v.parameters))
  }
  export(){
  }

  cancel(){
    if(this.tmp){
      if(this.drawStartFlag){
        this.setDrawStartFlag(false)
        this.tmp.draw("cancel")
      }
    }
    const draw = this.draw
    draw.off("nodeclick")
    draw.off("elementclick")
  }
  drawOff(){
    const fig = this.temp
    sketch.drawMode=null
    this.temp = null
    SVG.off(window,"mousemove.draw")
    this.draw.off("click.draw")
    if(fig){
      fig.forget("_paintHandler")
      fig.draw = ()=>{}
    }
    const draw = this.draw
    draw.off("nodeclick")
    draw.off("elementclick")
    console.log("drawOff")
  }

  setDrawStartFlag(flag){
    this.drawStartFlag = flag
  }
  getDrawStartFlag(flag){
    return this.drawStartFlag 
  }
  setTmp(fig){
    this.tmp = fig  
  }
  setDrawMode(mode){
    this.drawMode = mode  
  }

  addFig(type, parameters, idF){
    switch(type){
      case "line":{
        const fig = this.addLine(...parameters, idF)
        return fig
        break
      }
      case "arc":{
        const fig = this.addArc(...parameters, idF)
        return fig
        break
      }
      default:{
      }
    }
  }
  changeFig(idF, params){
    const fig = this.getFigFromId(idF) 
    const type = fig.data("idF").type
    switch(type){
      case "line":{
        this.changeLine(idF, ...params)
        break
      }
    }
  }
  addConstraint(type, source, target, idC){
    switch(type){
      case "coincident":{
        this.addCoincident(source, target, idC)
        break
      }
      case "horizontal":{
        this.addHorizontal(source, target, idC)
        break
      }
      case "vertical":{
        this.addVertical(source, target, idC)
        break
      }
      default:{
      }
    }
  }
  addDimension(type, source, target, value, idD){
    switch(type){
      case "horizontal":{
        this.addHorizontalD(source, target,value, idD)
        break
      }
      case "vertical":{
        this.addVerticalD(source, target,value, idD)
        break
      }
      default:{
      }
    }
  }
  solve(){
    const constraints = [...this.getConstraintMap().values()]
    const dimensions = [...this.getDimensionMap().values()]
    const figs = this.getFigMap()
    const figKeys = [...figs.keys()]
    const N = figKeys.length*4
    const constraintsMatrix = constraints.flatMap(v=>v.map(u=>this._makeMatrixColumn(u, N,figKeys)))
    const constraintsVector = constraints.flatMap(v=>v.map(u=>u.value))

    const dimensionsMatrix = dimensions.flatMap(v=>v.map(u=>this._makeMatrixColumn(u, N, figKeys)))
    const dimensionsVector = dimensions.flatMap(v=>v.map(u=>u.value))


    const initialParameters = [].concat(...this.getInitialParametersMap().values())
    const initialParametersValid = [].concat(...this.getInitialParametersValidMap().values())
    const initialParametersMatrix = initialParametersValid.map((v,i)=>!v?null:[...Array(N)].map((u,j)=>j==i?1:0)).filter(v=>v!==null)
    const initialParametersVector = initialParametersValid.map((v,i)=>!v?null:initialParameters[i]).filter(v=>v!==null)

    const geometryMatrix = [].concat(constraintsMatrix, dimensionsMatrix, initialParametersMatrix)
    const valueVector = [].concat(constraintsVector, dimensionsVector, initialParametersVector)

    console.log("M",geometryMatrix)
    console.log("V",valueVector)

    const sol = solve.linEqGauss(geometryMatrix, valueVector)

    figKeys.forEach((v,i)=>{
      const parameters = sol.slice(i*4, i*4+4)    
      this.changeFig(v, parameters)
    })

    const freedomDegree = this.getFreedomDegree()
    console.log("degree of feedom", freedomDegree)
  }
  _makeMatrixColumn(u, N, figKeys){ 
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
} 
