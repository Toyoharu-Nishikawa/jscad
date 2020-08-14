import {getHandle} from "./handle.js"

export class Line
{
    constructor(x1, y1, x2, y2, lineType)
    {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.lineType = lineType || "ByLayer"
    }

    toDxfString()
    {
        //https://www.autodesk.com/techpubs/autocad/acadr14/dxf/line_al_u05_c.htm
        const handle = getHandle()
        let s = ""
        s+=`  0\nLINE\n`;
        s+=`  5\n${handle}\n`;
        s+=`100\nAcDbEntity\n`
        s+=`  8\n${this.layer.name}\n`;
        s+=`  6\n${this.lineType}\n`;
        s+=` 62\n  256\n`
        s+=`370\n   -1\n`
        s+=`100\nAcDbLine\n`
        s+=` 10\n${this.x1}\n 20\n${this.y1}\n 30\n0\n`;
        s+=` 11\n${this.x2}\n 21\n${this.y2}\n 31\n0\n`;
        return s;
    }
}

//module.exports = Line;
