import {view} from "../view.js"

export const mainMenuView = {
  setEvent:function(){
    view.elements.mainMenu.forEach(any =>{
      any.notSelected = ()=>{ any.children[1].style.display="none"}
      any.selected = ()=>{ any.children[1].style.display="block"}
      any.name = any.firstElementChild.innerHTML
    })
  },
  click: {
    execute: function(e){
      const currentElement = e.currentTarget
      if(currentElement != view.tempElement ){
        if(view.tempElement)view.tempElement.notSelected()
        currentElement.selected()
        view.tempElement = currentElement
        mainMenuView.hover.flag = true
      }
    },
  },
  hover:{
    flag: false,
    execute: function(e){
      if(this.flag){
        mainMenuView.click.execute(e)
      }
    },
  },
}

