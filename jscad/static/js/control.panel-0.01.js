var body =  document.getElementsByTagName("body");

var element =  document.querySelectorAll(".tabmenu > li");
console.log(element.length)

//tabmenuの内容を表示
for(var i=0; i<element.length; i++){
  console.log(element[i].children[1].style.display="none");
  console.log(element[i].firstElementChild.innerHTML);
}

var menuCancelListener = false
//タブメニューをクリックするとメニューを開くように登録
for(list of element){
  list.addEventListener("click", function(e){
    console.log("click " + this.firstElementChild.innerHTML)
    if(this.children[1].style.display!="block"){
      //menyuを表示
      for(any of element)any.children[1].style.display="none";
      this.children[1].style.display = "block";
      //別のメニューにマウスを合わせるとそのメニューを開く
      function mouseovermenu(e){
        if(this.children[1].style.display!="block"){
          for(any of element)any.children[1].style.display="none";
          this.children[1].style.display = "block";
          e.stopPropagation();
        }
      }
      for(any of element)any.addEventListener("mouseover",mouseovermenu,false);
      //メニュー以外をクリックしたらメニューを非表示
      if(!menuCancelListener){
        let tempThis= this;
        menuCancelListener = true;
        console.log("menue mode can be canceld by ckicking other area. " + menuCancelListener);
        body[0].addEventListener("click",function(e){
          for(any of element)any.children[1].style.display = "none";
          body[0].removeEventListener("click",arguments.callee,false);
          for(any of element)any.removeEventListener("mouseover",mouseovermenu,false);
          menuCancelListener = false;
          console.log("menue mode has been canceled. " +  menuCancelListener)
        }, false);
      }
      else console.log("menue mode be canceld by ckicking other area. " + menuCancelListener);
    }
    e.stopPropagation();
  }, false);
}

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
