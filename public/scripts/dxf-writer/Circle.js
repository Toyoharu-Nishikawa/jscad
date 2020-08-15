import {getHandle} from "./handle.js"

export class Circle
{
    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    constructor(x1, y1, r, lineType, colorIndex)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.r = r;
        this.lineType = lineType || "ByLayer"
        this.colorIndex = colorIndex === 0 ? 0 : (colorIndex || 256 )
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/circle_al_u05_c.htm

        const handle = getHandle()

        let s = ""
        s+=`  0\nCIRCLE\n`;
        s+=`  5\n${handle}\n`
        s+=`100\nAcDbEntity\n`
        s+=`  8\n${this.layer.name}\n`;
        s+=`  6\n${this.lineType}\n`
        s+=` 62\n  ${this.colorIndex}\n`
        s+=`370\n   -1\n`
        s+=`100\nAcDbCircle\n`
        s+=` 10\n${this.x1}\n20\n${this.y1}\n`;
        s+=` 40\n${this.r}\n`;
        return s;
    }
}

//module.exports = Circle;
