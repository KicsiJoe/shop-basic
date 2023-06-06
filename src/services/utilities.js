import {
  getOnePicUrlFromFirebase,
  savePicFirebase,
} from "../repositories/pic-repo";
import { productId_quantityToCards } from "./cart-services";


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
  return savePicFirebase(userId, itemId, imageData);
};

export const timeFormatter = (separator1, tLetter, separator2, hide) => {
  let date = new Date();
  // let dateTime = timeFormatter( '', '', '', true);
  // let dateTime1 = timeFormatter( '-', 'T', ':', false);
  // let dateTime2 = timeFormatter( '', '', '', false);
  // let dateTime3 = timeFormatter( '-', ' ', ':', true);

  // 20230522144602
  // 2023-05-22T14:46:02(+2)
  // 20230522144602(+2)
  //2023-06-01 22:00:01

  const tzOffset = -date.getTimezoneOffset() / 60;
  const diff = tzOffset >= 0 ? "+" : "-";
  let tz = "";
  if (!hide) {
    tz = "(" + diff + tzOffset + ")";
  }
  const pad = (n) => `${Math.floor(Math.abs(n))}`.padStart(2, "0");
  return (
    date.getFullYear() +
    separator1 +
    pad(date.getMonth() + 1) +
    separator1 +
    pad(date.getDate()) +
    tLetter +
    pad(date.getHours()) +
    separator2 +
    pad(date.getMinutes()) +
    separator2 +
    pad(date.getSeconds()) +
    tz
  );
};

export const cardObjWithIdToFBform = (objWithId) => {
  let newObj = {};
  objWithId.forEach(([obj, quantity]) => {
    let prodId = obj["productId"];
    newObj = { ...newObj, [prodId]: quantity };
  });
  return newObj;
};
export const FbformToCartForm=(orderItems, callback) => {
  console.log(orderItems);
  productId_quantityToCards(orderItems, callback)

};
