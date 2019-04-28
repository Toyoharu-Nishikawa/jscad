const sumOfSqure = (x1, x2)=>{
  let sum = 0
  let nrc = x1.length
  for(let i=0;i<nrc;i++){
    sum += (x1[i]-x2[i])**2
  }
  return sum
}

export const makeGaussKernel = (beta)=> (x1, x2)=> Math.exp(-beta*sumOfSqure(x1,x2))  



