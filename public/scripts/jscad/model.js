import {view} from "./view.js"
import {importFiles} from "./FileReader.js"
import dxftosvg from '../dxftosvg/index.js'

/**********************************************/
/*                 model                      */
/**********************************************/

"use strict"


export const model = {
  draw: SVG('drawing').panZoom({zoomFactor:1.1}),
  editor:ace.edit('editor'),
  document:{
    click:{
      execute:function(){
        model.document.allCancel.execute()
      },
    },
    allCancel:{
      execute:function(){
        if(view.tempElement)view.tempElement.notSelected();
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
        model.draw.screen.svg("");
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
        const svg =  model.draw.screen.group().svg(svgString)
          .stroke({color:'blue',opacity: 1.0,width:1})
          .fill('none')
          .attr("stroke-linecap", "round")
          .attr("stroke-linejoin", "round")
        model.draw.screen.sheet.push(svg)
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
    draws:[],
    selected:[],
    temp: null,
    drawMode: null,
    drawModeFlag: false,
    drawFuncMap: null,
    cancelKey: function(e){
      console.log("cancelKey")
      if(e.keyCode ==27)model.drawMenuFunc.cancel()
    },
    cancel: function(){
      if(model.drawMenuFunc.temp){
        if(model.drawMenuFunc.drawModeFlag){
          model.drawMenuFunc.drawModeFlag = false
          model.drawMenuFunc.temp.draw("cancel")
        }
      }
    },
    drawOff: function(){
      const fig = model.drawMenuFunc.temp
      model.drawMenuFunc.drawMode=null
      model.drawMenuFunc.temp = null
      SVG.off(window,"mousemove.draw")
      model.draw.off("click.draw")
      if(fig){
        fig.forget("_paintHandler")
        fig.draw = ()=>{}
      }
      console.log("drawOff")
    },
    continuous: function(cllbackDraw){
      const fig = model.drawMenuFunc.temp
      fig.on("drawstart",(e)=>{
        console.log("drawstart",fig.type)
        model.drawMenuFunc.drawModeFlag = true
      })
      fig.on("drawstop",(e)=>{
        console.log("drawstop",fig.type)
        const func = model.drawMenuFunc.drawFuncMap
          .get(model.drawMenuFunc.drawMode)
        func && func()
        if(model.drawMenuFunc.drawModeFlag){
          model.drawMenuFunc.draws.push(fig)
          model.drawMenuFunc.addevent(fig)
        }
        model.drawMenuFunc.drawModeFlag = false
        console.log("callback",model.drawMenuFunc.drawMode)
      })
    },
    addevent:function(fig){
      fig.clone()
        .stroke({width:5.0, opacity:0.5,color:"yellow"})
        .click(function(e){
          if(!e.ctrlKey){
            model.drawMenuFunc.selected.forEach(selected=>{
              console.log("not keydown",e.ctrlKey)
              selected.attr("stroke",null)
            })
            model.drawMenuFunc.selected = []
          }
          fig.stroke({color:"red"})
          model.drawMenuFunc.selected.push(fig,this)
        })
    },
    line:{
      execute: function(){
        const fig = model.draw.screen.sheet[0].line().draw()
        model.drawMenuFunc.temp =fig 
        model.drawMenuFunc.drawMode ="line" 
        model.drawMenuFunc.continuous("line")
      },
    },
    polyline:{
      execute: function(){
        const fig = model.draw.screen.sheet[0].polyline().draw()
        model.drawMenuFunc.temp =fig 
        model.drawMenuFunc.continuous("polyline")
      },
    },
    circle: {
      execute: function(){
        const fig = model.draw.screen.sheet[0].circle().draw().fill("none")
        model.drawMenuFunc.temp =fig 
        model.drawMenuFunc.drawMode ="circle" 
        model.drawMenuFunc.continuous("circle")
      },
    },
    rectangle: {
      execute: function(){
        const fig = model.draw.screen.sheet[0].rect().draw().fill("none")
        model.drawMenuFunc.temp =fig 
        model.drawMenuFunc.drawMode ="rectangle" 
        model.drawMenuFunc.continuous("rectangle")
      },
    },
    setDrawFunc:{
      execute: function(){
        model.drawMenuFunc.drawFuncMap = new Map([
          ["line", model.drawMenuFunc.line.execute],
          ["polyline", model.drawMenuFunc.polyline.execute],
          ["circle", model.drawMenuFunc.circle.execute],
          ["rectangle", model.drawMenuFunc.rectangle.execute],
        ])
      },
    },
  },
  screenFunc:{
    setScreen: {
      execute:function(){
        const width =view.elements.drawing.getBoundingClientRect().width 
        const height = view.elements.drawing.getBoundingClientRect().height
        const draw = model.draw
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
        draw.screen.stroke({color:"blue",opacity: 1.0,width:1});
        draw.screen.sheet = [];
        draw.screen.sheet.push(draw.screen.group());
      }
    },
    resize: {
      execute: function(){
        model.draw
          .width(view.elements.drawing.getBoundingClientRect().width);
        model.draw
          .height(view.elements.drawing.getBoundingClientRect().height);
      },
    }, 
  },//end of screenFunc
  editorFunc:{
    setEditor:{
      execute: function(){
        model.editor.setKeyboardHandler("ace/keyboard/vim");
        model.editor.getSession().setMode("ace/mode/javascript");
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
              control.func.run.fire();
            }
            break;
          }
          //keydown ESC
          case 27:{
            console.log("ESC")
            model.document.allCancel.execute();
            if(model.drawMenuFunc.drawModeFlag){
              model.drawMenuFunc.cancel()
            }
            else{
              model.drawMenuFunc.drawOff()
            }
            break;
          }
          //keydown Del
          case 46:{
            model.drawMenuFunc.selected.forEach(selected=>{
              selected.remove()
            })
          }   
          default:
            break;
        }//end of switch
      },//end of execute
    },//end of keyDown
  },//end of keyFunc
}

