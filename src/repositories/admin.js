const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const addNewProductFirebase = (inputs) => {
  return fetch(`${URL}/products.json`, { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(inputs) }).then(res=> res.json()).then(res=> console.log(res))
};
export const editProducServiceFirebase = (inputs) => {
//   return fetch(`${URL}/products.json`, { methode: "PATCH", headers: {"Content-Type": "application/json"}, body: JSON.stringify(inputs) }).then(res=> res.json()).then(res=> console.log(res))
};
