import {getHandle} from "./handle.js"

const H_ALIGN_CODES = ['left', 'center', 'right'];
const V_ALIGN_CODES = ['baseline','bottom', 'middle', 'top'];

export class Text
{
    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    constructor(x1, y1, height, rotation, value, horizontalAlignment = 'left', verticalAlignment = 'baseline', lineType, colorIndex)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.height = height;
        this.rotation = rotation;
        this.value = value;
        this.hAlign = horizontalAlignment;
        this.vAlign = verticalAlignment;

        this.lineType = lineType || "ByLayer"
        this.colorIndex = colorIndex === 0 ? 0 : (colorIndex || 256 )
        this.handle = getHandle()
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/text_al_u05_c.htm

        let s = ""
        s+=`  0\nTEXT\n`;
        s+=`  5\n${this.handle}\n`;
        s+=`100\nAcDbEntity\n`
        s+=`  8\n${this.layer.name}\n`;
        s+=`  6\n${this.lineType}\n`;
        s+=` 62\n  ${this.colorIndex}\n`
        s+=`370\n   -1\n`
        s+=`100\nAcDbText\n`
        s+=` 10\n${this.x1}\n 20\n${this.y1}\n 30\n0\n`;
        s+=` 40\n${this.height}\n`
        s+=`  1\n${this.value}\n`;
        s+=` 50\n${this.rotation}\n`
        s+=` 41\n1\n 51\n0\n`
        s+=`  7\nArial\n`
        s+=` 71\n    0\n`
        if (H_ALIGN_CODES.includes(this.hAlign, 1) || V_ALIGN_CODES.includes(this.vAlign, 1)){
            s+=` 11\n${this.x1}\n 21\n${this.y1}\n 31\n0\n`;
            s+=`210\n0\n`
            s+=`220\n0\n`
            s+=`230\n1\n`
            s+=`100\nAcDbText\n`
            s+=` 73\n    ${Math.max(V_ALIGN_CODES.indexOf(this.vAlign),0)}\n`;
           // s+=` 72\n    ${Math.max(H_ALIGN_CODES.indexOf(this.hAlign),0)}\n`;
        }
        else{
          s+=`210\n0\n`
          s+=`220\n0\n`
          s+=`230\n1\n`
          s+=`100\nAcDbText\n`
        }
        return s;
    }
}

//module.exports = Text;
