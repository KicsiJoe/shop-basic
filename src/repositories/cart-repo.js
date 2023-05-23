const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const getCartItemsFirebase = () => {
  return fetch(`${URL}/products.json`).then((res) => res.json());
};

export const getUserCartFirebase = (userId) => {
  return fetch(`${URL}/users/${userId}/cart.json`).then((res) => res.json());
};

export const updateUserOwnCartFirebase = (cartCopy, userId) => {
  ///users/gllzgROyTsXg4Pu2TOMrtqCKDMD3/carts/old/-NVngFzYgp_Z_v8U1GtC

  return fetch(`${URL}/users/${userId}/cart.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(cartCopy),
  }).then((res) => res.json());
};
