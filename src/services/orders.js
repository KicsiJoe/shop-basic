import { getOrdersFromFirebase } from "../repositories/orders-repo"

export const getOrders=(role, authId)=>{
  return  getOrdersFromFirebase(role, authId)
}