import {
  addNewProductFirebase,
  delProductServiceFirebase,
  delUselessPicFirebase,
  downloadPicsRefsFirebase,
  editProductServiceFirebase,
  prevPicSetterLoaderFirebase,
} from "../repositories/admin";
import { getProducts } from "../repositories/getProduct";

export const addNewProductService = (inputs) => {
  if (checkInputs(inputs)) return addNewProductFirebase(inputs);
  else {
    return Promise.reject("HIBA A KITÖLTÉSNÉL!");
  }
};
export const editProductService = (inputs, productId) => {
  return editProductServiceFirebase(inputs, productId);
};
export const delProductService = (productId) => {
  return delProductServiceFirebase(productId);
};

export const getProductsData = (what) => {
  if (what == "all") {
    return getProducts(what).then((res) => {
      console.log(res);
      if (res != null || res != undefined) {
        console.log(Object.entries(res));
        return Object.entries(res);
      } else {
        return [];
      }
    });
  } else {
    return getProducts(what).then((res) => {
      if (res != null || res != undefined) {
        console.log(res);
        return res;
      } else {
        return [];
      }
    });
  }
};

export const prevPicSetterLoader = (
  fileData,
  picUid,
  setInputs,
  inputs,
  authId,
  productId
) => {
  // const fileExtension = fileData.name.split('.').at(-1);
  return prevPicSetterLoaderFirebase(
    fileData,
    fileData.name,
    picUid,
    authId,
    productId
  ).then((res) => {
    console.log({
      ...inputs,
      pic: { picUrl: res.url, picUid: picUid, picName: fileData.name },
      authId,
      path: res[1],
    });
    setInputs(
      {
        ...inputs,
        pic: { picUrl: res.url, picUid: picUid, picName: fileData.name },
        authId,
      }
    );
    return res.path;
  });
};

export const delUselessPic = (
  authId,
  inputs,
  picUrlOld,
  productId,
  fileData
) => {
  return delUselessPicFirebase(authId, inputs, picUrlOld, productId, fileData);
};

function checkInputs(inputs) {
  if (
    inputs.price.length == 0 ||
    inputs.title.length == 0 ||
    inputs["item-number"].length == 0
  ) {
    return false;
  } else {
    return true;
  }
}

export const downloadPicsRefs = (authId, productId) => {
  return downloadPicsRefsFirebase(authId, productId);
};
