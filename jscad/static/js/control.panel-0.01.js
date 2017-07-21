//viewオブジェクトを作成
var view = Object.create(null);

view ={
  windowWidth: window.innerWidth,
  windowHeight: window.innerHeight,
  body: {element: document.body, borderWidth: 2},
  header: {element: document.getElementsByTagName("header")[0]},
  main: {element: document.getElementsByTagName("main")[0]},
  toolBar: {element: document.getElementsByClassName("toolBar")[0]},
  aside: {element: document.getElementsByTagName("aside")[0]},
  maincontents: {element: document.getElementsByClassName("maincontents")[0]},
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
    console.log("aside width is " + view.aside.element.getBoundingClientRect().width);
    console.log("aside height is " + view.aside.element.getBoundingClientRect().height);
    console.log("maincontents width is " + view.maincontents.element.getBoundingClientRect().width);
    console.log("maincontents height is " + view.maincontents.element.getBoundingClientRect().height);
    console.log("footer width is " + view.footer.element.getBoundingClientRect().width);
    console.log("footer height is " + view.footer.element.getBoundingClientRect().height);
  }
};
//maeinに描画設定を追加
view.main.element = Object.assign(view.main.element,{
  setHeight: function(){
    var height = view.windowHeight
      - view.header.element.getBoundingClientRect().height
      - view.footer.element.getBoundingClientRect().height
      - view.body.borderWidth*2;
    view.main.element.style.height = height +"px";
    console.log(height)
  }
})

view.main.element = Object.assign(view.main.element,{
  setHeight: function(){
    var height = view.windowHeight
      - view.header.element.getBoundingClientRect().height
      - view.footer.element.getBoundingClientRect().height
      - view.body.borderWidth*2;
    view.main.element.style.height = height +"px";
    console.log(height)
  }
})


//初期描画......ユーザがアクセスしてすぐに反映されるようにするため、コードの上部に記述
//mainの高さを設定し、縦スクロール無しにする
view.main.element.setHeight();

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
view.drawmenu =  {
  elements: document.querySelectorAll(".contents > aside > article.drawmenu > section"),
  activeElement: null,
  viewSet: function(){
    for(any of view.drawmenu.elements){
      any.notSelected = function(){this.children[1].style.display="none"}; //thisはイベント発生した要素
      any.selected = function(){this.children[1].style.display="block"}; //thisはイベント発生した要素
      any.name  = any.firstElementChild.innerHTML;
    }
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
};
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
      default:
        break;
    }
  }
};

/*****************初期化*****************/
//menuBarの表示・非表示設定を行う
view.menuBar.viewSet();
//menubarをクリックしたときの挙動をイベントリスナーに登録
view.menuBar.click.add();
//menubarにホバーしたときの挙動をイベントリスナーに登録
view.menuBar.hover.add();

//drawmenuの初期状態を設定
view.drawmenu.activeElement = view.drawmenu.elements[0];
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

  draw.width(view.maincontents.element.getBoundingClientRect().width);
  draw.height(view.maincontents.element.getBoundingClientRect().height);
  draw.attr('preserveAspectRatio', 'xMinYMin slice');
  draw.style( {
    border: '1px solid #F5F5F5',
    margin:0,
    padding:0,
    background:'linear-gradient(to bottom, RoyalBlue, white)'
  });

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
