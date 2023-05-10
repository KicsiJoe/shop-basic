import React from "react";
import style from "../../css/Admin.module.css"

import { Link } from "react-router-dom";

const Admin = () => {
  return (
    <section className="main-container">
      <h1>Admin</h1>
      <div className={style.admin_box}>
        <Link to={"/admin/new-product"}>New product</Link>
        <Link to={"/admin/products/1/title/asc"}>Products list</Link> 
        {/* <Link to={"/admin/product/edit/:productId"}>Edit product</Link>
        <Link to={"/admin/product/del/:productId"}>Delete product</Link> */}
      </div>
    </section>
  );
};

export default Admin;
