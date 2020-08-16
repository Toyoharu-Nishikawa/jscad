let handle = 0x30
let dHandle = 0

export const getHandle = () =>{
  handle += 0x1
  const str = handle.toString(16).toUpperCase()
  return str 
}

export const resetHandle = () =>{
  handle = 0x30
}

export const getDHandle = () => {
  dHandle += 1
  const str = "*D" + String(dHandle)
  return str
}

export const resetDHandle = () => {
  dHandle = 0
}

export const getCurrentHandle = () =>{
  const str = handle.toString(16).toUpperCase()
  return str 
}

export const getDHandleList = () => {
  const list = [...Array(dHandle)].map((v,i)=>"*D"+String(i+1))
  return list 
}

