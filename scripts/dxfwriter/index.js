import {LineType}  from './LineType.js'
import {Layer} from './Layer.js'
import {Line} from './Line.js'
import {Arc} from './Arc.js'
import {Circle} from './Circle.js'
import {Text} from './Text.js'
import {Polyline} from './Polyline.js'
import {Polyline3d} from './Polyline3d.js'
import {Face} from './Face.js'
import {Point} from './Point.js'
import {Spline} from './Spline.js'
import {Dimension} from './Dimension.js'
import {getHandle, resetHandle, resetDHandle, getDHandleList} from "./handle.js"


export class Drawing
{
    constructor()
    {
        resetHandle()
        resetDHandle()
        this.layers = {};
        this.activeLayer = null;
        this.lineTypes = {};
        this.headers = {};

        this.setUnits('Unitless');

        for (let i = 0; i < Drawing.LINE_TYPES.length; ++i)
        {
            this.addLineType(Drawing.LINE_TYPES[i].name,
                             Drawing.LINE_TYPES[i].description,
                             Drawing.LINE_TYPES[i].elements);
        }

        for (let i = 0; i < Drawing.LAYERS.length; ++i)
        {
            this.addLayer(Drawing.LAYERS[i].name,
                          Drawing.LAYERS[i].colorNumber,
                          Drawing.LAYERS[i].lineTypeName);
        }

        this.setActiveLayer('0');
    }
    
    /**
     * @param {string} name
     * @param {string} description
     * @param {array} elements - if elem > 0 it is a line, if elem < 0 it is gap, if elem == 0.0 it is a 
     */
    addLineType(name, description, elements)
    {
        this.lineTypes[name] = new LineType(name, description, elements);
        return this;
    }

    addLayer(name, colorNumber, lineTypeName)
    {
        this.layers[name] = new Layer(name, colorNumber, lineTypeName);
        return this;
    }
    
    setActiveLayer(name)
    {
        this.activeLayer = this.layers[name];
        return this;
    }

    drawLine(x1, y1, x2, y2, lineType, colorIndex)
    {
        this.activeLayer.addShape(new Line(x1, y1, x2, y2, lineType, colorIndex));
        return this;
    }

    drawPoint(x, y)
    {
        this.activeLayer.addShape(new Point(x, y));
        return this;
    }
    
    drawRect(x1, y1, x2, y2)
    {
        this.activeLayer.addShape(new Line(x1, y1, x2, y1));
        this.activeLayer.addShape(new Line(x1, y2, x2, y2));
        this.activeLayer.addShape(new Line(x1, y1, x1, y2));
        this.activeLayer.addShape(new Line(x2, y1, x2, y2));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     * @param {number} startAngle - degree 
     * @param {number} endAngle - degree 
     */
    drawArc(x1, y1, r, startAngle, endAngle, lineType, colorIndex)
    {
        this.activeLayer.addShape(new Arc(x1, y1, r, startAngle, endAngle, lineType, colorIndex));
        return this;
    }

    /**
     * @param {number} x1 - Center x
     * @param {number} y1 - Center y
     * @param {number} r - radius
     */
    drawCircle(x1, y1, r, lineType, colorIndex)
    {
        this.activeLayer.addShape(new Circle(x1, y1, r, lineType, colorIndex));
        return this;
    }

    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} height - Text height
     * @param {number} rotation - Text rotation
     * @param {string} value - the string itself
     * @param {string} [horizontalAlignment="left"] left | center | right
     * @param {string} [verticalAlignment="baseline"] baseline | bottom | middle | top
     */
    drawText(x1, y1, height, rotation, value, horizontalAlignment = 'left', verticalAlignment = 'baseline', lineType, colorIndex)
    {
        this.activeLayer.addShape(new Text(x1, y1, height, rotation, value, horizontalAlignment, verticalAlignment, lineType, colorIndex));
        return this;
    }

