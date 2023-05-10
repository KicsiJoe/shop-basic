const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const saveNewUserToFirebase = (userName, localId, email,company, role) => {
  let userObj = { userName, authId: localId, email,company, role };
  return fetch(`${URL}/users/${localId}.json`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userObj),
  })
    .then((res) => res.json())
    .then((res) => ({ userName, email, company, role }));
};
