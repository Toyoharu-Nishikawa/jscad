let handle = 0x30

export const getHandle = () =>{
  handle += 0x1
  return handle
}

export const resetHandle = () =>{
  handle = 0x30
}
