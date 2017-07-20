//viewオブジェクトを作成
var view = Object.create(null);

view.tempElement = null;
view.body =  document.getElementsByTagName("body")[0];

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
      default:
        break;
    }
  }
};
//maneBarの内容を表示
for(any of view.menuBar.elements)console.log(any.firstElementChild.innerHTML);
//menuBarの表示・非表示設定を行う
view.menuBar.viewSet();
//menubarをクリックしたときの挙動をイベントリスナーに登録
view.menuBar.click.add();
//menubarにホバーしたときの挙動をイベントリスナーに登録
view.menuBar.hover.add();

//menuBar以外を選択するとmenuBarの選択が解除される。
document.addEventListener("click",function(e){view.allCancel()},false);
//keyを押したときの挙動をイベントリスナーに登録
document.addEventListener("keydown", view.keydown(), false)

// for(list of element){
//   list.addEventListener("click", function(e){
//     console.log("click " + this.firstElementChild.innerHTML)
//     if(this.children[1].style.display!="block"){
//       //menuを表示
//       for(any of element)any.children[1].style.display="none";
//       this.children[1].style.display = "block";
//       //別のメニューにマウスを合わせるとそのメニューを開く
//       function mouseovermenu(e){
//         if(this.children[1].style.display!="block"){
//           for(any of element)any.children[1].style.display="none";
//           this.children[1].style.display = "block";
//           e.stopPropagation();
//         }
//       }
//       for(any of element)any.addEventListener("mouseover",mouseovermenu,false);
//       //メニュー以外をクリックしたらメニューを非表示
//       if(!menuCancelListener){
//         let tempThis= this;
//         menuCancelListener = true;
//         console.log("menue mode can be canceld by ckicking other area. " + menuCancelListener);
//         body.addEventListener("click",function(e){
//           for(any of element)any.children[1].style.display = "none";
//           body.removeEventListener("click",arguments.callee,false);
//           for(any of element)any.removeEventListener("mouseover",mouseovermenu,false);
//           menuCancelListener = false;
//           console.log("menue mode has been canceled. " +  menuCancelListener)
//         }, false);
//       }
//       else console.log("menue mode be canceld by ckicking other area. " + menuCancelListener);
//     }
//     e.stopPropagation();
//   }, false);
// }




  // var dafault_width = 1000;
  // var default_height =400;
  // var draw = SVG('drawing').panZoom();
  //
  // draw.width(dafault_width);
  // draw.height(default_height);
  // draw.attr('preserveAspectRatio', 'xMinYMin slice');
  // draw.style( {
  //   border: '1px solid red',
  //   background:'linear-gradient(to bottom, RoyalBlue, white)'
  // });
  //
  // var vb={
  //   x: 0,
  //   y: 0,
  //   width: dafault_width,
  //   height: default_height
  // }
  // draw.viewbox(vb.x, vb.y, vb.width, vb.height);
  //
  // var screen=draw.group();
  // var sheet = [];
  // sheet.push(screen.group());
