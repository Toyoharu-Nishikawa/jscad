export const sumList = list => list.reduce((p,c)=>{
  const pre = p.length > 0 ? p[p.length-1] : 0
  p.push(pre+c)
  return p
},[])
