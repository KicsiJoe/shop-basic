const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const getOrdersFromFirebase = (role, authId) => {
  const getAll = () => {
    return fetch(`${URL}/orders.json`)
      .then((res) => res.json())
      .then((res) => Object.values(res));
  };

  const getByAuthId = () => {
    return fetch(`${URL}/orders.json`)
      .then((res) => res.json())
      .then((res) => {
       
        if (res != null) {
          return Object.values(res).filter((obj) => obj.userId == authId);
        } else {
          return [];
        }
      });
  };
  return role == "admin" ? getAll() : getByAuthId();
};

export const delOrderFirebase = (orderId, userId) => {
  return fetch(`${URL}/users/${userId}/orders/${orderId}.json`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      return fetch(`${URL}/orders/${orderId}.json`, {
        method: "DELETE",
      });
    })
    .then((res) => res.json());
};
