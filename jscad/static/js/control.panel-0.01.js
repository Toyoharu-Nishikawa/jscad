//viewオブジェクトを作成
var view = Object.create(null);

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
for(any of ["aside","drawmenu", "property", "drawing", "scripting"]){
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

//menuBarの設定
view.menuBar =  {
  //menuBarのDOM要素を取得
  elements: document.querySelectorAll(".tabmenu > li"),
  //menuBarの選択時と非選択時の表示を定める
  viewSet: function(){
    for(any of view.menuBar.elements){
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
//menuBarをクリックしたときの挙動を定める
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
    for(any of view.menuBar.elements){
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
//menuBarにホバーしたときの挙動を定める
view.menuBar.hover = {
  flag: false,
  hover: function(){
    return function(e){
      if(view.menuBar.hover.flag)view.menuBar.select(e);
    };
  },
  add: function(){
    for(any of view.menuBar.elements){
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

//drawmenuの設定
view.drawmenu =  Object.assign(view.drawmenu, {
  elements: document.querySelectorAll(".contents > aside > article.drawmenu > section"),
  activeElement: null,
  viewSet: function(){
    for(any of view.drawmenu.elements){
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
    for(any of view.drawmenu.elements){
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
      //ESCを押したときの挙動
      case 27:
        console.log("ESC")
        view.allCancel();
        break;
      //Lを押したときの挙動
      case 76:
        view.logWidthHeight();
      //spacを押したときの挙動
      case 32:
        view.setview()
        console.log("forcibly resized")
        break;
      default:
        break;
    }
  }
};

/*****************初期化*****************/
//初期描画......ユーザがアクセスしてすぐに反映されるようにするため、コードの上部に記述
view.initialize();
//menuBarの表示・非表示設定を行う
view.menuBar.viewSet();
//menubarをクリックしたときの挙動をイベントリスナーに登録
view.menuBar.click.add();
//menubarにホバーしたときの挙動をイベントリスナーに登録
view.menuBar.hover.add();

//drawmenurの表示・非表示設定を行う
view.drawmenu.viewSet();
//drawmenuをクリックしたときの挙動をイベントリスナーに登録
view.drawmenu.click.add();


//menuBar以外を選択するとmenuBarの選択が解除される。
document.addEventListener("click",function(e){view.allCancel()},false);
//keyを押したときの挙動をイベントリスナーに登録
document.addEventListener("keydown", view.keydown(), false)


/*****************SVG***************************/
var dafault_width = 600;
var default_height =400;
var draw = SVG('drawing').panZoom();

draw.width(view.drawing.element.getBoundingClientRect().width);
draw.height(view.drawing.element.getBoundingClientRect().height);
draw.attr('preserveAspectRatio', 'xMinYMin slice');
draw.style( {
  border: '1px solid #F5F5F5',
  margin:0,
  padding:0,
  background:'linear-gradient(to bottom, RoyalBlue, white)'
});
document.addEventListener("svgResize",function(){
  draw.width(view.drawing.element.getBoundingClientRect().width);
  draw.height(view.drawing.element.getBoundingClientRect().height);
  console.log("resize svg")
},false);

var vb={
  x: 0,
  y: 0,
  width: dafault_width,
  height: default_height
}
draw.viewbox(vb.x, vb.y, vb.width, vb.height);

var screen=draw.group();
var sheet = [];
sheet.push(screen.group());
