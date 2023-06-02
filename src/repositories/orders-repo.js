const URL = process.env.REACT_APP_FIREBASE_DATABASE_URL;

export const getOrdersFromFirebase=(role, authId)=>{
   
    const getAll=()=>{
      return  fetch(`${URL}/orders.json`).then(res=> res.json()).then(res=> Object.values(res))
    }

    const getByAuthId=()=>{
      return  fetch(`${URL}/orders.json`).then(res=> res.json()).then(res=> Object.values(res).filter(obj => obj.userId == authId))
    }
   return role == "admin" ? getAll() : getByAuthId()


}