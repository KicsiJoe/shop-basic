import { addNewProductFirebase, editProducServiceFirebase } from "../repositories/admin"

export const addNewProductService=(inputs)=>{
   return addNewProductFirebase(inputs)
}
export const editProducService=(inputs)=>{
   return editProducServiceFirebase(inputs)
}