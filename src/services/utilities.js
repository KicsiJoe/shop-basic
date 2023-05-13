import { getOnePicUrlFromFirebase } from "../repositories/pic-repo"

export const getOnePicUrl=(picName, path)=>{
   return getOnePicUrlFromFirebase(picName, path)
   
}