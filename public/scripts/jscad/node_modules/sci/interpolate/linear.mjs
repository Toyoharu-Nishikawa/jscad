export const linear = (x, y)=>{
  return (x0)=>{
    const index= x.reduce((pre,current,i)=>current <= x0 ? i : pre, 0)
    const i = index === x.length-1 ? x.length-2 : index

    return (y[i+1]-y[i])/(x[i+1]-x[i])*(x0-x[i])+y[i]
  } 
}

