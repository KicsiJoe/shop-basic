import React from "react";
import ProductForm from "./ProductForm.js";
import style from "../../css/Admin.module.css";

const AdminNewProduct = () => {
  return (
    <section className="main-container">
      <h3 className={style.title}>AdminNewProduct</h3>
      <ProductForm
        btn={"Add"}
        text={"new"}
        nav={"/admin/products/1/title/asc"}
        data={""}
        productId={null}
      />
    </section>
  );
};

export default AdminNewProduct;
