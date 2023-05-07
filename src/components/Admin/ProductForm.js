import React from "react";
import { useState } from "react";
import {
  addNewProductService,
  delProductService,
  editProductService,
} from "../../services/admin-service";
import { useNavigate } from "react-router-dom";
import style from "../../css/Forms.module.css";

const ProductForm = ({ btn, text, nav, data, productId }) => {
  let basicInputs = { title: "", price: "", "item-number": "" };

  if (Object.keys(data).length > 0) {
    basicInputs = {
      title: data.title,
      price: data.price,
      "item-number": data["item-number"],
    };
  }

  const [inputs, setInputs] = useState(basicInputs);

  const navigate = useNavigate();

  return (
    <form className={style.form} onSubmit={(e) => submit(e)}>
      <div>
        <p>
          <label htmlFor="title">Title: </label>
        </p>
        <input
          type="text"
          // placeholder="Title"
          id="title"
          value={inputs.title}
          onChange={inputTitle}
        />
      </div>
      <div>
        <p>
          <label htmlFor="item-number">Item number: </label>
        </p>
        <input
          type="text"
          // placeholder="Item number"
          id="item-number"
          value={inputs["item-number"]}
          onChange={inputNumber}
        />
      </div>
      <div>
        <p>
          <label htmlFor="price">Price (EUR): </label>
        </p>
        <input
          type="number"
          // placeholder="Price"
          id="price"
          value={inputs.price}
          onChange={inputPrice}
        />
      </div>
      <p className={style.btns}>
        <button>{btn}</button>
        <button onClick={() => navigate("/admin/products/1/title/asc")}>
          Cancel
        </button>
      </p>
    </form>
  );

  function submit(e) {
    e.preventDefault();
    if (text == "new")
      return addNewProductService(inputs).then((res) => navigate(nav));
    if (text == "edit")
      return editProductService(inputs, productId).then((res) => navigate(nav));
    if (text == "delete")
      return delProductService(productId).then((res) => navigate(nav));
  }

  function inputTitle(e) {
    setInputs({ ...inputs, title: e.target.value });
  }
  function inputPrice(e) {
    setInputs({ ...inputs, price: e.target.value });
  }
  function inputNumber(e) {
    setInputs({ ...inputs, "item-number": e.target.value });
  }
};

export default ProductForm;
