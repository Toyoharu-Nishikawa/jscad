import {view} from "../view.js"
import {model} from "../model.js"
import {importFiles} from "../../filereader/index.js"
import {dxftosvg} from '../../dxftosvg/index.js'

export const mainMenuFunc = {
  new:{
    execute:function(){
      console.log("new file");
      mode.sketch.draw.screen.svg("");
    },
  },
  open:{
    execute: async function(e){
      const elem = view.elements.openFile 
      const fileList = await importFiles(elem)
      fileList.forEach(v=>{
        console.log(`read ${v.filename}`)
        const json = JSON.parse(v.text)
        model.sketch.import(json)
      })
      model.doc.allCancel.execute(e)
    },//end of execute
  },
  import:{
    execute: async function(e){
      const elem = view.elements.importFile 
      const fileList = await importFiles(elem)
      fileList.map(model.mainMenuFunc.import.convertToSvg)
        .forEach(model.mainMenuFunc.import.addSvg)
      model.doc.allCancel.execute(e)
    },//end of execute
    removeSvgTag:function (fileData){
      return fileData.replace(/<svg.*>|<\/svg>/g,"");
    },//end of removeSvgTag
    addSvg: function (svgString){
      const svg =  model.sketch.draw.svg(svgString)
        .stroke({color:'blue',opacity: 1.0,width:1})
        .fill('none')
        .attr("stroke-linecap", "round")
        .attr("stroke-linejoin", "round")
      sketch.draw.screen.sheets.push(svg)
    },//end of addSvg
    convertToSvg: function(file){
      switch (file.ext) {
        case 'dxf':{
          return dxftosvg(file.text)
          break
        }
        case 'svg':{
          return model.mainMenuFunc.import.removeSvgTag(file.text)
          break
        }
        default:{
          break
        }
      }
    },//end of convertToSvg
  },//end of import
}

