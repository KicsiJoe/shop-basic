import { app } from "./firebase";

const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const addNewProductFirebase = (inputs) => {
  return fetch(`${URL}/products.json`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(inputs) }).then(res=> res.json())
};
export const editProductServiceFirebase = (inputs, productId) => {
 return fetch(`${URL}/products/${productId}.json`, { method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(inputs) }).then(res=> res.json())
};
export const delProductServiceFirebase = (productId) => {
  console.log(productId);
 return fetch(`${URL}/products/${productId}.json`, { method: "DELETE" }).then(res=> res.json())
};

export const prevPicSetterLoaderFirebase=(fileData, fileExtension,picUid, getStorage,ref,uploadBytes,getDownloadURL, setUploadedUrlWithId )=>{
  
     const storage = getStorage(app)
  const fileRef = ref(storage, `images/storePic/admin/test/test.${fileExtension}`)
  return uploadBytes(fileRef, fileData)
  .then((uploadResult) => {
    getDownloadURL(uploadResult?.ref)
    .then(url => {
      console.log({url, picUid});
      setUploadedUrlWithId({url, picUid});
    })
  })
 }

