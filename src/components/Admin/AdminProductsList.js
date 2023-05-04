import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsList } from "../../services/admin-service";
import style from "../../css/Admin.module.css";
import { v4 as uuid } from "uuid";
import { doubleLeft, doubleRight, left, right } from "../../icon/icons.js";

const AdminProductsList = () => {
  const [prodactList, setProductList] = useState([]);

  useEffect(() => {
    getProductsList().then((res) => setProductList(res));
  }, []);

  return (
    <section className="main-container">
      <div className={style.table_width_title}>

      
      <div className={style.title}>AdminProductsList</div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Item number</th>
            <th>Price</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {prodactList?.map((arr) => (
            <tr key={uuid()}>
              <td>{arr[1].title}</td>
              <td>{arr[1]["item-number"]}</td>
              <td>
                <span>{arr[1].price}</span> <span>EUR</span>
              </td>
              <td>
                <Link to={`/admin/product/edit/${arr[0]}`}>Edit</Link> |
                <Link to={`/admin/product/del/${arr[0]}`}>Delete</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={style.arrows}>
        <div>
          <span className={style.arrow_left}>{doubleLeft}</span>
          <span>{left}</span>
        </div>
        <div>
          <span>{right}</span>
          <span className={style.arrow_right}>{doubleRight}</span>
        </div>
      </div>
      </div>
    </section>
  );
};

export default AdminProductsList;
