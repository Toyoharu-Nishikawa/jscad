import {getHandle} from "./handle.js"

export class LineType
{
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    constructor(name, description, elements)
    {
        this.name = name;
        this.description = description;
        this.elements = elements;
    }

    /**
     * @link https://www.autodesk.com/techpubs/autocad/acadr14/dxf/ltype_al_u05_c.htm
     */
    toDxfString()
    {
        const handle = getHandle()
        let s = ""
        s+='  0\nLTYPE\n';
        s+=`  5\n${handle}\n`
        s+='330\n5\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbLinetypeTableRecord\n'
        s+=`  2\n${this.name}\n`;
        s+=' 70\n64\n'
        s+=`  3\n${this.description}\n`;
        s+=' 72\n65\n'
        s+=` 73\n${this.elements.length}\n`;
        s+=` 40\n${this.getElementsSum()}\n`;

        for (let i = 0; i < this.elements.length; ++i)
        {
            s += ` 49\n${this.elements[i]}\n`
            s += ` 74\n   0\n`
        }

        return s;
    }

    getElementsSum()
    {
        let sum = 0;
        for (let i = 0; i < this.elements.length; ++i)
        {
            sum += Math.abs(this.elements[i]);
        }

        return sum;
    }
}

//module.exports = LineType;
