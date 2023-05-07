import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProductsData } from "../../services/admin-service";
import style from "../../css/Admin.module.css";
import { v4 as uuid } from "uuid";
import {
  doubleLeft,
  doubleRight,
  left,
  right,
  arrow_down_filter,
  arrow_up_filter,
} from "../../icon/icons.js";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminProductsList = () => {
  const navigate = useNavigate();
  const { pageId, sortBy, sortType } = useParams();
  // console.log({ pageId });
  // console.log({ sortBy });
  // console.log({ sortType });
  let filtered;
  let filteredLength = 0;
  const [productList, setProductList] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [searchingField, setSearchingField] = useState("");

  useEffect(() => {
    getProductsData("all").then((res) => setProductList(res));
  }, [itemsPerPage, searchingField]);

  if (productList.length > 0) {
    if (sortType == "asc") {
      productList.sort((a, b) => {
        return a[1][sortBy] - b[1][sortBy];
      });
    }
    if (sortType == "desc") {
      // productList.sort()
      productList.sort((a, b) => {
        return b[1][sortBy] - a[1][sortBy];
      });
    }

    let from = (pageId - 1) * itemsPerPage;
    let to = Number(from) + Number(itemsPerPage);

    filtered = Array.from(productList);
    filteredLength = filtered.length;
    if (searchingField != "") {
      filtered = filtered.filter((arr) =>
        arr[1].title.includes(searchingField) || arr[1]["item-number"].includes(searchingField) || arr[1].price.includes(searchingField)
      );
      filteredLength = filtered.length;
    }
    filtered = filtered.slice(from, to);
  }

  return (
    <section className="main-container">
      <div className={style.table_width_title}>
        <h3 className={style.title}>AdminProductsList</h3>
        <div className={style.select}>
          <label htmlFor="">Items/site: </label>
          <select defaultValue={12} onChange={changeItemPerPage}>
            <option value="5">5</option>
            <option value="9">9</option>
            <option value="12" >12</option>
          </select>
          <label htmlFor="">Searching: </label>
          <input type="text" value={searchingField} onChange={searching} />
        </div>
        <table>
          <thead>
            <tr>
              <th
                className={style.th_box}
                onClick={() => change_filter("title")}
              >
                <span>Title </span>
                <span className={style.arrow_in_filter}>
                  {arrow_status("title")}
                </span>
              </th>
              <th
                className={style.th_box}
                onClick={() => change_filter("item-number")}
              >
                <span>Item number</span>
                <span className={style.arrow_in_filter}>
                  {arrow_status("item-number")}
                </span>
              </th>
              <th
                className={style.th_box}
                onClick={() => change_filter("price")}
              >
                <span>Price</span>
                <span className={style.arrow_in_filter}>
                  {arrow_status("price")}
                </span>
              </th>
              <th className={style.th_box}>
                <span>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered?.map((arr) => (
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
      </div>

      <div className={style.arrows}>
        <div>
          <span className={syleClass("-")} onClick={() => move("--")}>
            {doubleLeft}
          </span>
          <span className={syleClass("-")} onClick={() => move("-1")}>
            {left}
          </span>
        </div>

        <div className={style.page_id}>{pageId}</div>
        <div>
          <span className={syleClass("+")} onClick={() => move("+1")}>
            {right}
          </span>
          <span className={syleClass("+")} onClick={() => move("++")}>
            {doubleRight}
          </span>
        </div>
      </div>
    </section>
  );

  function syleClass(where) {
    let maxPageNumber = Math.ceil(filteredLength / itemsPerPage);
    return where == "+" && pageId == maxPageNumber
      ? style.notActive
      : where == "-" && pageId == 1
      ? style.notActive
      : "";
  }

  function move(where) {
    let maxPageNumber = Math.ceil(filteredLength / itemsPerPage);
    // console.log(maxPageNumber);
    if (where == "--")
      return navigate(`/admin/products/1/${sortBy}/${sortType}`);

    if (where == "-1" && +pageId >= 2)
      return navigate(`/admin/products/${+pageId - 1}/${sortBy}/${sortType}`);

    if (where == "+1" && +pageId < maxPageNumber)
      return navigate(`/admin/products/${+pageId + 1}/${sortBy}/${sortType}`);

    if (where == "++")
      return navigate(`/admin/products/${maxPageNumber}/${sortBy}/${sortType}`);
  }

  function arrow_status(where) {
    return sortBy == where && sortType == "asc"
      ? arrow_down_filter
      : sortBy == where && sortType == "desc"
      ? arrow_up_filter
      : "";
  }

  function change_filter(what) {
    return sortBy == what && sortType == "desc"
      ? navigate(`/admin/products/1/${sortBy}/asc`)
      : sortBy == what && sortType == "asc"
      ? navigate(`/admin/products/1/${sortBy}/desc`)
      : sortBy != what
      ? navigate(`/admin/products/1/${what}/asc`)
      : "";
  }

  function changeItemPerPage(e) {
    setItemsPerPage(e.target.value);

    return navigate(`/admin/products/1/${sortBy}/${sortType}`);
  }

  function searching(e) {
    setSearchingField(e.target.value);
    return navigate(`/admin/products/1/${sortBy}/${sortType}`);
  }
};

export default AdminProductsList;
