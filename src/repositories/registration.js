const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const saveNewUserToFirebase = (userName, localId, email) => {
  let userObj = { userName, authId: localId, email, role: "user" };
  return fetch(`${URL}/users/${localId}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  })
    .then((res) => res.json())
    .then((res) => ({ userName, email, role: "user" }));
};
