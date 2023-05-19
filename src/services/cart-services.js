import { getCartItemsFirebase } from "../repositories/cart-repo";

export const getCartItems = (cart) => {
  return getCartItemsFirebase(cart);
};
