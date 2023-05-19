import { app } from "./firebase";
import { getStorage, ref, getDownloadURL, listAll } from "firebase/storage";
const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const updateItemFirebase = (
  inputs,
  authId,
  productId,
  picUrl,
  picName
) => {
  let newInp = { ...inputs, productId: productId };

  let inputsCopy = { ...newInp, pic: { picUrl: picUrl, picName: picName } };

  return fetch(`${URL}/products/${productId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputsCopy),
  }).then((res) => res.json());
};

export const updateWithIdFirebase = (itemId, authId) => {
  return fetch(`${URL}/products/${itemId}/.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId: itemId }),
  })
    .then((res) => res.json())
    .then((res) => {
      return res;
    });
};
