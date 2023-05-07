import React from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import { getProductsData } from '../../services/admin-service';
import style from '../../css/Admin.module.css'
import ProductForm from './ProductForm';


const AdminDelProduct = () => {
    
                const { productId } = useParams();
      const [product, setProduct] = useState([]);
    
      useEffect(() => {
        getProductsData(productId).then((res) => setProduct(res));
      }, []);

        
  return (
    <section className="main-container">
        <div className={style.table_width_title}>
        <h3 className={style.title}>  AdminDelProduct</h3>
        <h3 className={style.delete_ques}>Are you sure you want to remove this item?</h3>
      {Object.keys(product).length > 0 ?  <ProductForm
        btn={"Delete"}
        text={"delete"}
        nav={"/admin/products/1/title/asc"}
        data={product}
        productId={productId}
      /> : ""}
      </div>
    </section>
  );
   
};

export default AdminDelProduct;