    drawDimension(x1, y1, x2, y2, x3, y3, x4, y4, type,  lineType, colorIndex){
        this.activeLayer.addShape(new Dimension(x1, y1, x2, y2, x3, y3, x4, y4, type,  lineType, colorIndex))
        return this
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1], [x2, y2]... ] 
     * @param {boolean} closed - Closed polyline flag
     * @param {number} startWidth - Default start width
     * @param {number} endWidth - Default end width
     */
    drawPolyline(points, closed = false, startWidth = 0, endWidth = 0)
    {
        this.activeLayer.addShape(new Polyline(points, closed, startWidth, endWidth));
        return this;
    }

    /**
     * @param {array} points - Array of points like [ [x1, y1, z1], [x2, y2, z1]... ] 
     */
    drawPolyline3d(points)
    {
        points.forEach(point => {
            if (point.length !== 3){
                throw "Require 3D coordinate"
            }
        });
        this.activeLayer.addShape(new Polyline3d(points));
        return this;
    }

    /**
     * 
     * @param {number} trueColor - Integer representing the true color, can be passed as an hexadecimal value of the form 0xRRGGBB
     */
    setTrueColor(trueColor)
    {
        this.activeLayer.setTrueColor(trueColor);
        return this;
    }

    /**
     * @param {number} x1 - x
     * @param {number} y1 - y
     * @param {number} z1 - z
     * @param {number} x2 - x
     * @param {number} y2 - y
     * @param {number} z2 - z
     * @param {number} x3 - x
     * @param {number} y3 - y
     * @param {number} z3 - z
     * @param {number} x4 - x
     * @param {number} y4 - y
     * @param {number} z4 - z
     */
    drawFace(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4)
    {
        this.activeLayer.addShape(new Face(x1, y1, z1, x2, y2, z2, x3, y3, z3, x4, y4, z4));
        return this;
    }

    drawSpline(type, degree, controlPoints, knots, fitPoints, lineType, colorIndex)
    {
        this.activeLayer.addShape(new Spline(type, degree, controlPoints, knots, fitPoints, lineType, colorIndex));
        return this;
    }
    _getDxfVPortTable(){
        const handle = getHandle()

        let s =""
        s+='  0\nTABLE\n'; //start VPORT TABLE 
        s+='  2\nVPORT\n'
        s+='  5\n8\n'
        s+='330\n0\n'
        s+='100\nAcDbSymbolTable\n'
        s+=' 70\n1\n'
        s+='  0\nVPORT\n'
        s+='  5\n' + handle + '\n'
        s+='330\n2\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbViewportTableRecord\n'
        s+='  2\n*ACTIVE\n'
        s+=' 70\n0\n'
        s+=' 10\n0\n'
        s+=' 20\n0\n'
        s+=' 11\n1\n'
        s+=' 21\n1\n'
        s+=' 12\n463.0863935106166\n'
        s+=' 22\n227.0296841479923\n'
        s+=' 13\n0\n'
        s+=' 23\n0\n'
        s+=' 14\n10\n'
        s+=' 24\n10\n'
        s+=' 15\n10\n'
        s+=' 25\n10\n'
        s+=' 16\n0\n'
        s+=' 26\n0\n'
        s+=' 36\n1\n'
        s+=' 17\n0\n'
        s+=' 27\n0\n'
        s+=' 37\n0\n'
        s+=' 40\n765.4917382007853\n'
        s+=' 41\n1.870283018867924\n'
        s+=' 42\n50\n'
        s+=' 43\n0\n'
        s+=' 44\n0\n'
        s+=' 50\n0\n'
        s+=' 51\n0\n'
        s+=' 71\n0\n'
        s+=' 72\n100\n'
        s+=' 73\n1\n'
        s+=' 74\n3\n'
        s+=' 75\n0\n'
        s+=' 76\n1\n'
        s+=' 77\n0\n'
        s+=' 78\n0\n'
        s+='281\n0\n'
        s+=' 65\n1\n'
        s+='110\n0\n'
        s+='120\n0\n'
        s+='130\n0\n'
        s+='111\n1\n'
        s+='121\n0\n'
        s+='131\n0\n'
        s+='112\n0\n'
        s+='122\n1\n'
        s+='132\n0\n'
        s+=' 79\n0\n'
        s+='146\n0\n'
        s+='348\n10020\n'
        s+=' 60\n7\n'
        s+=' 61\n5\n'
        s+='292\n1\n'
        s+='282\n1\n'
        s+='141\n0\n'
        s+='142\n0\n'
        s+=' 63\n250\n'
        s+='421\n3358443\n'
        s+='  0\nENDTAB\n'

        return s
    }
 
    _getDxfLtypeTable()
    {
        let s = ""
        s+='  0\nTABLE\n'; //start table
        s+='  2\nLTYPE\n';    //name table as LTYPE table
        s+='  5\n5\n'
        s+='330\n0\n'
        s+='100\nAcDbSymbolTable\n'
        s+=' 70\n4\n'
        s+='  0\nLTYPE\n'
        s+='  5\n14\n'
        s+='330\n5\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbLinetypeTableRecord\n'
        s+='  2\nByBlock\n'
        s+=' 70\n0\n'
        s+='  3\n\n'
        s+=' 72\n65\n'
        s+=' 73\n0\n'
        s+=' 40\n0\n'
        s+='  0\nLTYPE\n'
        s+='  5\n15\n'
        s+='330\n5\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbLinetypeTableRecord\n'
        s+='  2\nByLayer\n'
        s+=' 70\n0\n'
        s+='  3\n\n'
        s+=' 72\n65\n'
        s+=' 73\n0\n'
        s+=' 40\n0\n'
        s+='  0\nLTYPE\n'
        s+='  5\n16\n'
        s+='330\n5\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbLinetypeTableRecord\n'
        s+='  2\nContinuous\n'
        s+=' 70\n0\n'
        s+='  3\nSolid line\n'
        s+=' 72\n65\n'
        s+=' 73\n0\n'
        s+=' 40\n0\n'

        for (let lineTypeName in this.lineTypes)
        {
            s += this.lineTypes[lineTypeName].toDxfString()
        }

        s += '  0\nENDTAB\n'; //end table

        return s;
    }

    _getDxfLayerTable()
    {
        let s = "" 
        s+='  0\nTABLE\n'; //start table
        s+='  2\nLAYER\n'; //name table as LAYER table
        s+='  5\n2\n'
        s+='330\n0\n'
        s+='100\nAcDbSymbolTable\n'
        s+='70\n    1\n'
        s+='  0\nLAYER\n';
        s+='  5\n10\n'
        s+='330\n2\n';
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbLayerTableRecord\n'
        s+= ' 2\n0\n'
        s+=' 70\n    0\n';
        s+=' 62\n    7\n';
        s+='  6\nCONTINUOUS\n';
        s+='370\n0\n';
        s+='390\nF\n';
 
        for (let layerName in this.layers)
        {
            s += this.layers[layerName].toDxfString();
        }

        s += '0\nENDTAB\n';

        return s;
    }
    _getDxfStyleTable(){
      const handle = getHandle()
      let s = "" 
      s+='  0\nTABLE\n'
      s+='  2\nSTYLE\n'
      s+='  5\n3\n'
      s+='330\n0\n'
      s+='100\nAcDbSymbolTable\n'
      s+=' 70\n3\n'
      s+='  0\nSTYLE\n'
      s+=`  5\n${handle}\n`
      s+='330\n2\n'
      s+='100\nAcDbSymbolTableRecord\n'
      s+='100\nAcDbTextStyleTableRecord\n'
      s+='  2\nStandard\n'
      s+=' 70\n0\n'
      s+=' 40\n0\n'
      s+=' 41\n1\n'
      s+=' 50\n0\n'
      s+=' 71\n0\n'
      s+=' 42\n1\n'
      s+='  3\ntxt\n'
      s+='  4\n\n'

      const handle2 = getHandle()
      s+='  0\nSTYLE\n'
      s+=`  5\n${handle2}\n`
      s+='330\n2\n'
      s+='100\nAcDbSymbolTableRecord\n'
      s+='100\nAcDbTextStyleTableRecord\n'
      s+='  2\nArial\n'
      s+=' 70\n0\n'
      s+=' 40\n0\n'
      s+=' 41\n1\n'
      s+=' 50\n0\n'
      s+=' 71\n    0\n'
      s+=' 42\n1\n'
      s+='  3\n\n'
      s+='  4\n\n'
      s+='1071\n    0\n'


      s+='  0\nENDTAB\n'    

      return s
    }
    _getDxfViewTable(){
      let s = "" 
      s+='  0\nTABLE\n'
      s+='  2\nVIEW\n'
      s+='  5\n6\n'
      s+='330\n0\n'
      s+='100\nAcDbSymbolTable\n'
      s+=' 70\n0\n'
      s+='  0\nENDTAB\n'    

      return s
    }

    _getDxfUCSTable(){
      let s = "" 
      s+='  0\nTABLE\n'
      s+='  2\nUCS\n'
      s+='  5\n7\n'
      s+='330\n0\n'
      s+='100\nAcDbSymbolTable\n'
      s+=' 70\n0\n'
      s+='  0\nENDTAB\n'

      return s
    }

    _getDxfAPPIDTable(){
      const handle = getHandle()
      let s = "" 
      s+='  0\nTABLE\n'
      s+='  2\nAPPID\n'
      s+='  5\n9\n'
      s+='330\n0\n'
      s+='100\nAcDbSymbolTable\n'
      s+=' 70\n1\n'
      s+='  0\nAPPID\n'
      s+='  5\n12\n'
      s+='330\n9\n'
      s+='100\nAcDbSymbolTableRecord\n'
      s+='100\nAcDbRegAppTableRecord\n'
      s+='  2\nACAD\n'
      s+=' 70\n0\n'
      s+='  0\nAPPID\n'
      s+=`  5\n${handle}\n`
      s+='330\n9\n'
      s+='100\nAcDbSymbolTableRecord\n'
      s+='100\nAcDbRegAppTableRecord\n'
      s+='  2\nMinijsCad\n'
      s+=' 70\n0\n'
      s+='  0\nENDTAB\n'
      return s
    }

    _getDxfDIMSTYLETable(){
      const handle = getHandle()
      let s = "" 
      s+='  0\nTABLE\n'
      s+='  2\nDIMSTYLE\n'
      s+='  5\nA\n'
      s+='330\n0\n'
      s+='100\nAcDbSymbolTable\n'
      s+=' 70\n1\n'
      s+='100\nAcDbDimStyleTable\n'
      s+=' 71\n1\n'
      s+='  0\nDIMSTYLE\n'
      s+=`105\n${handle}\n`
      s+='330\nA\n'
      s+='100\nAcDbSymbolTableRecord\n'
      s+='100\nAcDbDimStyleTableRecord\n'
      s+='  2\nStandard\n'
      s+=' 70\n0\n'
      s+=' 40\n1\n'
      s+=' 41\n2.5\n'
      s+=' 42\n0.625\n'
      s+=' 43\n0.38\n'
      s+=' 44\n1.25\n'
      s+=' 45\n0\n'
      s+=' 46\n0\n'
      s+=' 47\n0\n'
      s+=' 48\n0\n'
      s+=' 49\n1\n'
      s+='140\n2.5\n'
      s+='141\n0.09\n'
      s+='142\n2.5\n'
      s+='143\n25.4\n'
      s+='144\n1\n'
      s+='145\n0\n'
      s+='146\n1\n'
      s+='147\n0.625\n'
      s+='148\n0\n'
      s+=' 71\n0\n'
      s+=' 72\n0\n'
      s+=' 73\n0\n'
      s+=' 74\n1\n'
      s+=' 75\n0\n'
      s+=' 76\n0\n'
      s+=' 77\n0\n'
      s+=' 78\n1\n'
      s+=' 79\n0\n'
      s+='170\n0\n'
      s+='171\n2\n'
      s+='172\n0\n'
      s+='173\n0\n'
      s+='174\n0\n'
      s+='175\n0\n'
      s+='176\n0\n'
      s+='177\n0\n'
      s+='178\n0\n'
      s+='179\n0\n'
      s+='271\n2\n'
      s+='272\n4\n'
      s+='273\n2\n'
      s+='274\n2\n'
      s+='275\n0\n'
      s+='276\n0\n'
      s+='277\n2\n'
      s+='278\n0\n'
      s+='279\n0\n'
      s+='280\n0\n'
      s+='281\n0\n'
      s+='282\n0\n'
      s+='283\n1\n'
      s+='284\n0\n'
      s+='285\n0\n'
      s+='286\n0\n'
      s+='288\n0\n'
      s+='289\n3\n'
      s+='340\nstandard\n'
      s+='341\n\n'
      s+='371\n-2\n'
      s+='372\n-2\n'
      s+='  0\nENDTAB\n'
      return s
    }
    _getDxfBlockRecordTable()
    {
        let s = ""
        s+='  0\nTABLE\n'
        s+='  2\nBLOCK_RECORD\n'
        s+='  5\n1\n'
        s+='330\n0\n'
        s+='100\nAcDbSymbolTable\n'
        s+=' 70\n2\n'
        s+='  0\nBLOCK_RECORD\n'
        s+='  5\n1F\n'
        s+='330\n1\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbBlockTableRecord\n'
        s+='  2\n*Model_Space\n'
        s+=' 70\n0\n'
        s+='280\n1\n'
        s+='281\n0\n'
        s+='  0\nBLOCK_RECORD\n'
        s+='  5\n1E\n'
        s+='330\n1\n'
        s+='100\nAcDbSymbolTableRecord\n'
        s+='100\nAcDbBlockTableRecord\n'
        s+='  2\n*Paper_Space\n'
        s+=' 70\n0\n'
        s+='280\n1\n'
        s+='281\n0\n'

        const dHandleList = getDHandleList()
        dHandleList.forEach(v=>{
          const handle = getHandle()
          
          s+="  0\nBLOCK_RECORD\n"
          s+=`  5\n${handle}\n`
          s+="330\n1\n"
          s+="100\nAcDbSymbolTableRecord\n"
          s+="100\nAcDbBlockTableRecord\n"
          s+=`  2\n${v}\n`
          s+=" 70\n0\n"
          s+="280\n1\n"
          s+="281\n0\n"
        })

        s+='  0\nENDTAB\n'

        return s;
    }
    _getDxfModelSpace(){
        let s = '  0\nBLOCK\n'; //start Model Space
        s+='  5\n20\n'
        s+='330\n1F\n'
        s+='100\nAcDbEntity\n'
        s+='  8\n0\n'
        s+='100\nAcDbBlockBegin\n'
        s+='  2\n*Model_Space\n'
        s+=' 70\n0\n'
        s+=' 10\n0\n'
        s+=' 20\n0\n'
        s+=' 30\n0\n'
        s+='  3\n*Model_Space\n'
        s+='  1\n \n'
        s+='  0\nENDBLK\n'
        s+='  5\n21\n'
        s+='330\n1F\n'
        s+='100\nAcDbEntity\n'
        s+='  8\n0\n'
        s+='100\nAcDbBlockEnd\n'

        return s
    }
    _getDxfPaperSpace(){
        let s =""
        s+='  0\nBLOCK\n'; //start Model Space
        s+='  5\n1C\n'
        s+='330\n1B\n'
        s+='100\nAcDbEntity\n'
        s+='  8\n0\n'
        s+='100\nAcDbBlockBegin\n'
        s+='  2\n*Paper_Space\n'
        s+=' 70\n0\n'
        s+=' 10\n0\n'
        s+=' 20\n0\n'
        s+=' 30\n0\n'
        s+='  3\n*Paper_Space\n'
        s+='  1\n \n'
        s+='  0\nENDBLK\n'
        s+='  5\n1D\n'
        s+='330\n1F\n'
        s+='100\nAcDbEntity\n'
        s+='  8\n0\n'
        s+='100\nAcDbBlockEnd\n'

        return s
    }
    _getDxfBlock(){
        let s =""

        const dHandleList = getDHandleList()

        dHandleList.forEach(v=>{
          const handle1 = getHandle()
          const handle2 = getHandle()
          const handle3 = getHandle()
 
          s+='  0\nBLOCK\n'; //start Model Space
          s+=`  5\n${handle2}\n`
          s+=`330\n${handle1}\n`
          s+='100\nAcDbEntity\n'
          s+='  8\n0\n'
          s+='100\nAcDbBlockBegin\n'
          s+=`  2\n${v}\n`
          s+=' 70\n0\n'
          s+=' 10\n0\n'
          s+=' 20\n0\n'
          s+=' 30\n0\n'
          s+=`  3\n${v}\n`
          s+='  1\n \n'
          s+='  0\nENDBLK\n'
          s+=`  5\n${handle3}\n`
          s+=`330\n${handle1}\n`
          s+='100\nAcDbEntity\n'
          s+='  8\n0\n'
          s+='100\nAcDbBlockEnd\n'
        })

        return s
    }

    _getDxfObjects(){
      let s = ''
      s+='  0\nDICTIONARY\n'
      s+='  5\nC\n'
      s+='330\n0\n'
      s+='100\nAcDbDictionary\n'
      s+='281\n1\n'
      s+='  3\nACAD_GROUP\n'
      s+='350\nD\n'
      s+='  0\nDICTIONARY\n'
      s+='  5\nD\n'
      s+='330\nC\n'
      s+='100\nAcDbDictionary\n'
      s+='281\n1\n'

      return s
    }
     /**
      * @see https://www.autodesk.com/techpubs/autocad/acadr14/dxf/header_section_al_u05_c.htm
      * @see https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
      * 
      * @param {string} variable 
      * @param {array} values Array of "two elements arrays". [  [value1_GroupCode, value1_value], [value2_GroupCode, value2_value]  ]
      */
    header(variable, values) {
        this.headers[variable] = values;
        return this;
    }

    _getHeader(variable, values){
        let s = '  9\n$'+ variable +'\n';

        for (let value of values) {
            const key = ("   " + String(value[0])).slice(-3)
            s += `${key}\n${value[1]}\n`;
        }

        return s;
    }

    /**
     * 
     * @param {string} unit see Drawing.UNITS
     */
    setUnits(unit) {
        let value = (typeof Drawing.UNITS[unit] != 'undefined') ? Drawing.UNITS[unit]:Drawing.UNITS['Unitless'];
        //this.header('INSUNITS', [[70, Drawing.UNITS[unit]]]);
        return this;
    }

    toDxfString()
    {
        let s = '';

        s+="999\ndxfrw 0.0.0\n"
        //start section
        s += '  0\nSECTION\n';
        //name section as HEADER section
        s += '  2\nHEADER\n';

        for (let header in this.headers) {
            s += this._getHeader(header, this.headers[header]);
        }

        //end section
        s += '  0\nENDSEC\n';

        //start section
        s += '  0\nSECTION\n';
        //name section as CLASSES section
        s += '  2\nCLASSES\n';
        //end section
        s += '  0\nENDSEC\n';
 
        //start section
        s += '  0\nSECTION\n';
        //name section as TABLES section
        s += '  2\nTABLES\n';

        s += this._getDxfVPortTable()
        s += this._getDxfLtypeTable()
        s += this._getDxfLayerTable()
        s += this._getDxfStyleTable()
        s += this._getDxfViewTable()
        s += this._getDxfUCSTable()
        s += this._getDxfAPPIDTable()
        s += this._getDxfDIMSTYLETable()
        s += this._getDxfBlockRecordTable();

        //end section
        s += '  0\nENDSEC\n';

        //start section
        s += '  0\nSECTION\n';
        //name section as BLOCKS section
        s += '  2\nBLOCKS\n';
        s += this._getDxfModelSpace()
        s += this._getDxfPaperSpace()
        s += this._getDxfBlock()

        //end section
        s += '  0\nENDSEC\n';
 

        //ENTITES section
        s += '  0\nSECTION\n';
        s += '  2\nENTITIES\n';

        for (let layerName in this.layers)
        {
            let layer = this.layers[layerName];
            s += layer.shapesToDxf();
            // let shapes = layer.getShapes();
        }

        s += '  0\nENDSEC\n';

        //OBJECTS section
        s += '  0\nSECTION\n';
        s += '  2\nOBJECTS\n';
        s += this._getDxfObjects()
        s += '  0\nENDSEC\n';




        //close file
        s += '  0\nEOF';

        return s;
    }

}

