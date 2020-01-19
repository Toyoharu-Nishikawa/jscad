import {Sketch} from "./sketch/index.js"
import {version} from "./version.js"

"use strict"
export {Drawing} from "./dxf-writer/Drawing.js"

export const MiniJscad = class{
  constructor(element, width=300, height=300, eventFlag=false){
    this.version = version
    this.sketch = null
    this.element = element
    this.setup(element, width, height, eventFlag)
    return this
  }
  resize(width, height){
    const element = this.element
    const sketch = this.sketch
    const minijscadFrame = document.getElementById(element+"-minijscad-frame")
    minijscadFrame.style.width = String(width)+"px"
    minijscadFrame.style.height = String(height)+"px"

    const elWidth = width// -100
    const elHeight = height-40
    const sketchWidth = elWidth//-2
    const sketchHeight = elHeight//-6

    sketch.resize(sketchWidth, sketchHeight)
    return this
  }
  hideEventObject(){
    this.sketch.hideEventObject()
    return this
  }
  setup(element="drawing", width=300, height=300, eventFlag=false){
 
    setDOM(element)
    setCSS(element,width, height)
    const coordinateDOM = document.querySelector("#"+element +"-minijscad-footer > small:nth-child(2)")
    const minijscadFrame = document.getElementById(element+"-minijscad-frame")
    const main = document.getElementById(element+"-minijscad-main")
    const elWidth = main.getBoundingClientRect().width || (width -100)
    //const elHeight = main.getBoundingClientRect().height || (height-40)
    const elHeight = height-40

    const sketch = new Sketch(element+"-minijscad-main")
    const sketchWidth = elWidth//-2
    const sketchHeight = elHeight//-6
    console.log("height",height, "elHeight", elHeight,"sketchHeight", sketchHeight)
    sketch.setScreenSize(sketchWidth, sketchHeight)
    if(!eventFlag){
      sketch.invalidEvent()
    }

    main.addEventListener("sketch.mouse.move",(e)=>{
      const coord = e.detail
      coordinateDOM.textContent=` x: ${(coord.x*100+0.5|0)/100}, y:${(coord.y*100+0.5|0)/100}`
    })

    this.sketch = sketch
    return this
  }
}

const setDOM = (element)=>{
 const elementDOM = (element instanceof HTMLElement) ? element: document.getElementById(element) 
 const minijscadFrame = document.createElement("div")
 const minijscadTitle = document.createElement("div")
 const minijscadMiddle = document.createElement("div")
 const minijscadSidebar = document.createElement("div")
 const ul = document.createElement("ul")
 const liM = document.createElement("li")
 const liA = document.createElement("li")
 const liS = document.createElement("li")
 const minijscadMain = document.createElement("div")
 const minijscadFooter = document.createElement("div")
 const minijscadCopyright = document.createElement("small")
 const minijscadCoordinate = document.createElement("small")

 minijscadFrame.id = element+"-minijscad-frame"
 minijscadTitle.id = element+"-minijscad-title"
 minijscadMiddle.id = element+"-minijscad-middle"
 minijscadSidebar.id = element+"-minijscad-sidebar"
 minijscadMain.id = element+"-minijscad-main"
 minijscadFooter.id = element+"-minijscad-footer"

 minijscadTitle.textContent= "mini jscad"
 liM.textContent= "M"
 liA.textContent= "A"
 liS.textContent= "S"

 minijscadCoordinate.textContent = "x: 0.00 ,y: 0.00"

 ul.appendChild(liM)
 ul.appendChild(liA)
 ul.appendChild(liS)

 minijscadSidebar.appendChild(ul)

 minijscadMiddle.appendChild(minijscadSidebar)
 minijscadMiddle.appendChild(minijscadMain)

 minijscadFooter.appendChild(minijscadCopyright)
 minijscadFooter.appendChild(minijscadCoordinate)

 minijscadFrame.appendChild(minijscadTitle)
 minijscadFrame.appendChild(minijscadMiddle)
 minijscadFrame.appendChild(minijscadFooter)
 elementDOM.appendChild(minijscadFrame)

}

const setCSS = (element, width ,height)=>{
    const style = document.createElement("style")
    style.id = "minijscad-style"
    style.type = "text/css"
    document.head.appendChild(style)

    style.sheet.insertRule(`
    #${element}-minijscad-main  line {
      vector-effect: non-scaling-stroke; 
    }`,0) 

    style.sheet.insertRule(`
    #${element}-minijscad-main  circle {
      vector-effect: non-scaling-stroke; 
    }`,0) 

    style.sheet.insertRule(`
    #${element}-minijscad-main  path {
      vector-effect: non-scaling-stroke; 
    }`,0) 

    style.sheet.insertRule(`
    #${element}-minijscad-main  polyline {
      vector-effect: non-scaling-stroke; 
    }`,0) 


    style.sheet.insertRule(`
    #${element}-minijscad-frame {
      width: ${width}px;
      height: ${height}px;
      display:flex;
      flex-direction:column;
      outline: 2px solid #708090;
      padding: 0;
      margin: 0;
    }`,0) 

    style.sheet.insertRule(`
    #${element}-minijscad-title {
      height: 20px;
      background: #d9dfe1;
      color:#3e5358;
      padding: 0;
      margin: 0;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-middle {
      display:flex;
      flex:1;
      padding: 0;
      margin: 0;

    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar {
      display: none;
      width: 100px;
      padding: 0;
      margin: 0;
      background: #F8F8F8;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar > ul {
      display: grid;
      grid-template-rows: 50px 50px;
      grid-template-columns: 50px 50px;
      width:100%;
      padding: 0;
      margin: 0;
      list-style:none;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar > ul > li{
      border:1px solid #3e5358;
      color:  #3e5358;
      border-radius: 6px 6px 6px 6px;
      margin: 1px;
      text-align:center;
      vertical-align:middle;
      line-height:50px;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar > ul > li:hover{
      background: #F0FFF0;
      border: 1px solid #7FFFD4;
      border-radius: 6px 6px 6px 6px;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar > ul > li:first-child{
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar > ul > li:nth-child(2){
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-sidebar > ul > li:nth-child(3){
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-main {
      width: ${width}px;
      height: ${height-40}px;
      
      padding: 0;
      margin: 0;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-footer {
      height:20px;
      padding: 0;
      margin: 0;
      border-top: 1px solid #708090;
      background: #d9dfe1;
      display: flex;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-footer > small:first-child {
      flex: 0 0 65%; 
      text-align: center;
      border-right: 1px solid #708090;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #${element}-minijscad-footer > small:nth-child(2) {
      flex: 1 0 auto; 
      padding: 0 0 0 10px;
      margin: 0;
    }`,style.sheet.cssRules.length)
}
