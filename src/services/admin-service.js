import {
  addNewProductFirebase,
  delProductServiceFirebase,
  editProductServiceFirebase,
} from "../repositories/admin";
import { updateItemFirebase, updateWithIdFirebase } from "../repositories/crud";
import { getProducts } from "../repositories/getProduct";
import {
  delUselessPicFirebase,
  downloadPicsRefsFirebase,
} from "../repositories/pic-repo.js";
import { delAllPic } from "./pic-service";
import { checkInputs } from "./utilities";

export const addNewProductService = (inputs) => {
  if (checkInputs(inputs)) {
    return addNewProductFirebase(inputs).then((res) => {
      console.log(res.name);
      return res.name;
    });
  } else {
    return Promise.reject("HIBA A KITÖLTÉSNÉL!");
  }
};
export const editProductService = (inputs, productId) => {
  if (checkInputs(inputs)) return editProductServiceFirebase(inputs, productId);
  else return Promise.reject("HIBA A KITÖLTÉSNÉL!");
};
export const delProductService = (productId, authId) => {
  return delProductServiceFirebase(productId).then((res) =>
    delAllPic(authId, productId)
  );
};

export const getProductsData = (what) => {
  if (what == "all") {
    return getProducts(what).then((res) => {
      // console.log(res);
      if (res != null || res != undefined) {
        // console.log(Object.entries(res));
        return Object.entries(res);
      } else {
        return [];
      }
    });
  } else {
    return getProducts(what).then((res) => {
      if (res != null || res != undefined) {
        // console.log(res);
        return res;
      } else {
        return [];
      }
    });
  }
};

export const delUselessPic = (authId, images) => {
  return delUselessPicFirebase(authId, images);
};

export const downloadPicsRefs = (authId, productId) => {
  return downloadPicsRefsFirebase(authId, productId);
};

export const updateItem = (inputs, res) => {
  // { authId, productId, picUrl: url, picName: fileName } == res
  let productId = res.productId;
  console.log(res.picUrl);
  return updateItemFirebase(
    inputs,
    res.authId,
    res.productId,
    res.picUrl,
    res.picName
  ).then((res) => {
    console.log(res);
    console.log(productId);

    return productId;
  });
};

export const updateWithId = (itemId, authId, setInputs) => {
  console.log(itemId);
  return updateWithIdFirebase(itemId, authId).then((res) => {
    if (setInputs != undefined) {
      setInputs((prev) => ({ ...prev, productId: itemId }));
    }
    return { name: itemId };
  });
};
