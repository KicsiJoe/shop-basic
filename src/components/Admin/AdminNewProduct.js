import React from 'react';
import ProductForm from './ProductForm.js';

const AdminNewProduct = () => {
    return (
        <section className="main-container">
            AdminNewProduct

          <ProductForm btn={"Add"} text={"new"} nav={'/admin/products/1/title/asc'} data={""}/>
        </section>
    );
};

export default AdminNewProduct;