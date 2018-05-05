"user strict"

const readFile=(file)=>{
  return new Promise((resolve,reject)=>{
    const filename = file.name;
    const lastDotPosition = filename.lastIndexOf('.');
    const bareFilename = filename.substr(0, lastDotPosition);
    const fileExtension = filename.substr(lastDotPosition+1).toLowerCase();
    const reader = new FileReader();

    reader.onload =(e)=> {
      const text = e.target.result;
      const data = {
        filename: filename,
        barefilename: filename,
        ext: fileExtension,
        text: text,
      } 
      console.log(`read ${filename}`)
      resolve(data);
      reject("error");
    }
    reader.readAsText(file, 'UTF-8');
  });//end of Promise
}//end of readFile
 
const readAll = (fileList,result,reject,callback) =>{
  console.log("start to read files")
  const promise = [];
  for(let file of fileList){
    promise.push(readFile(file))
  }
  Promise.all(promise)
    .then(values=>{
      console.log("finish reading files")
      callback && callback(values);
      result(values)
      reject("error")
    });
}

export const  importFiles = (elem, callback)=> {
  return new Promise((result, reject)=>{
    elem.onchange = (e) => {
      const fileList = e.target.files;
      readAll(fileList,result,reject, callback)
    }
    elem.onclick = (e) => {
      e.stopPropagation();
      e.target.value = null;
    }
    elem.click(); //fire click event
  })
}