//AutoCAD Color Index (ACI)
//http://sub-atomic.com/~moses/acadcolors.html
Drawing.ACI = 
{
    LAYER : 0,
    RED : 1,
    YELLOW : 2,
    GREEN : 3,
    CYAN : 4,
    BLUE : 5,
    MAGENTA : 6,
    WHITE : 7
}

Drawing.LINE_TYPES = 
[
//    {name: 'CONTINUOUS', description: '______', elements: []},
//    {name: 'DASHED',    description: '_ _ _ ', elements: [5.0, -5.0]},
//    {name: 'DOTTED',    description: '. . . ', elements: [0.0, -5.0]}
]

Drawing.LAYERS = 
[
//    {name: '0',  colorNumber: Drawing.ACI.WHITE, lineTypeName: 'CONTINUOUS'}
]

//https://www.autodesk.com/techpubs/autocad/acad2000/dxf/header_section_group_codes_dxf_02.htm
Drawing.UNITS = {
    'Unitless':0,
    'Inches':1,
    'Feet':2,
    'Miles':3,
    'Millimeters':4,
    'Centimeters':5,
    'Meters':6,
    'Kilometers':7,
    'Microinches':8,
    'Mils':9,
    'Yards':10,
    'Angstroms':11,
    'Nanometers':12,
    'Microns':13,
    'Decimeters':14,
    'Decameters':15,
    'Hectometers':16,
    'Gigameters':17,
    'Astronomical units':18,
    'Light years':19,
    'Parsecs':20
}

