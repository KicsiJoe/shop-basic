import React from "react";
import { Outlet } from "react-router-dom";
import style  from "../css/Admin.module.css"
import { Link } from "react-router-dom";

const AdminBasic = () => {
  return (
    <>
    
    <hr style={{margin: 0}}/>
    <section className="main-container">
      <div className={style.admin_box}>
        <Link to={"/admin/new-product"}>New product</Link>
        <Link to={"/admin/products/1/title/asc"}>Products list</Link>
      </div>
    </section>
    <hr style={{margin: 0}}/>
    </>
  );
};

export default AdminBasic;
