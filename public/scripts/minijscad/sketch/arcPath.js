export const arcPath = (cx,cy,r,theta1, theta2)=>{
  const thetaRad1 = theta1*Math.PI/180
  const thetaRad2 = theta2*Math.PI/180
  const x1 = cx + r*Math.cos(thetaRad1)
  const y1 = cy + r*Math.sin(thetaRad1)
  const x2 = cx + r*Math.cos(thetaRad2)
  const y2 = cy + r*Math.sin(thetaRad2)
  const s = 0
  const f1 = (theta2 > theta1 && theta2-theta1 < 180) ?  0 :
             (theta2 < theta1 && (theta2+360)- theta1 < 180) ? 0 :
             1
  //Math.abs(theta2 -theta1)< 180 ? 0 :1
  const f2 = 1 //theta2 >theta1 ? 1 :0
  const pathText = `M${x1} ${y1} A${r} ${r} ${s} ${f1} ${f2} ${x2} ${y2}`
  return pathText
}

export const ellipticalArcPath = (cx,cy,rx,ry,rotation, theta1, theta2)=>{
  const thetaRad1 = theta1*Math.PI/180
  const thetaRad2 = theta2*Math.PI/180
  const rotationRad = rotation*Math.PI/180
  const r1 = 1/Math.sqrt(1/rx**2*Math.cos(thetaRad1)**2+1/ry**2*Math.sin(thetaRad1)**2)
  const r2 = 1/Math.sqrt(1/rx**2*Math.cos(thetaRad2)**2+1/ry**2*Math.sin(thetaRad2)**2)
  const X1 = r1*Math.cos(thetaRad1)
  const Y1 = r1*Math.sin(thetaRad1)
  const X2 = r2*Math.cos(thetaRad2)
  const Y2 = r2*Math.sin(thetaRad2)


  const x1 = cx + X1*Math.cos(rotationRad) - Y1*Math.sin(rotationRad)
  const y1 = cy + X1*Math.sin(rotationRad) + Y1*Math.cos(rotationRad)
  const x2 = cx + X2*Math.cos(rotationRad) - Y2*Math.sin(rotationRad)
  const y2 = cy + X2*Math.sin(rotationRad) + Y2*Math.cos(rotationRad)

  const s = rotation 
  const f1 = (theta2 > theta1 && theta2-theta1 < 180) ?  0 :
             (theta2 < theta1 && (theta2+360)- theta1 < 180) ? 0 :
             1
  //Math.abs(theta2 -theta1)< 180 ? 0 :1
  const f2 = 1 //theta2 >theta1 ? 1 :0
  const pathText = `M${x1} ${y1} A${rx} ${ry} ${s} ${f1} ${f2} ${x2} ${y2}`
  return pathText
}
