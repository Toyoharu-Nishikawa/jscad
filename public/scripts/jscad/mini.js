"use strict"

export const jscad = {
  setup: function(element, width,height){
    setDOM(element)
    setCSS(width, height)
    const coordinateDOM = document.querySelector("#minijscad-footer > small:nth-child(2)")
    const elWidth = document.getElementById("minijscad-main").getBoundingClientRect().width
    const elHeight = document.getElementById("minijscad-main").getBoundingClientRect().height

    const draw = SVG("minijscad-main").panZoom({zoomFactor:1.1})
    draw.width(elWidth-2)
    draw.height(elHeight-2)
    draw.attr('preserveAspectRatio', 'xMinYMin slice')
    draw.style( {
      border: '1px solid #F5F5F5',
      margin:0,
      padding:0,
      background:'linear-gradient(to bottom, white, RoyalBlue )'
    });
    draw.viewbox(0, 0, elWidth-2, elHeight-2).flip('y')
    draw.background = draw.group();
    draw.background.line(-1000, 0, 1000, 0)
      .fill("none")
      .stroke({color:"black",opacity: 1.0,width:1})
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke-dasharray","5 5");
    draw.background.line(0, -1000, 0, 1000)
      .fill("none")
      .stroke({color:"black",opacity: 1.0,width:1})
      .attr("vector-effect", "non-scaling-stroke")
      .attr("stroke-dasharray","5 5");
    
    draw.screen=draw.group();
    draw.screen
      .stroke({color:"black",opacity: 1.0,width:1.5})
    draw.screen.sheet = []
    draw.screen.sheet.push(draw.screen.group())

    draw.mousemove(function(e){
      const point = this.point()
      const coord = {
        x: point.x+e.clientX/draw.zoom(),
        y: point.y-e.clientY/draw.zoom()
      }
      coordinateDOM.textContent=` x: ${(coord.x*100+0.5|0)/100}, y:${(coord.y*100+0.5|0)/100}`
    })

    return draw 
  }

}

const setDOM = (element)=>{
 const elementDOM = (element instanceof HTMLElement) ? element: document.getElementById(element) 
 const minijscadFrame = document.createElement("div")
 const minijscadTitle = document.createElement("div")
 const minijscadSidebar = document.createElement("div")
 const ul = document.createElement("ul")
 const liM = document.createElement("li")
 const liA = document.createElement("li")
 const liS = document.createElement("li")
 const minijscadMain = document.createElement("div")
 const minijscadFooter = document.createElement("div")
 const minijscadCopyright = document.createElement("small")
 const minijscadCoordinate = document.createElement("small")

 minijscadFrame.id = "minijscad-frame"
 minijscadTitle.id = "minijscad-title"
 minijscadSidebar.id = "minijscad-sidebar"
 minijscadMain.id = "minijscad-main"
 minijscadFooter.id = "minijscad-footer"

 minijscadTitle.textContent= "mini jscad"
 liM.textContent= "M"
 liA.textContent= "A"
 liS.textContent= "S"

 minijscadCoordinate.textContent = "x: 0.00 ,y: 0.00"

 ul.appendChild(liM)
 ul.appendChild(liA)
 ul.appendChild(liS)
 minijscadSidebar.appendChild(ul)
 minijscadFrame.appendChild(minijscadTitle)
 minijscadFrame.appendChild(minijscadSidebar)
 minijscadFrame.appendChild(minijscadMain)
 minijscadFooter.appendChild(minijscadCopyright)
 minijscadFooter.appendChild(minijscadCoordinate)
 minijscadFrame.appendChild(minijscadFooter)
 elementDOM.appendChild(minijscadFrame)

}

const setCSS = (width ,height)=>{
    const style = document.createElement("style")
    style.id = "minijscad-style"
    style.type = "text/css"
    document.head.appendChild(style)

    style.sheet.insertRule(`
    #minijscad-frame {
      width: ${width}px;
      height: ${height}px;
      display: grid;
      grid-template-columns: 100px ${width-100}px;
      grid-template-rows: 20px ${height-40}px 20px;
      outline: 2px solid #708090;
      padding: 0;
      margin: 0;
    }`,0) 

    style.sheet.insertRule(`
    #minijscad-title {
      grid-row: 1 / 2;
      grid-column: 1 / 3;
      background: #d9dfe1;
      color:#3e5358;
      padding: 0;
      margin: 0;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      padding: 0;
      margin: 0;

      background: #F8F8F8;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar > ul {
      display: grid;
      grid-template-rows: 50px 50px;
      grid-template-columns: 50px 50px;
      width:100%;
      padding: 0;
      margin: 0;
      list-style:none;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar > ul > li{
      border:1px solid #3e5358;
      color:  #3e5358;
      border-radius: 6px 6px 6px 6px;
      margin: 1px;
      text-align:center;
      vertical-align:middle;
      line-height:50px;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar > ul > li:hover{
      background: #F0FFF0;
      border: 1px solid #7FFFD4;
      border-radius: 6px 6px 6px 6px;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar > ul > li:first-child{
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar > ul > li:nth-child(2){
      grid-row: 1 / 2;
      grid-column: 2 / 3;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-sidebar > ul > li:nth-child(3){
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-main {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      padding: 0;
      margin: 0;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-footer {
      grid-row: 3 / 4;
      grid-column: 1 / 3;
      padding: 0;
      margin: 0;
      border-top: 1px solid #708090;
      background: #d9dfe1;
      display: flex;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-footer > small:first-child {
      flex: 0 0 65%; 
      text-align: center;
      border-right: 1px solid #708090;
    }`,style.sheet.cssRules.length)

    style.sheet.insertRule(`
    #minijscad-footer > small:nth-child(2) {
      flex: 1 0 auto; 
      padding: 0 0 0 10px;
    }`,style.sheet.cssRules.length)
}
