import {
  addNewProductFirebase,
  delProductServiceFirebase,
  editProductServiceFirebase,
  getUsersNameWithIdFirebase,
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
      if (res != null || res != undefined) {
        return Object.entries(res);
      } else {
        return [];
      }
    });
  } else {
    return getProducts(what).then((res) => {
      if (res != null || res != undefined) {
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

  return updateItemFirebase(
    inputs,
    res.authId,
    res.productId,
    res.picUrl,
    res.picName
  ).then((res) => {
    return productId;
  });
};

export const updateWithId = (itemId, authId, setInputs) => {
  return updateWithIdFirebase(itemId, authId).then((res) => {
    if (setInputs != undefined) {
      setInputs((prev) => ({ ...prev, productId: itemId }));
    }
    return { name: itemId };
  });
};

export const getUsersNameWithId = () => {
  return getUsersNameWithIdFirebase().then((res) => {
    let fullArr = Object.entries(res);
    let authIdWithUserName = [];
    fullArr.forEach(([authId, obj]) => {
      authIdWithUserName.push({ [authId]: obj.userName });
    });
    return authIdWithUserName;
  });
};
