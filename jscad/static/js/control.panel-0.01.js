var element =  document.querySelectorAll(".tabmenu > li");
console.log(element.length)
for(var i=0; i<element.length; i++){
  console.log(element[i].children[1].style.display="none");
  console.log(element[i].firstElementChild.innerHTML);
}
for(list of element){
  list.addEventListener("click", function(e){
    if(this.children[1].style.display!="block"){
      for(others of element)others.children[1].style.display="none";
      this.children[1].style.display = "block";

    }
    console.log("click " + this.firstElementChild.innerHTML)
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
