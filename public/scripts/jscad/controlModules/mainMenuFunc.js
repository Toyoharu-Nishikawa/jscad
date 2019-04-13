import {view} from "../view.js"
import {model} from "../model.js"

export const  mainMenuFunc = {
  new: {
    execute: function(e){
      model.mainMenuFunc.new.execute()
    },
    add:function(){
      view.elements.new.onclick = this.execute
    },
  },
  open: {
    execute: function(){
   },
    add:function(){
      view.elements.open.click= this.execute
    },
  },
  save: {
    execute: function(){
    },
    add:function(){
      view.elements.save.click= this.execute
    },
  },
  saveas:{
    execute: function(e){
        console.log("Wow!!!!!!!!")
    },
    add: function(e){
      view.elements.saveAs.click= this.execute
    },
  },
  import:{
    execute: function(e){
      model.mainMenuFunc.import.execute()
   },//end of execute
    add:function(){
      view.elements.import.onclick = this.execute
    },
  },//end of import
  export: {
    execute: function(){
      function saveStringAsFile(string,filename){
        var blob = new Blob([string], {type: 'text/plain; charset=utf-8'});
        saveAs(blob, filename);
      }
      var svgString = draw.screen.svg();
      saveStringAsFile(svgString, 'SVG.svg');
    },//end of execute
    add:function(){},
  },//end of export
}//enf of func

