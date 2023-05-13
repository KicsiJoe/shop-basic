import { app } from "./firebase";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
  listAll,
} from "firebase/storage";

const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const addNewProductFirebase = (inputs) => {
  return fetch(`${URL}/products.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  }).then((res) => res.json());
};
export const editProductServiceFirebase = (inputs, productId) => {
  return fetch(`${URL}/products/${productId}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputs),
  }).then((res) => res.json());
};
export const delProductServiceFirebase = (productId) => {
  console.log(productId);
  return fetch(`${URL}/products/${productId}.json`, { method: "DELETE" }).then(
    (res) => res.json()
  );
};

export const prevPicSetterLoaderFirebase = (
  fileData,
  fileName,
  picUid,
  authId,
  productId
) => {

  if (productId == null) {
    productId = "test";
  }

  const storage = getStorage(app);
  const fileRef = ref(
    storage,
    `images/storePic/${authId}/${productId}/${fileName}`
  );
  return uploadBytes(fileRef, fileData).then((uploadResult) => {
    return getDownloadURL(uploadResult?.ref).then((url) => {
      console.log(url);
      return { url, picUid, picName: fileName , productId}
    });
  });
};

export const delUselessPicFirebase = (
  authId,
  inputs,
  picUrlOld,
  productId,
  fileData
) => {
  console.log(fileData);
  const storage = getStorage();

  // Create a reference to the file to delete
  // const desertRef = ref(
  //   storage,
  //   `images/storePic/${inputs.authId}/${productId}/${fileData.name}`
  // );
  const desertRef = ref(storage, `images/storePic/test`);

  // Delete the file
  deleteObject(desertRef)
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log(error);
    });
};

export const downloadPicsRefsFirebase = (authId, productId) => {
  const storage = getStorage();

  // Create a reference under which you want to list
  const listRef = ref(storage, `images/storePic/${authId}/${productId}`);

  // Find all the prefixes and items.
  return listAll(listRef)
    .then((res) => {
      return res.items.map((item) => item.name);
    })
    .catch((error) => {
      console.log(error);
    });
};
