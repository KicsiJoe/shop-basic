const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const getCartItemsFirebase = () => {
  return fetch(`${URL}/products.json`).then((res) => res.json());
};

export const getUserCartFirebase = (userId) => {
  return fetch(`${URL}/users/${userId}/cart.json`).then((res) => res.json());
};

export const updateUserOwnCartFirebase = (cartCopy, userId) => {
  return fetch(`${URL}/users/${userId}/cart.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartCopy),
  }).then((res) => res.json());
};

export const cartOrderFirebase = (orderObj, userId, time) => {
  let obj = { orderItems: orderObj, time, userId };

  return fetch(`${URL}/orders.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((res) => saveId("/orders", res.name)).then(id=> saveOrderToUser(`users/${userId}/orders`, time, id));
};

export const saveId = (path, id) => {
  return fetch(`${URL}/${path}/${id}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orderId: id }),
  }).then(res=> res.json()).then(res=> id)
};

export const saveOrderToUser=(path, time, id) =>{
  let obj = {[id] : time}
 return fetch(`${URL}/${path}.json`, {
  method: "PATCH",
  headers: {"Content-Type":"application/json"},
  body: JSON.stringify(obj)

 }).then(res=>res.json())
}
