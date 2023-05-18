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


  let inputsCopy = {...inputs,
    pic: { picUrl: picUrl, picName: picName }}
console.log(inputsCopy);

  return fetch(`${URL}/products/${productId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inputsCopy),
  }).then((res) =>  res.json());
};
