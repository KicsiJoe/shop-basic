import {
  addNewProductFirebase,
  delProductServiceFirebase,
  editProductServiceFirebase,
  prevPicSetterLoaderFirebase,
} from "../repositories/admin";
import { getProducts } from "../repositories/getProduct";

export const addNewProductService = (inputs) => {
  return addNewProductFirebase(inputs);
};
export const editProductService = (inputs, productId) => {
  return editProductServiceFirebase(inputs, productId);
};
export const delProductService = (productId) => {
  return delProductServiceFirebase(productId);
};

export const getProductsData = (what) => {
  if (what == "all") {
    return getProducts(what).then((res) => Object.entries(res));
  } else {
    return getProducts(what);
  }
};

export const prevPicSetterLoader=(fileData,picUid, getStorage,ref,uploadBytes,getDownloadURL, setUploadedUrlWithId )=>{
  const fileExtension = fileData.name.split('.').at(-1);
  return prevPicSetterLoaderFirebase(fileData,fileExtension ,picUid, getStorage,ref,uploadBytes,getDownloadURL, setUploadedUrlWithId )
 }
