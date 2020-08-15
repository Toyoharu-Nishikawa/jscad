let handle = 0x30

export const getHandle = () =>{
  handle += 0x1
  const str = handle.toString(16).toUpperCase()
  return str 
}

export const resetHandle = () =>{
  handle = 0x30
}
