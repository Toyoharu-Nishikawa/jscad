import {view} from "../view.js"
import {model} from "../model.js"

export const mainMenuView = {
  click: {
    execute:function(e){
      e.stopPropagation()
      model.mainMenuView.click.execute(e);
    },
    add: function(){
      view.elements.mainMenu.forEach(any =>{
        any.onclick = this.execute
      })
    },
  },
  hover:{
    execute: function(e){
      model.mainMenuView.hover.execute(e)
    },
    add: function(){
      view.elements.mainMenu.forEach(any=>{
        any.onmouseover = this.execute 
      })
    },
  },
}

