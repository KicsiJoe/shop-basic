import { delOrderFirebase, getOrdersFromFirebase } from "../repositories/orders-repo"

export const getOrders=(role, authId)=>{
  return  getOrdersFromFirebase(role, authId)
}

export const delOrder =(orderId, userId)=> {
  return delOrderFirebase(orderId, userId)
}

export const oneOrderPrice=(orderItems, productsList)=>{
//  console.log(orderItems);
 // {-NX23S4EfiJ3MjfhMONw: 1, -NX23UNtG63399MTYN1L: 2}
//  console.log(productsList);
//  [['-NVnwSHNX2NtX3ernzlC', {…}]
//  ['-NVnwSHNX2NtX3erqerfq', {…}]]
return (Object.entries(orderItems)?.reduce((acc, current) => {

  return acc + (current[1] * (productsList.find(item=> item[0] == current[0]) )[1].price )
}, 0))
}

