import { addNewProductFirebase, editProducServiceFirebase } from "../repositories/admin"
import { getProducts } from "../repositories/getProduct"

export const addNewProductService=(inputs)=>{
   return addNewProductFirebase(inputs)
}
export const editProducService=(inputs)=>{
   return editProducServiceFirebase(inputs)
}

export const getProductsList=(what)=>{
   return getProducts(what).then(res=> Object.entries(res))
}