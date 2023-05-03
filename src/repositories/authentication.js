const API = process.env.REACT_APP_FIREBASE_API_KEY
const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL

export const registerUserToFirebase=(loginInputs)=>{
  return  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            email: loginInputs.email,
            password: loginInputs.pwd,
            returnSecureToken: true
        })
    }).then(res=>res.json())
}

export function loginUserFirebase(email, password) {
    return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API}`,
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: email,
            password: password,
            returnSecureToken: true
        })
    })
    .then(resp => resp.json())
}

export const getUserInfoFirebase=(localId)=>{
    return fetch(`${URL}/users/${localId}.json`).then(res=> res.json())
}