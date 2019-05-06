import {view} from "../view.js"

export const coordinate = {
  display: {
    execute:function(e){
      const coord = e.detail
      view.elements.coordinate.textContent=
       ` x: ${(coord.x*100+0.5|0)/100}, y:${(coord.y*100+0.5|0)/100}`
    }
  }
}
