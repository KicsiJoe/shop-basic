import {
  getCartItemsFirebase,
  getUserCartFirebase,
  updateUserOwnCartFirebase,
} from "../repositories/cart-repo";
import { getProductsData } from "./admin-service";

export const getCartItems = (cart, callback) => {
  return getCartItemsFirebase()
    .then((items) => {
      let itemArr = [];
      let itemKeys = Object.keys(cart);
      itemKeys.forEach((objKey) => itemArr.push([items[objKey], cart[objKey]]));
      return itemArr;
    })
    .then((itemArr) => {
      callback(itemArr);
      return itemArr;
    });
};

export const getTotal = (itemArr, callback) => {
  return callback(
    itemArr.reduce(
      (acc, current) => (acc + current[0]["price"] * current[1], 0)
    )
  );
};

export function getUserCart(userId, callback) {
  return getUserCartFirebase(userId).then((res) => {
    if (res != undefined) {
      callback(res);
      return res;
    } else {
      callback({});
      return {};
    }
  });
}

export const getUserCartWithModification = (userId, callback, callback2) => {
  return getUserCartFirebase(userId)
    .then((res) => {
      if (res != undefined) {
        callback2(res);
        return res;
      } else {
        callback2({});
        return {};
      }
    })
    .then((items) => {
      if (Object.keys(items)) {
        return getProductsData("all").then((res) => {
          let itemArr = [];
          let itemKeys = Object.keys(items);
          itemKeys.forEach((objKey) => {
            let finded = res.find((arr) => arr[0] == objKey);
            if (finded == undefined) {
              let finded = res.find((item) => item[0] == "deleted");
              return itemArr.push(["deleted", finded]);
            }
            return itemArr.push([finded[1], items[objKey]]);
          });
          return itemArr;
        });
      } else {
        return null;
      }
    })
    .then((itemArr) => {
      callback(itemArr);
      return itemArr;
    });
};

export const updateUserOwnCart = (cartCopy, userId) => {
  return updateUserOwnCartFirebase(cartCopy, userId);
};
