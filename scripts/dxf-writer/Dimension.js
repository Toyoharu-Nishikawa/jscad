import {getHandle, getDHandle} from "./handle.js"


export class Dimension {
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    constructor(x1, y1, x2, y2, x3, y3, x4, y4, type, lineType, colorIndex)
    {
        this.x1 = x1
        this.y1 = y1
        this.x2 = x2
        this.y2 = y2
        this.x3 = x3
        this.y3 = y3
        this.x4 = x4
        this.y4 = y4
        this.type = type

        this.lineType = lineType || "ByLayer"
        this.colorIndex = colorIndex === 0 ? 0 : (colorIndex || 256 )
    }

    toDxfString(){
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm

      const handle = getHandle()
      const dHandle = getDHandle()  
      let s = ""
      s+='  0\nDIMENSION\n'
      s+=`  5\n${handle}\n`
      s+='100\nAcDbEntity\n'
      s+=`  8\n${this.layer.name}\n`;
      s+=`  6\n${this.lineType}\n`
      s+=` 62\n${this.colorIndex}\n`
      s+='370\n-1\n'
      s+='100\nAcDbDimension\n'
      s+=`  2\n${dHandle}\n`
      s+=` 10\n${this.x3}\n`
      s+=` 20\n${this.y3}\n`
      s+=' 30\n0\n'
      s+=` 11\n${this.x4}\n`
      s+=` 21\n${this.y4}\n`
      s+=' 31\n0\n'
     
      switch(this.type){
        case "length": {
          s+=' 70\n33\n'
          break
        }
        case "horizontal": {
          s+=' 70\n32\n'
          break
        }
        case "vertical": {
          s+=' 70\n32\n'
          break
        }
      }
      s+=' 71\n5\n'
      s+='  3\nStandard\n'
      s+=' 53\n0\n'
      s+='210\n0\n'
      s+='220\n0\n'
      s+='230\n1\n'
      s+='100\nAcDbAlignedDimension\n'
      s+=` 13\n${this.x1}\n`
      s+=` 23\n${this.y1}\n`
      s+=' 33\n0\n'
      s+=` 14\n${this.x2}\n`
      s+=` 24\n${this.y2}\n`
      s+=' 34\n0\n'
      switch(this.type){
        case "length": {
          break
        }
        case "horizontal": {
          s+='100\nAcDbRotatedDimension\n'
          break
        }
        case "vertical": {
          s+=' 50\n   90\n'
          s+='100\nAcDbRotatedDimension\n'
          break
        }
      }
       return s;
    }
}

