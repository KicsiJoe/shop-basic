import React from "react";
import  {Link} from "react-router-dom"
 import style from "./modal.module.css";

const Modal = () => {
  return (
    <div className={style["modal-box"]}>
      <div>
        <ul>
          <li>
            <Link className={style.modal_a}>SHOP CATEGORIES</Link>
          </li>
          <li>
            <Link>All</Link>
          </li>
          <li>
            <Link>Accessories</Link>
          </li>
          <li>
            <Link>Clothing</Link>
          </li>
          <li>
            <Link>Shoes</Link>
          </li>
          <li>
            <Link>Kitchen & Bathroom</Link>
          </li>
          <li>
            <Link>Books</Link>
          </li>
          <li>
            <Link>Electronics</Link>
          </li>
          <li>
            <Link>Toys</Link>
          </li>
          <li>
            <Link>Furniture</Link>
          </li>
          <li>
            <Link>Bags</Link>
          </li>
          <li>
            <Link>Watches</Link>
          </li>
          <li>
            <Link>Glasses</Link>
          </li>
          <li>
            <Link to={'/'} >Cosmeticals</Link>
          </li>
        </ul>
      </div>
      <div>
        <ul>
          <li>
            <Link>SHOP FEATURES</Link>
          </li>
          <li>
            <Link>Products by categories</Link>
          </li>
          <li>
            <Link>Products with subcategories</Link>
          </li>
          <li>
            <Link>Products by categories</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link>ECOMMERCE PAGES</Link>
          </li>
          <li>
            <Link>Cart</Link>
          </li>
          <li>
            <Link>Checkout</Link>
          </li>
          <li>
            <Link>My account</Link>
          </li>
          <li>
            <Link>Order tracking</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Modal;
