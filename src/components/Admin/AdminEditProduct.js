import React, { useEffect, useState } from "react";
import ProductForm from "./ProductForm.js";
import { useParams } from "react-router-dom";
import { getProductsData } from "../../services/admin-service";
import style from '../../css/Admin.module.css'

const AdminEditProduct = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    getProductsData(productId).then((res) => setProduct(res));
  }, []);
  return (
    <section className="main-container">
        <div className={style.table_width_title}>
        <h3 className={style.title}>AdminEditProduct</h3>
  
      {Object.keys(product).length > 0 ?  <ProductForm
        btn={"Update"}
        text={"edit"}
        nav={"/admin/products/1/title/asc"}
        data={product}
        productId={productId}

      /> : ""}
      </div>
    </section>
  );
};

export default AdminEditProduct;
