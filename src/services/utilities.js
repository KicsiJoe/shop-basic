import {
  getOnePicUrlFromFirebase,
  savePicFirebase,
} from "../repositories/pic-repo";

export function checkInputs(inputs) {
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

export const getOnePicUrl = (picName, path) => {
  return getOnePicUrlFromFirebase(picName, path);
};

export const savePic = (userId, itemId, imageData) => {
  return savePicFirebase(userId, itemId, imageData)
};
