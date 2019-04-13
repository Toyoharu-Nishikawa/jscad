import {model} from "../model.js"
export const  doc = {
  click: {
    execute:function(e){
      e.stopPropagation()
      model.doc.click.execute(e);
    },
    add:function(){
      document.onclick = this.execute
    },
  },
}
