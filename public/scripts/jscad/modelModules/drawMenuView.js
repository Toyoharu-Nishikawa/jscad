import {view} from "../view.js"
import {model} from "../model.js"

export const drawMenuView = {
  setEvent: function(){
    view.elements.drawmenu.forEach(any=>{
      any.notSelected = ()=>{any.children[1].style.display="none"}
      any.selected = ()=>{any.children[1].style.display="block"} 
      any.name  = any.firstElementChild.innerHTML;
    })
  },
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
}

