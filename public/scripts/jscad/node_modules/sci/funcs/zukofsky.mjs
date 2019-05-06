"strict"

export const zukofsky = (x0, y0, c) => {
  const b = c/4 
  const a = Math.sqrt((b-x0)**2+y0**2)

  const z = t =>[a*Math.cos(t)+x0,a*Math.sin(t)+y0]

  const invZ = t =>{
    const w = (a*Math.cos(t)+x0)**2+(a*Math.sin(t)+y0)**2
    return [(a*Math.cos(t)+x0)/w,-(a*Math.sin(t)+y0)/w ] 
  }

  const zeta = t => {
    const temp1 = z(t)
    const temp2 = invZ(t)
    const temp3 = [
      temp1[0] + b**2*temp2[0],
      temp1[1] + b**2*temp2[1]
    ]
    return temp3
  }
  return zeta
}

