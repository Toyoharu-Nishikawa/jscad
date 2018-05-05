import {view} from "./view.js"
import {model} from "./model.js"

/******************************************************/
/*                control                             */
/******************************************************/
"use strict"

export const control = {
  document:{
    click: {
      execute:function(e){
        e.stopPropagation()
        model.document.click.execute(e);
      },
      add:function(){
        document.onclick = this.execute
      },
    },
  },
  mainMenu: {
    click: {
      execute:function(e){
        e.stopPropagation()
        model.mainMenu.click.execute(e);
      },
      add: function(){
        view.elements.mainMenu.forEach(any =>{
          any.notSelected = ()=>{
            any.children[1].style.display="none"
          }
          any.selected = ()=>{
            any.children[1].style.display="block"
          }; //thisはイベント発生した要素
          any.name = any.firstElementChild.innerHTML
          any.onclick = this.execute
        })
      },
    },
    hover:{
      execute: function(e){
        model.mainMenu.hover.execute(e)
      },
      add: function(){
        view.elements.mainMenu.forEach(any=>{
          any.onmouseover = this.execute 
        })
      },
    },
  },
  mainMenuFunc: {
    new: {
      execute: function(e){
        model.mainMenuFunc.new.execute()
      },
      add:function(){
        view.elements.new.onclick = this.execute
      },
    },
    open: {
      execute: function(){
     },
      add:function(){
        view.elements.open.click= this.execute
      },
    },
    save: {
      execute: function(){
      },
      add:function(){
        view.elements.save.click= this.execute
      },
    },
    saveas:{
      execute: function(e){
          console.log("Wow!!!!!!!!")
      },
      add: function(e){
        view.elements.saveAs.click= this.execute
      },
    },
    import:{
      execute: function(e){
        const elem = view.elements.importFile
        model.mainMenuFunc.import.execute(elem)
     },//end of execute
      add:function(){
        view.elements.import.onclick = this.execute
      },
    },//end of import
    export: {
      execute: function(){
        function saveStringAsFile(string,filename){
          var blob = new Blob([string], {type: 'text/plain; charset=utf-8'});
          saveAs(blob, filename);
        }
        var svgString = draw.screen.svg();
        saveStringAsFile(svgString, 'SVG.svg');
      },//end of execute
      add:function(){},
    },//end of export
  },//enf of func
  toolBarFunc:{
    run: {
      execute: function (){
        const code = editor.getValue();
        new Function(code)()
      },//end of execute
      add: function(){},
    },//end of run
  },
  drawMenu:{
    click: {
      execute: function(e){
        //e.stopPropagation()
        model.drawMenu.click.execute(e)
      },
      add: function(){
        view.elements.drawmenu.forEach(any=>{
          any.notSelected = ()=>{
            any.children[1].style.display="none"
          }
          any.selected = ()=>{
            any.children[1].style.display="block"
          } 
          any.name  = any.firstElementChild.innerHTML;
          any.onclick = this.execute
        })
        //drawmenuの初期状態を設定
        //view.elements.drawmenu[0].selected()
        view.elements.activeDrawElement = view.elements.drawmenu[0]
      },
    },
  },//end of drawMenu
  drawMenuFunc: {
    line:{
      execute: function(){
        model.drawMenuFunc.cancel()
        model.drawMenuFunc.drawOff()
        model.drawMenuFunc.line.execute()
      },
      add: function(){
        view.elements.line.onclick = this.execute
      },
    },
    polyline:{
      execute: function(){
        model.drawMenuFunc.cancel()
        model.drawMenuFunc.drawOff()
        model.drawMenuFunc.polyline.execute()
      },
      add: function(){
        view.elements.polyline.onclick = this.execute
      },
    },
    circle:{
      execute: function(){
        model.drawMenuFunc.drawOff()
        model.drawMenuFunc.cancel()
        model.drawMenuFunc.circle.execute()
      },
      add: function(){
        view.elements.circle.onclick = this.execute
      },
    },
    rectangle:{
      execute: function(e){
        model.drawMenuFunc.cancel()
        model.drawMenuFunc.drawOff()
        model.drawMenuFunc.rectangle.execute(e)
      },
      add: function(){
        view.elements.rectangle.onclick = this.execute
      },
    },
    setDrawFunc:{
      execute:function(){
          model.drawMenuFunc.setDrawFunc.execute()
      },
      add:function(){
        this.execute()
      }
    }
  },//end of drawMenuFunc
  screenFunc:{
    setScreen:{
      execute: function(){
        model.screenFunc.setScreen.execute()
      },
      add: function(){
        this.execute() 
      },
    },
    resize: {
      execute:function(){
        model.screenFunc.resize.execute()
      },
      add: function(){
        window.addEventListener("resize",this.execute,false);
      },
    },
  },
  editorFunc:{
    setEditor:{
      execute: function(){
        model.editorFunc.setEditor.execute()
      },
      add: function(){
        this.execute()
      },
    },
  },
  keyFunc: {
    keyDown:{
      execute:function(e){
        model.keyFunc.keyDown.execute(e)
      },
      add: function(){
        document.onkeydown = this.execute
      },
    },
  },
  initialize: function(){
    //add method
    const controls = [
      this.document, this.mainMenu, this.mainMenuFunc,
      this.toolBarFunc, this.drawMenu,this.drawMenuFunc,
      this.screenFunc, this.editorFunc, this.keyFunc,
    ] 
    controls.forEach(control =>{
      for(let any in control){
        control[any].add()
      }
    })
  },
}


//keyを押したときの挙動を設定
/*
//読み込みオプションの挙動を設定
//control.initRead = function(){
//  if(control.readOption.inifile){
//    console.log("inifile is " + control.readOption.inifile)
//    control.reqJsonObj = JSON.stringify({name:control.readOption.inifile});
//    var open = document.createEvent("HTMLEvents");
//    open.initEvent("open", true, false);
//    document.dispatchEvent(open);
//  }
//};

*/

/*****************viewの設定を有効にする*****************/
//menuBarの表示・非表示設定を行う
//view.menuBar.viewset();
//menubarをクリックしたときの挙動をイベントリスナーに登録
//view.menuBar.click.add();
//menubarにホバーしたときの挙動をイベントリスナーに登録
//view.menuBar.hover.add();
//set each tag function on click
//view.menuBar.eachTag.set();
//drawmenurの表示・非表示設定を行う
//view.drawmenu.viewset();
//drawmenuをクリックしたときの挙動をイベントリスナーに登録
//view.drawmenu.click.add();
//menuBar以外を選択するとmenuBarの選択が解除される。
//document.addEventListener("click",function(e){view.allCancel()},false);

/************各modeイベントの挙動をイベントリスナーに登録************/
//for(let any in control.func)if(control.func[any].available)control.func[any].add();

/************keyを押したときの挙動をイベントリスナーに登録***********/
//document.addEventListener("keydown", view.keydown(), false)

/************読み込みオプションを実行する***************************/
//control.initRead();
