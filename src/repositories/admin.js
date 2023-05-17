

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
  // console.log(productId);
  return fetch(`${URL}/products/${productId}.json`, { method: "DELETE" }).then(
    (res) => res.json()
  );
};




