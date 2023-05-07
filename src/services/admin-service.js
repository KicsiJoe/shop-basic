import {
  addNewProductFirebase,
  delProductServiceFirebase,
  editProductServiceFirebase,
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
