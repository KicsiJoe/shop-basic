
import { app } from "./firebase";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
  listAll,
} from "firebase/storage";


export const getOnePicUrlFromFirebase = (picName, path) => {
  console.log(`${path}/${picName}`);
  const storage = getStorage(app);

  let spaceRef = ref(storage, `${path}/${picName}`);

  return getDownloadURL(spaceRef);
};

export const savePicFirebase = (authId, productId, imageData) => {
  let fileName = imageData.name;
  const storage = getStorage(app);
  const fileRef = ref(
    storage,
    `images/storePic/${authId}/${productId}/${fileName}`
  );
  console.log("savePicFirebase");
  return uploadBytes(fileRef, imageData).then((uploadResult) => {
    return getDownloadURL(uploadResult?.ref).then((url) => {
      return { authId, productId, picUrl: url, picName: fileName };
    });
  });
};



export const prevPicSetterLoaderFirebase = (
  fileData,
  fileName,
  inputs,
  productId
) => {
  if (productId == null) {
    productId = "test";
  } else {
    productId = `${productId}`;
  }

  // console.log(fileName);
  const storage = getStorage(app);
  const fileRef = ref(
    storage,
    `images/storePic/${inputs.authId}/${productId}/${fileName}`
  );
  return uploadBytes(fileRef, fileData).then((uploadResult) => {
    return getDownloadURL(uploadResult?.ref).then((url) => {
  
      // console.clear()
      // console.log({ picUrl: url, picName: fileName });
      return { picUrl: url, picName: fileName, file: fileData, map: `${productId}`};
    });
  });
};

export const delUselessPicFirebase = (authId, images) => {
  const storage = getStorage();
  images.map((img) => {
    // console.log(img);
    const desertRef = ref(storage, `images/storePic/${authId}/test/${img}`);

    // Delete the file
    deleteObject(desertRef)
      .then(() => {
        return;
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

export const downloadPicsRefsFirebase = (authId, productId) => {
  const storage = getStorage();
  if (productId == null) {
    productId = "test";
  } else {
    productId = `${productId}/test`;
  }
  // Create a reference under which you want to list
  const listRef = ref(storage, `images/storePic/${authId}/${productId}`);
  // const listRef = ref(storage, `images/storePic/${authId}/${productId}`);

  // Find all the prefixes and items.
  return listAll(listRef)
    .then((res) => {
      return res.items.map((item) => item.name);
    })
    .catch((error) => {
      console.log(error);
    });
};