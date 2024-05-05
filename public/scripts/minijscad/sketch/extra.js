"use strict"
import {arcPath, ellipticalArcPath} from "./arcPath.js"

export const addExtendElements = (SVG)=>{
  const Arc = class extends SVG.Path{
    // Create method to proportionally scale the rounded corners
    size(cx,cy,r,theta1, theta2){
      const pathText = arcPath(cx,cy,r,theta1, theta2) 
      return this.attr({d: pathText})
    }
  }
  const EllipticalArc = class extends SVG.Path{
    // Create method to proportionally scale the rounded corners
    size(cx,cy,rx,ry,rotation,theta1, theta2){
      const pathText = ellipticalArcPath(cx,cy,rx,ry,rotation,theta1, theta2) 
      return this.attr({d: pathText})
    }
  }

  SVG.extend(SVG.Container,  {
    // Create a rounded element
    arc: function(cx, cy, r, theta1, theta2){
      return this.put(new Arc).size(cx,cy,r,theta1,theta2)
    },
    ellipticalArc: function(cx, cy, rx,ry,rotation, theta1, theta2){
      return this.put(new EllipticalArc).size(cx,cy,rx,ry,rotation,theta1,theta2)
    }
  })
}

//export const addExtendElements = ()=>{
//  SVG.Arc = SVG.invent({
//    create: "path",
//    inherit: SVG.Shape,
//    extend: {
//      size: function(cx,cy,r,theta1, theta2){
//        const pathText = arcPath(cx,cy,r,theta1, theta2) 
//        return this.attr({d: pathText})
//      }
//    },
//    construct: {
//      arc: function(cx, cy, r, theta1, theta2){
//        return this.put(new SVG.Arc).size(cx,cy,r,theta1,theta2)
//      }
//    }
//  })
//  SVG.EllipticalArc = SVG.invent({
//    create: "path",
//    inherit: SVG.Shape,
//    extend: {
//      size: function(cx,cy,rx,ry,rotation,theta1, theta2){
//        const pathText = ellipticalArcPath(cx,cy,rx,ry,rotation,theta1, theta2) 
//        return this.attr({d: pathText})
//      }
//    },
//    construct: {
//      ellipticalArc: function(cx, cy, rx,ry,rotation, theta1, theta2){
//        return this.put(new SVG.EllipticalArc).size(cx,cy,rx,ry,rotation,theta1,theta2)
//      }
//    }
//  })
//}

