"use strict"
import {arcPath} from "./arcPath.js"

export const addExtendElements = ()=>{
  SVG.Arc = SVG.invent({
    create: "path",
    inherit: SVG.Shape,
    extend: {
      size: function(cx,cy,r,theta1, theta2){
        const pathText = arcPath(cx,cy,r,theta1, theta2) 
        return this.attr({d: pathText})
      }
    },
    construct: {
      arc: function(cx, cy, r, theta1, theta2){
        return this.put(new SVG.Arc).size(cx,cy,r,theta1,theta2)
      }
    }
  })
}
