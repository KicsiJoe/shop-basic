import { prevPicSetterLoaderFirebase } from "../repositories/pic-repo";

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

export const delUselessPics =(inputs, imageInput )=>{
    console.log(imageInput);
    console.log(inputs);
    // downloadPicsRefsFirebase(inputs.authId, productId)
}
