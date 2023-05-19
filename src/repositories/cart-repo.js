const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const getCartItemsFirebase = (cart) => {
  let itemArr = [];
  let itemKeys = Object.keys(cart);
  return fetch(`${URL}/products.json`)
    .then((res) => res.json())
    .then((items) => {
      itemKeys.forEach((objKey) => itemArr.push([items[objKey], cart[objKey]]));

      return itemArr;
    });
};
