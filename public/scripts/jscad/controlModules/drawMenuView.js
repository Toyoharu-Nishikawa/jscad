import {view} from "../view.js"
import {model} from "../model.js"

export const drawMenuView = {
  click: {
    execute: function(e){
      e.stopPropagation()
      e.preventDefault()
      model.drawMenuView.click.execute(e)
    },
    add: function(){
      view.elements.drawmenu.forEach(any=>{
        any.onclick = this.execute
      })
      //drawmenuの初期状態を設定
      //view.elements.drawmenu[0].selected()
      view.elements.activeDrawElement = view.elements.drawmenu[0]
    },
  },
}

