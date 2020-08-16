import {getHandle} from "./handle.js"

export class Layer
{
    constructor(name, colorNumber, lineTypeName)
    {
        this.name = name;
        this.colorNumber = colorNumber===0 ? 0 : (colorNumber || 256)
        this.lineTypeName = lineTypeName;
        this.shapes = [];
        this.trueColor = -1;
        this.handle = getHandle()
    }

    toDxfString()
    {
        let s =""
        s+='  0\nLAYER\n';
        s+=`  5\n${this.handle}\n`
        s+='330\n2\n';
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbLayerTableRecord\n'
        s+= `2\n${this.name}\n`;
        s+=' 70\n0\n';
        if (this.trueColor !== -1)
        {
            s += `420\n${this.trueColor}\n`
        }
        else
        {
            s += ` 62\n${this.colorNumber}\n`;
        }
        s+=`  6\n${this.lineTypeName}\n`;
        s+='370\n0\n'
        s+='390\nF\n'
        return s;        
    }

    setTrueColor(color)
    {
        this.trueColor = color;
    }

    addShape(shape)
    {
        this.shapes.push(shape);
        shape.layer = this;
    }

    getShapes()
    {
        return this.shapes;
    }

    shapesToDxf()
    {
        let s = '';
        for (let i = 0; i < this.shapes.length; ++i)
        {
            s += this.shapes[i].toDxfString();
        } 
        
        
        return s;
    }
}

//module.exports = Layer;
