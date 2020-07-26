
export const DataManager = class {
  constructor(){
    this.MAP = new Map
  }
  addData(id, obj){
    this.MAP.set(id, obj)
  }
  removeData(id){
    this.MAP.delete(id)
  }

  hasData(id){
    return this.MAP.has(id)
  }
  getMap(){
    return this.MAP
  }
  getValues(){
    return [...this.MAP.values()]
  }
  getKeys(){
    return [...this.MAP.keys()]
  }
  getDataFromId(id){
    return this.MAP.get(id)
  }
}

export const countUpDataManager = class extends DataManager {
  constructor(){
    super()
    this.id = -1
  }
  getId(){
    this.id++
    const id = this.id
    this.addData(id, null)
    return id
  }
  getCurrentId(){
    return this.id 
  }
}
  

export const SelectedData = class {
  constructor(){
    this.SET = new Set()
  }
  addData(data){
    this.SET.add(data) 
    return this
  }
  getArray(){
    return [...this.SET.values()]
  }
  clear(){
    this.SET.clear()
    return this
  }
  counts(){
    return this.SET.size
  }
  unselectAll(){
    this.SET.forEach(selected=>{
      selected.attr("stroke",null)
      .attr("fill",null)
      selected.data("isSelected",null)
    })
    this.clear()
  }
}

export const ModelObj = class {
  constructor(){
    this.temp = null
    this.mode = null
    this.startFlag = false
  }
  setStartFlag(flag){
    this.startFlag = flag
  }
  getStartFlag(flag){
    return this.startFlag 
  }
  setTemp(fig){
    this.temp = fig  
  }
  getTemp(){
    return this.temp 
  }
  setMode(mode){
    this.mode = mode  
  }
  getMode(mode){
    this.mode = mode  
  }
}


export const  freedomMap = new Map([ 
  ["point", 2],
  ["line", 4],
  ["arc", 5],
  ["circle", 3],
])

export const Degrees = class{
  constructor(ini){
    this.degree = ini ==undefined ? 0 :
       freedomMap.has(ini) ? freedomMap.get(ini):
       typeof ini === "number"  ? ini :
       0 
  }
  increase(num){
    this.degree += num   
  }
  decrease(num){
    this.degree -= num   
  }
  get(num){
    return this.degree    
  }
}
