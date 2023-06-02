import { delOrderFirebase, getOrdersFromFirebase } from "../repositories/orders-repo"

export const getOrders=(role, authId)=>{
  return  getOrdersFromFirebase(role, authId)
}

export const delOrder =(orderId, userId)=> {
  return delOrderFirebase(orderId, userId)
}