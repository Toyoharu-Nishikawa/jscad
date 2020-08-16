import {getHandle} from "./handle.js"

export class Arc
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    constructor(x1, y1, r, startAngle, endAngle, lineType, colorIndex)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.lineType = lineType || "ByLayer"
        this.colorIndex = colorIndex === 0 ? 0 : (colorIndex || 256 )
        this.handle = getHandle()
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm


        let s = ""
        s+=`  0\nARC\n`;
        s+=`  5\n${this.handle}\n`
        s+=`100\nAcDbEntity\n`
        s+=`  8\n${this.layer.name}\n`;
        s+=`  6\n${this.lineType}\n`
        s+=` 62\n  ${this.colorIndex}\n`
        s+=`370\n   -1\n`
        s+=`100\nAcDbCircle\n`
        s+=` 10\n${this.x1}\n20\n${this.y1}\n`;
        s+=` 40\n${this.r}\n`
        s+=`100\nAcDbArc\n`
        s+=` 50\n${this.startAngle}\n 51\n${this.endAngle}\n`;
        return s;
    }
}

//module.exports = Arc;
