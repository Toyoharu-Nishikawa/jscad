'use strict'
import dxftosvg from './node_modules/dxftosvg/index.js'

var jscad = {view:null,draw:null,req:null,control:{},editor:{}};
//jscad 名前空間開始
{
//view, req, control, drawオブジェクトを作成
let view = jscad.view;
let draw = jscad.draw;
let req = jscad.req;
let control = jscad.control;
let editor = jscad.editor;

//オプション読み込み
//control = {readOption: jscadReadOption()}
//console.log("contorl.readOption: ");
//console.log(control.readOption);

/**************************************************/
/*                 view                           */
/**************************************************/
//viewにタグ要素を設定
view ={
  body: {element: document.body, borderWidth: 2},
  header: {element: document.getElementsByTagName("header")[0]},
  main: {element: document.getElementsByTagName("main")[0]},
  toolBar: {element: document.getElementsByClassName("toolBar")[0]},
  contents: {element: document.getElementsByClassName("contents")[0]},
  aside: {element: document.getElementsByTagName("aside")[0]},
  drawmenu: {element: document.getElementsByClassName("drawmenu")[0]},
  property: {element: document.getElementsByClassName("property")[0]},
  maincontents: {element: document.getElementsByClassName("maincontents")[0]},
  drawing: {element: document.getElementById("drawing")},
  scripting: {element: document.getElementsByClassName("scripting")[0]},
  footer: {element: document.getElementsByTagName("footer")[0]},
  tempElement: null,
  logWidthHeight: function(){
    console.log("window width is " + view.windowWidth);
    console.log("window height is " + view.windowHeight);
    console.log("body width is " + view.body.element.getBoundingClientRect().width);
    console.log("body height is " + view.body.element.getBoundingClientRect().height);
    console.log("header width is " + view.header.element.getBoundingClientRect().width);
    console.log("header height is " + view.header.element.getBoundingClientRect().height);
    console.log("main width is " + view.main.element.getBoundingClientRect().width);
    console.log("main height is " + view.main.element.getBoundingClientRect().height);
    console.log("toolBar width is " + view.toolBar.element.getBoundingClientRect().width);
    console.log("toolBar height is " + view.toolBar.element.getBoundingClientRect().height);
    console.log("contents width is " + view.contents.element.getBoundingClientRect().width);
    console.log("contents height is " + view.contents.element.getBoundingClientRect().height);
    console.log("aside width is " + view.aside.element.getBoundingClientRect().width);
    console.log("aside height is " + view.aside.element.getBoundingClientRect().height);
    console.log("drawmenu width is " + view.drawmenu.element.getBoundingClientRect().width);
    console.log("drawmenu height is " + view.drawmenu.element.getBoundingClientRect().height);
    console.log("property width is " + view.property.element.getBoundingClientRect().width);
    console.log("property height is " + view.property.element.getBoundingClientRect().height);
    console.log("maincontents width is " + view.maincontents.element.getBoundingClientRect().width);
    console.log("maincontents height is " + view.maincontents.element.getBoundingClientRect().height);
    console.log("drawing width is " + view.drawing.element.getBoundingClientRect().width);
    console.log("drawing height is " + view.drawing.element.getBoundingClientRect().height);
    console.log("scripting width is " + view.scripting.element.getBoundingClientRect().width);
    console.log("scripting height is " + view.scripting.element.getBoundingClientRect().height);
    console.log("footer width is " + view.footer.element.getBoundingClientRect().width);
    console.log("footer height is " + view.footer.element.getBoundingClientRect().height);
  }
};

//aside, drawmenu, property, drawing, scripting要素に高さ, 幅設定関数を追加
for(let any of  ["aside","drawmenu", "property", "drawing", "scripting"]){
  let obj = view[any].element;
  obj = Object.assign(obj,{
    setHeight: function(height){
      obj.style.height = height +"px";
    },
    setWidth: function(width){
      obj.style.width = width +"px";
    }
  });
}
view.drawmenu.element = Object.assign(view.drawmenu.element, {
  margin:2,
  setWidthAuto: function(){
    var width = view.aside.element.getBoundingClientRect().width
      - this.margin*2;
    view.drawmenu.element.setWidth(width);
  }
});
view.property.element = Object.assign(view.property.element,{
  margin:2,
  setHeightWidthAuto: function(){
    var height = window.innerHeight
      - view.header.element.getBoundingClientRect().height
      - view.toolBar.element.getBoundingClientRect().height
      - view.drawmenu.element.getBoundingClientRect().height
      - view.footer.element.getBoundingClientRect().height
      - view.drawmenu.element.margin*2
      - this.margin*2
      - view.body.borderWidth*2;
    var width = view.drawmenu.element.getBoundingClientRect().width;
    view.property.element.setHeight(height);
    view.property.element.setWidth(width);
  }
});
view.drawing.element = Object.assign(view.drawing.element, {
  setWidthAuto: function(){
    var width = window.innerWidth
      - view.aside.element.getBoundingClientRect().width
      - view.body.borderWidth*2;
    view.drawing.element.setWidth(width);
  }
});
view.scripting.element = Object.assign(view.scripting.element,{
  margin:2,
  setHeightWidthAuto: function(){
    var height = window.innerHeight
      - view.header.element.getBoundingClientRect().height
      - view.toolBar.element.getBoundingClientRect().height
      - view.drawing.element.getBoundingClientRect().height
      - view.footer.element.getBoundingClientRect().height
      - this.margin*2
      - view.body.borderWidth*2;
    var width = view.drawing.element.getBoundingClientRect().width
      - this.margin*2;
    view.scripting.element.setHeight(height);
    view.scripting.element.setWidth(width);
  }
});

//画面サイズ変更時の挙動を設定
view = Object.assign(view,{
  svgResize: document.createEvent("HTMLEvents"),
  realizeTimer: null,
  interval: Math.floor(1000 / 60 * 1),
  setview: function(){
    view.aside.element.setWidth(150);
    view.drawmenu.element.setWidthAuto();
    view.drawmenu.element.setHeight(330);
    view.property.element.setHeightWidthAuto();
    view.drawing.element.setHeight(450);
    view.drawing.element.setWidthAuto();
    view.scripting.element.setHeightWidthAuto();
    document.dispatchEvent(view.svgResize);
  },
  initialize: function(){
    this.svgResize.initEvent("svgResize",true,false);
    this.setview();
    window.addEventListener('resize', function (e) {
      console.log('resizing width:'+ window.innerWidth + "height:" + window.innerHeight);
      if (view.resizeTimer !== false) {
        clearTimeout(view.resizeTimer);
      }
      view.resizeTimer = setTimeout(function () {
        console.log('resized width:'+ window.innerWidth + "height:" + window.innerHeight);
        view.setview();
      }, view.interval);
    },false);
  }
});

//ツールバーなどの各要素の分割調整及び画面サイズ変更に対応
view.initialize();

/**********************************************/
/*                 model                      */
/**********************************************/
//var dafault_width = 600;
//var default_height =400;
draw = SVG('drawing').panZoom({zoomFactor:1.1});


draw.width(view.drawing.element.getBoundingClientRect().width);
draw.height(view.drawing.element.getBoundingClientRect().height);
draw.attr('preserveAspectRatio', 'xMinYMin slice');
draw.style( {
  border: '1px solid #F5F5F5',
  margin:0,
  padding:0,
  background:'linear-gradient(to bottom, white, RoyalBlue )'
});
document.addEventListener("svgResize",function(){
  draw.width(view.drawing.element.getBoundingClientRect().width);
  draw.height(view.drawing.element.getBoundingClientRect().height);
  console.log("resize svg")
},false);

var vb={
  x: 0,
  y: 0,
  width: view.drawing.element.getBoundingClientRect().width,
  height: view.drawing.element.getBoundingClientRect().height
}
draw.viewbox(vb.x, vb.y, vb.width, vb.height).flip('y');
draw.background = draw.group();
draw.background.line(-1000, 0, 1000, 0).fill("none").stroke({color:"black",opacity: 1.0,width:1})
  .attr("vector-effect", "non-scaling-stroke")
  .attr("stroke-dasharray","5 5");
draw.background.line(0, -1000, 0, 1000).fill("none").stroke({color:"black",opacity: 1.0,width:1})
  .attr("vector-effect", "non-scaling-stroke")
  .attr("stroke-dasharray","5 5");

draw.screen=draw.group();
draw.screen.stroke({color:"blue",opacity: 1.0,width:1});
draw.screen.sheet = [];
draw.screen.sheet.push(draw.screen.group());
//draw.screen.sheet[0].rect(100,100).move(50,50).fill("none").stroke({color:'black',opacity: 1.0,width:1});
//draw.screen.sheet[0].line(0,0,100,100).stroke({color:'black',opacity: 1.0,width:1});



/**********************************************/
/*          communication                     */
/**********************************************/
req =new XMLHttpRequest();


/******************************************************/
/*                control                             */
/******************************************************/
control.resJsonObj = Object.create(null);
control.reqJsonObj = Object.create(null);
control.func = {
  new: {
    execute: function(e){
      console.log("new file");
      draw.screen.svg("");
    }
  },
  open: {
    execute: function(e){
      req.open("POST", "/jscad/open",true);
      req.addEventListener("load",function(e){
        console.log("open file");
        control.resJsonObj = req.response;
        draw.screen.svg(control.resJsonObj.contents);
        document.removeEventListener("load",arguments.callee,false)
      },false)
      req.setRequestHeader("content-type","application/json");
      req.responseType="json";
      //control.reqJsonObj = JSON.stringify({name:"temp"});
      req.send(control.reqJsonObj);
      return this;
    }
  },
  save: {
    execute: function(e){
      req.open("POST", "/jscad/save",true);
      req.addEventListener("load",function(e){
        console.log("save file");
        document.removeEventListener("load",arguments.callee,false)
      },false)
      req.setRequestHeader("content-type","application/json");
      control.reqJsonObj = JSON.stringify({name:"temp", contents:draw.screen.svg()})
      req.send(control.reqJsonObj);
      return this;
    }
  },
  saveas:{
    execute: function(e){console.log("Wow!!!!!!!!")}
  },
  import:{
    execute: function(e){
      var self = this;
      var elem = document.getElementById("ImportFile");

      function removeSvgTag(fileData){
        return fileData.replace(/<svg.*>|<\/svg>/g,"");
      }

      function readFile(file){
        return new Promise((resolve,reject)=>{
          let filename = file.name;
          let lastDotPosition = filename.lastIndexOf('.');
          let bareFilename = filename.substr(0, lastDotPosition);
          let fileExtension = filename.substr(lastDotPosition+1).toLowerCase();
            
          var reader = new FileReader();
          reader.addEventListener("load",function(e){
            let fileData = e.target.result;
            let svgString;
            switch (fileExtension) {
              case 'dxf':
                  svgString = dxftosvg(fileData);
                  break;
              case 'svg':
                  svgString = removeSvgTag(fileData);
                  break;
              default:
                  break;
            }
            addSvg(svgString);
          },false);
          reader.readAsText(file, 'UTF-8');
        });//end of Promise
      }//end of readFile
      
      function addSvg(svgString){
        draw.screen.sheet.push(draw.screen.group().svg(svgString)
              .stroke({color:'blue',opacity: 1.0,width:1})
              .fill('none')
              .attr("stroke-linecap", "round")
              .attr("stroke-linejoin", "round"));
      }
      function change(e){
        let filelist = e.target.files;
        let promise = [];
        for(let file of filelist){
          promise.push(readFile(file))
        }
        Promise.all(promise).then(()=>{console.log("import all files")});
        view.allCancel()
        elem.removeEventListener("change",change ,false);
      }//end of change
      
      elem.addEventListener('change', change, false);
      elem.click(); //fire click event
    }//end of execute
  },//end of import
  export: {
    execute: function(){
      function saveStringAsFile(string,filename){
        var blob = new Blob([string], {type: 'text/plain; charset=utf-8'});
        saveAs(blob, filename);
      }
      var svgString = Gaspath.svg.draw.screen.svg();
      saveStringAsFile(svgString, 'SVG.svg');
    },//end of execute
  },//end of export
  run: {
    execute: function (){
      var code = editor.getValue();
      //console.log(code); 
      //var exec = new Function("elem",code);
      //exec(draw);
      eval(code);
      /*draw.screen.sheet.push(draw.screen.group());
      draw.screen.sheet.push(draw.screen.group());
      draw.screen.sheet[0].line(0,0,100,100)
        .stroke({color:'blue',opacity: 1.0,width:1})
      draw.screen.sheet[1].line(0,0,-100,-100)
      draw.screen.sheet[1].move(10,0)
      console.log(draw.screen.svg())
      */
    },//end of execute
  },//end of run
};

//各イベントリスナーの登録と削除のメソッドを設定
for(let any in control.func){
  control.func[any].name = any;
  control.func[any].available = true;
  control.func[any].add = function(){
    console.log("add: " + any);
    var name = this.name
    var func = this.execute;
    this.abailable = true;
    document.addEventListener(name,func,false)
    return this;
  };
  control.func[any].remove = function(){
    console.log("remove: " + any);
    var name = this.name
    var func = this.execute;
    this.abailable = false;
    document.removeEventListener(name,func,false);
    return this;
  };
  control.func[any].fire = function(){
    var myEvent = document.createEvent("HTMLEvents");
    var name = any; 
    console.log("fire "+ name)
    myEvent.initEvent(name);
    document.dispatchEvent(myEvent);
  }
}


//menubarのコントロール設定
view.menuBar =  {
  //menuBarのDOM要素を取得
  elements: document.querySelectorAll(".tabmenu > li"),
  //menuBarの選択時と非選択時の表示を定める
  viewset: function(){
    for(let any of view.menuBar.elements){
      any.notSelected = function(){this.children[1].style.display="none"}; //thisはイベント発生した要素
      any.selected = function(){this.children[1].style.display="block"}; //thisはイベント発生した要素
      any.name  = any.firstElementChild.innerHTML;
    }
  },
  //menuBarを選択したときの挙動を定める
  select: function(e){
    let currentElement = e.currentTarget;
    console.log("select " + currentElement.name);
    if(currentElement != view.tempElement ){
      if(view.tempElement)view.tempElement.notSelected();
      currentElement.selected();
      view.tempElement = currentElement;
    }
  }
};
//menubarをクリックしたときの挙動を定める
view.menuBar.click ={
  click: function(){
    return function(e){
        //伝搬をストップ
        e.stopPropagation();
        //直前に選択していた要素があれが、非選択に切り替える
        if(view.tempElement)view.tempElement.notSelected();
        //clickしたタブを表示し、それ以外を非表示
        view.menuBar.select(e);
        //マウスをホバーしたタブを表示し、それ以外を非表示
        view.menuBar.hover.flag = true;
    };
  },
  add: function(){
    for(let any of view.menuBar.elements){
      any.tempClickFunc = this.click()
      any.addEventListener("click",any.tempClickFunc,false);
    }
  },
  remove: function(){
    for(any of view.menuBar.elements){
      any.removeEventListener("mouseover", any.tempClickFunc,false);
      if("tempClickFunc" in any ) delete any.tempClickFunc;
    }
  }
}

///set each function fired when each tag are clicked
view.menuBar.eachTag = {
  elements: {
    "import":document.getElementById("Import"),
    "export":document.getElementById("Export"),
    "run":document.getElementById("run"),
  },
  set: function(){
    for(let any in this.elements){
      console.log("set function of " + any);  
      this.elements[any].addEventListener('click',(e)=>{
        view.allCancel(); //cancel all select mode
        control.func[any].fire(e)
      }, false);
    }
  }
}


//menubarにホバーしたときの挙動を定める
view.menuBar.hover = {
  flag: false,
  hover: function(){
    return function(e){
      if(view.menuBar.hover.flag)view.menuBar.select(e);
    };
  },
  add: function(){
    for(let any of view.menuBar.elements){
      any.tempHoverFunc = this.hover()
      any.addEventListener("mouseover",any.tempHoverFunc,false);
    }
  },
  remove: function(){
    for(any of view.menuBar.elements){
      any.removeEventListener("mouseover", any.tempHoverFunc,false);
      if("tempHoverFunc" in any ) delete any.tempHoverFunc;
    }
  }
};

//drawmenuのコントロール設定
view.drawmenu =  Object.assign(view.drawmenu, {
  elements: document.querySelectorAll(".contents > aside > article.drawmenu > section"),
  activeElement: null,
  viewset: function(){
    for(let any of view.drawmenu.elements){
      any.notSelected = function(){this.children[1].style.display="none"}; //thisはイベント発生した要素
      any.selected = function(){this.children[1].style.display="block"}; //thisはイベント発生した要素
      any.name  = any.firstElementChild.innerHTML;
    }
    //drawmenuの初期状態を設定
    view.drawmenu.elements[0].selected();
    this.activeElement = view.drawmenu.elements[0];
  },
  //drawmenuを選択したときの挙動を定める
  select: function(e){
    let currentElement = e.currentTarget;
    console.log("select " + currentElement.name);
    if(currentElement != this.activeElement ){
      if(this.activeElement)this.activeElement.notSelected();
      currentElement.selected();
      this.activeElement = currentElement;
    }
  }
});
//drawmenuをクリックしたときの挙動を定める
view.drawmenu.click ={
  click: function(){
    return function(e){
        //伝搬をストップ
        e.stopPropagation();
        //直前に選択していた要素があれが、非選択に切り替える
        if(view.tempElement)view.tempElement.notSelected();
        //clickしたタブを表示し、それ以外を非表示
        view.drawmenu.select(e);
    };
  },
  add: function(){
    for(let any of view.drawmenu.elements){
      any.tempClickFunc = this.click()
      any.addEventListener("click",any.tempClickFunc,false);
    }
  },
  remove: function(){
    for(any of view.drawmenu.elements){
      any.removeEventListener("mouseover", any.tempClickFunc,false);
      if("tempClickFunc" in any ) delete any.tempClickFunc;
    }
  }
}

//allcancel
view.allCancel = function(){
  console.log("AllCancel")
  if(view.tempElement)view.tempElement.notSelected();
  view.tempElement = null;
  view.menuBar.hover.flag = false;
}
//keyを押したときの挙動を設定
view.keydown = function(){
  return function(e){
    switch(e.keyCode){
      //keydown shift + Enter
      case 13:
        if(e.shiftKey){
          console.log("shift+Enter")
          control.func.run.fire();
        }
        break;
      //keydown ESC
      case 27:
        console.log("ESC")
        view.allCancel();
        break;
      //Lを押したときの挙動
      //case 76:
      //  view.logWidthHeight();
      //spacを押したときの挙動
      //case 32:
      //  view.setview()
      //  console.log("forcibly resized")
      //  break;
      //ctr+nを押したときの挙動(New)
      //case 78:
      //  var New = document.createEvent("HTMLEvents");
      //  New.initEvent("new", true, false);
      //  document.dispatchEvent(New);
      //  break;
      //ctr+oを押したときの挙動(Open)
      //case 79:
      //  var open = document.createEvent("HTMLEvents");
      //  open.initEvent("open", true, false);
      //  document.dispatchEvent(open);
      //  break;
      //ctr+sを押したときの挙動(Save)
      //case 83:
//        if(e.ctrKey){
      //    var save = document.createEvent("HTMLEvents");
      //    save.initEvent("save", true, false);
      ///    document.dispatchEvent(save);
      //    return false;
  //      }
       // break;
      //enterを押したときの挙動
      //case 13:
      //  console.log("save has been removed")
      //  control.func.save.remove();
      //  break;
      default:
        break;
    }
  }
};

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

/********************************************************/
/*                 editor                               */
/********************************************************/

editor = ace.edit('editor');
//editor.setTheme("ace/theme/monokai");
editor.setKeyboardHandler("ace/keyboard/vim");
editor.getSession().setMode("ace/mode/javascript");
/*editor.setOptions({
  fontFamily: "tahoma",
  fontSize: "14pt"
});*/
/*****************viewの設定を有効にする*****************/
//menuBarの表示・非表示設定を行う
view.menuBar.viewset();
//menubarをクリックしたときの挙動をイベントリスナーに登録
view.menuBar.click.add();
//menubarにホバーしたときの挙動をイベントリスナーに登録
view.menuBar.hover.add();
//set each tag function on click
view.menuBar.eachTag.set();
//drawmenurの表示・非表示設定を行う
view.drawmenu.viewset();
//drawmenuをクリックしたときの挙動をイベントリスナーに登録
view.drawmenu.click.add();
//menuBar以外を選択するとmenuBarの選択が解除される。
document.addEventListener("click",function(e){view.allCancel()},false);

/************各modeイベントの挙動をイベントリスナーに登録************/
for(let any in control.func)if(control.func[any].available)control.func[any].add();

/************keyを押したときの挙動をイベントリスナーに登録***********/
document.addEventListener("keydown", view.keydown(), false)

/************読み込みオプションを実行する***************************/
//control.initRead();
}//jscad 名前空間終了
