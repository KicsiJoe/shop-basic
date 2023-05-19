import {
  delUselessPicFirebase,
  downloadPicsRefsFirebase,
  prevPicSetterLoaderFirebase,
} from "../repositories/pic-repo";

export const prevPicSetterLoader = (
  newImage,
  inputs,
  setImageInput,
  productId
) => {
  // const fileExtension = fileData.name.split('.').at(-1);
  return prevPicSetterLoaderFirebase(
    newImage,
    newImage.name,
    inputs,
    productId
  ).then((res) => {
    setImageInput(res);
    return res;
  });
};

export const delUselessPics = (inputs, map) => {
  console.log(inputs);
  downloadPicsRefsFirebase(inputs.authId, map, inputs.pic.picName).then((res) =>
    res.forEach((onePicName) => {
      if (onePicName != inputs.pic.picName) {
        return delUselessPicFirebase(map, onePicName, inputs.authId);
      }
    })
  );
};

export const delAllPic=(authId ,productId)=>{
 return downloadPicsRefsFirebase(authId, productId).then((res) =>
 res.forEach((onePicName) => {
 
     return delUselessPicFirebase(productId, onePicName, authId);
   
 }))
}
