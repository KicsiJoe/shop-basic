 
 const URL =  process.env.REACT_APP_FIREBASE_DATABASE_URL;
 
 export const getProducts=(text)=>{
   let path = "";
   if(text == "all") {
     path = ""
    } else {
      path =  `/${text}`
    }
    return fetch(`${URL}/products${path}.json`).then(res=> res.json())
 }