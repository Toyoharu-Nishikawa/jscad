var view = Object.create(null);

view.tempElement = null;
view.body =  document.getElementsByTagName("body")[0];
view.menuBar =  {elements: document.querySelectorAll(".tabmenu > li")};

//menuBarの選択時と非選択時の表示を定める
for(any of view.menuBar.elements){
  any.notSelected = function(){this.children[1].style.display="none"};
  any.selected = function(){this.children[1].style.display="block"};
  any.name  = any.firstElementChild.innerHTML;
};

//menuBarを選択したときの挙動を定める
view.menuBar.select = function(e){
  let currentElement = e.currentTarget;
  console.log("select " + currentElement.name);
  if(currentElement != view.tempElement ){
    if(view.tempElement)view.tempElement.notSelected();
    currentElement.selected();
    view.tempElement = currentElement;
  }
};

//menuBarにホバーしたときの挙動を定める
view.menuBar.hover = {
  select:function(){return function a(e){view.menuBar.select(e)}},
  on: function(){
    var tempThis=this;
    for(any of view.menuBar.elements){
      any.addEventListener("mouseover",tempThis.select(),false);
    }
  },
  off: function(){
    var tempThis=this;
    for(any of view.menuBar.elements){
      any.removeEventListener("mouseover",tempThis.select(),false);
    }
  }
}
//menuBarをクリックで選択できるようにする
view.menuBar.click = function(){
  return function(e){
      //伝搬をストップ
      e.stopPropagation();
      //直前に選択していた要素があれが、非選択に切り替える
      if(view.tempElement)view.tempElement.notSelected();
      //clickしたタブを表示し、それ以外を非表示
      view.menuBar.select(e);
      //マウスをホバーしたタブを表示し、それ以外を非表示
      view.menuBar.hover.on();
      //menuBar以外を選択するとmenuBarの選択が解除される。
      document.addEventListener("click",function(e){
        if(view.tempElement)view.tempElement.notSelected();
        view.tempElement = null;
        view.menuBar.hover.off();
      },false);

  };
};

//maneBarの内容を表示
for(any of view.menuBar.elements)console.log(any.firstElementChild.innerHTML);
//menubarをクリックしたときの挙動をイベントリスナーに登録
for(any of view.menuBar.elements) any.addEventListener("click",view.menuBar.click(),false);


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
