let handle = 0x30
let dHandle = 1

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
  dHandle = 1
}
