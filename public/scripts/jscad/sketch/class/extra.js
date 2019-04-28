"use strict"
export const addExtendElements = ()=>{
  SVG.Arc = SVG.invent({
    create: "path",
    inherit: SVG.Shape,
    extend: {
      size: function(cx,cy,r,theta1, theta2){
        const thetaRad1 = theta1*Math.PI/180
        const thetaRad2 = theta2*Math.PI/180
        const x1 = cx + r*Math.cos(thetaRad1)
        const y1 = cy + r*Math.sin(thetaRad1)
        const x2 = cx + r*Math.cos(thetaRad2)
        const y2 = cy + r*Math.sin(thetaRad2)
        const s = 0
        const f1 = Math.abs(theta2 -theta1)< 180 ? 0 :1
        const f2 = theta2 >theta1 ? 1 :0
        const pathText = `M${x1} ${y1} A${r} ${r} ${s} ${f1} ${f2} ${x2} ${y2}`
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
