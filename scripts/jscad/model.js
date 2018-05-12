import {view} from "./view.js"
import {importFiles} from "./FileReader.js"
import dxftosvg from '../dxftosvg/index.js'

/**********************************************/
/*                 model                      */
/**********************************************/

"use strict"


export const model = {
  sketch: {
    draw: SVG('drawing').panZoom({zoomFactor:1.1}),
    elements:[],
    selected:[],
    selectedClone:[],
    resizeFig:[],
    resizeFigClone:[],
    temp: null,
    drawMode: null,
    drawModeFlag: false,
    resizeMode: false,
  },
  editor:ace.edit('editor'),
  document:{
    click:{
      execute:function(e){
        model.document.allCancel.execute(e)
      },
    },
    allCancel:{
      execute:function(e){
        if(view.tempElement)view.tempElement.notSelected()
        if(!e.ctrlKey)model.drawMenuFunc.unselectAll()
        view.tempElement = null;
        model.mainMenu.hover.flag = false;
      },
    },
  },
  mainMenu:{
    click: {
      execute: function(e){
        const currentElement = e.currentTarget;
        if(currentElement != view.tempElement ){
          if(view.tempElement)view.tempElement.notSelected();
          currentElement.selected();
          view.tempElement = currentElement;
          model.mainMenu.hover.flag = true;
        }
      },
    },
    hover:{
      flag: false,
      execute: function(e){
        if(this.flag)model.mainMenu.click.execute(e)
      },
    },
  },
  mainMenuFunc:{
    new:{
      execute:function(){
        console.log("new file");
        model.sketch.draw.screen.svg("");
      },
    },
    import:{
      execute:function(elem){
        const read = async ()=>{
          const fileList = await  importFiles(elem)
          fileList.map(model.mainMenuFunc.import.convertToSvg)
            .forEach(model.mainMenuFunc.import.addSvg)
          model.document.allCancel.execute()
        }
        read()
      },//end of execute
      removeSvgTag:function (fileData){
        return fileData.replace(/<svg.*>|<\/svg>/g,"");
      },//end of removeSvgTag
      addSvg: function (svgString){
        const svg =  model.sketch.draw.screen.group().svg(svgString)
          .stroke({color:'blue',opacity: 1.0,width:1})
          .fill('none')
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
        model.sketch.draw.screen.sheet.push(svg)
      },//end of addSvg
      convertToSvg: function(file){
        switch (file.ext) {
          case 'dxf':{
            return dxftosvg(file.text)
            break
          }
          case 'svg':{
            return model.mainMenuFunc.import.removeSvgTag(file.text)
            break
          }
          default:{
            break
          }
        }
      },//end of convertToSvg
    },//end of import
  },//end of mainMenuFunc
  toolBarFunc:{
    run:{
      execute:function(){
        const code = model.editor.getValue();
        new Function(code)()
      }
    }
  },
  drawMenu:{
    click:{
      execute:function(e){
        const currentElement = e.currentTarget;
        if(currentElement != view.elements.activeDrawElement){
          if(view.elements.activeDrawElement){
              view.elements.activeDrawElement.notSelected();
          }
          currentElement.selected();
          view.elements.activeDrawElement = currentElement;
        }
      },
    },
  },
  drawMenuFunc: {
    cancelKey: function(e){
      console.log("cancelKey")
      if(e.keyCode ==27)model.drawMenuFunc.cancel()
    },
    cancel: function(){
      if(model.sketch.temp){
        if(model.sketch.drawModeFlag){
          model.sketch.drawModeFlag = false
          model.sketch.temp.draw("cancel")
        }
      }
    },
    drawOff: function(){
      const fig = model.sketch.temp
      model.sketch.drawMode=null
      model.sketch.temp = null
      SVG.off(window,"mousemove.draw")
      model.sketch.draw.off("click.draw")
      if(fig){
        fig.forget("_paintHandler")
        fig.draw = ()=>{}
      }
      console.log("drawOff")
    },
    continuous: function(callback){
      const fig = model.sketch.temp
      fig.on("drawstart",(e)=>{
        console.log("drawstart",fig.type)
        model.sketch.drawModeFlag = true
      })
      fig.on("drawstop",(e)=>{
        console.log("drawstop",fig.type)
        callback && callback()
        if(model.sketch.drawModeFlag){
          model.sketch.elements.push(fig)
          model.drawMenuFunc.addevent(fig)
        }
        model.sketch.drawModeFlag = false
        console.log("callback",model.sketch.drawMode)
      })
    },
    addevent:function(fig){
      fig.clone()
        .stroke({width:5.0, opacity:0.5,color:"yellow"})
        .click(function(e){
          e.stopPropagation()
          if(model.sketch.resizeMode){
            fig.selectize({deepSelect:true})
              .resize()
            model.sketch.resizeFig.push(fig)
            model.sketch.resizeFigClone.push(this)
          }
          else{
            if(!e.ctrlKey){
             model.drawMenuFunc.unselectAll(e)
            }
            fig.stroke({color:"red"})
            model.sketch.selected.push(fig)
            model.sketch.selectedClone.push(this)
          }
        })
    },
    unselectAll:function(){
      model.sketch.selected.forEach(selected=>{
        selected.attr("stroke",null)
      })
      model.sketch.selected = []
      model.sketch.selectedClone = []
    },
    line:{
      execute: function(){
        const fig = model.sketch.draw.screen.sheet[0].line().draw()
        model.sketch.temp =fig 
        model.sketch.drawMode ="line" 
        model.drawMenuFunc.continuous(model.drawMenuFunc.line.execute)
      },
    },
    polyline:{
      execute: function(){
        const fig = model.sketch.draw.screen.sheet[0].polyline().draw()
        model.sketch.temp =fig 
        model.drawMenuFunc.continuous(model.drawMenuFunc.polyline.execute)
      },
    },
    circle: {
      execute: function(){
        const fig = model.sketch.draw.screen.sheet[0].circle().draw().fill("none")
        model.sketch.temp =fig 
        model.sketch.drawMode ="circle" 
        model.drawMenuFunc.continuous(model.drawMenuFunc.circle.execute)
      },
    },
    rectangle: {
      execute: function(){
        const fig = model.sketch.draw.screen.sheet[0].rect().draw().fill("none")
        model.sketch.temp =fig 
        model.sketch.drawMode ="rectangle" 
        model.drawMenuFunc.continuous(model.drawMenuFunc.rectangle.execute)
      },
    },
    resize: {
      execute:function(){
        model.sketch.resizeMode=true
      },
    }
  },
  screenFunc:{
    setScreen: {
      execute:function(){
        const width =view.elements.drawing.getBoundingClientRect().width 
        const height = view.elements.drawing.getBoundingClientRect().height
        const draw = model.sketch.draw
        draw.width(width);
        draw.height(height);
        draw.attr('preserveAspectRatio', 'xMinYMin slice');
        draw.style( {
          border: '1px solid #F5F5F5',
          margin:0,
          padding:0,
          background:'linear-gradient(to bottom, white, RoyalBlue )'
        });
        draw.viewbox(0, 0, width,height).flip('y');
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
        draw.screen.stroke({color:"blue",opacity: 1.0,width:1})
        draw.screen.sheet = [];
        draw.screen.sheet.push(draw.screen.group());

        draw.mousemove(function(e){
          const point = this.point()
          const coord = {
            x: point.x+e.clientX/draw.zoom(),
            y: point.y-e.clientY/draw.zoom()
          }
          view.elements.coordinate.textContent=
           ` x: ${(coord.x*100+0.5|0)/100}, y:${(coord.y*100+0.5|0)/100}`
        })
        draw.click(function(e){
          const point = this.point(e.screenX, e.screenY)
          console.log(point,e.screenX, e.screenY)
        })
      }
    },
    resize: {
      execute: function(){
        const width = view.elements.body.getBoundingClientRect().width
          - view.elements.aside.getBoundingClientRect().width
        model.sketch.draw.width(width);
        model.sketch.draw
          .height(view.elements.drawing.getBoundingClientRect().height);
      },
    }, 
  },//end of screenFunc
  slidebar:{
    slide:{
      originY:null,
      drawHeight:null,
      mouseDown: function(e){
        this.originY =  e.clientY
        this.drawHeight = view.elements.drawing.clientHeight
        view.elements.main.onmousemove = this.mouseMove
      },
      mouseUp: function(e){
        this.originY =  null
        view.elements.main.onmousemove = null 
      },
      mouseMove: function(e){
        const currentY =  e.clientY
        const originY = model.slidebar.slide.originY
        const drawHeight = model.slidebar.slide.drawHeight
        const deltaY = currentY - originY
        const newHeight =  drawHeight + deltaY
        const text = `${newHeight}px`
        view.elements.drawing.style.height = text
        model.screenFunc.resize.execute()
        model.editor.resize()
       // window.dispatchEvent(new Event('resize'))
      },
    }
  },
  editorFunc:{
    setEditor:{
      execute: function(){
        model.editor.setKeyboardHandler("ace/keyboard/vim");
        model.editor.getSession().setMode("ace/mode/javascript");
        model.editor.on("blur", (e, editor)=> {
          if(document.activeElement != editor.textInput.getElement()){
            editor.selection.clearSelection(); 
          }
        })
      },
    },
    resize: {
      execute:function(){
      },
    },
  },//end of editorFunc
  keyFunc:{
    keyDown:{
      execute: function(e){
        switch(e.keyCode){
          //keydown shift + Enter
          case 13:{
            if(e.shiftKey){
              console.log("shift+Enter")
              model.toolBarFunc.run.execute()
            }
            break;
          }
          //keydown ESC
          case 27:{
            console.log("ESC")
            model.document.allCancel.execute(e);
            if(document.activeElement != model.editor.textInput.getElement()){
              model.editor.selection.clearSelection(); 
            }
            if(model.sketch.drawModeFlag){
              model.drawMenuFunc.cancel()
            }
            else{
              model.drawMenuFunc.drawOff()
            }
            model.drawMenuFunc.unselectAll(e)
            if(model.sketch.resizeMode){
              model.sketch.resizeFig.forEach((resizeFig,i)=>{
                resizeFig.selectize(false,{deepSelect:true}).resize("stop")
                model.sketch.resizeFigClone[i].attr(
                  resizeFig.attr() 
                )
              })
              model.sketch.resizeFig=[]
              model.sketch.resizeFigClone=[]
              model.sketch.resizeMode=false
            }
            break;
          }
          //keydown Del
          case 46:{
            model.sketch.selected.forEach(selected=>{
              selected.remove()
            })
            model.sketch.selectedClone.forEach(selectedClone=>{
              selectedClone.remove()
            })
          }   
          default:
            break;
        }//end of switch
      },//end of execute
    },//end of keyDown
  },//end of keyFunc
}

