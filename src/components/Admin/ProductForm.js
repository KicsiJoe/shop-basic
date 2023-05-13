import React, { useEffect, useContext } from "react";
import { useState } from "react";
import {
  addNewProductService,
  delProductService,
  delUselessPic,
  downloadPicsRefs,
  editProductService,
  prevPicSetterLoader,
} from "../../services/admin-service";
import { useNavigate } from "react-router-dom";
import style from "../../css/Forms.module.css";

import { v4 as uuid } from "uuid";
import { AuthContext } from "../../contexts/AuthContext";
import { getOnePicUrl } from "../../services/utilities";



 export const NO_IMG =   "https://firebasestorage.googleapis.com/v0/b/shop-project-8783c.appspot.com/o/images%2FnoImg%2Fno_image.png?alt=media&token=a4dc5986-5d73-4fb7-b4c3-52de9cda1136";

const ProductForm = ({ btn, text, nav, data, productId }) => {
  
  // let [img_static, setImgStatic] = useState("")

//  let NO_IMG = 'https://firebasestorage.googleapis.com/v0/b/shop-project-8783c.appspot.com/o/images%2FnoImg%2Fno_image.png?alt=media&token=a4dc5986-5d73-4fb7-b4c3-52de9cda1136';
  
  // useEffect(() => {
  //  NO_IMG =getOnePicUrl("no_image.png", "images/noImg").then(
  //     (res) => setImgStatic(res)
  //   );
  // }, []);
  // console.log(img_static);
console.log({text});
  const { loggedIn } = useContext(AuthContext);
  let basicInputs;
  if (text == "new") {
    const picUid = uuid();
    basicInputs = {
      title: "",
      price: "",
      "item-number": "",
      pic: {
        picUrl:  NO_IMG ,
        picUid: picUid,
        picName: "no_image.png",
      },
      authId: loggedIn.authId,
    };
    console.log(basicInputs);
  }

  if (Object.keys(data).length > 0) {
    console.log("regi data hasznalat");
    basicInputs = {
      title: data.title,
      price: data.price,
      "item-number": data["item-number"],
      pic: {
        picUrl: data.pic.picUrl,
        picUid: data.pic.picUid,
        picName: data.pic.picName,
      },
      authId: data.authId,
    };

  }

  const picUidOld = data?.pic?.picUid;
  const picUrlOld = data?.pic?.picUrl;

  const [inputs, setInputs] = useState(basicInputs);
  console.log(inputs);
  const [fileData, setFileData] = useState(null);
  const [images, setImages] = useState([]);
  const [newPicDownloadToSee, setNewPicDownloadToSee] = useState(true);
  const navigate = useNavigate();

  console.log(images);

  useEffect(() => {
    console.log("kep betoltese, ha valasztottunk");
    if (fileData != null)
      prevPicSetterLoader(
        fileData,
        inputs.pic.picUid,
        setInputs,
        inputs,
        loggedIn.authId,
        productId
      ).then((res) =>{ 
        console.log(res)
        return setNewPicDownloadToSee((prev) => !prev)});
  }, [fileData]);

  useEffect(() => {
    if (inputs.pic?.picUrl) {
      downloadPicsRefs(inputs.authId, productId).then((res) => {
        return setImages(res);
      });
    }
  }, [fileData, newPicDownloadToSee]);

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
          readOnly={text == "delete" ? true : false}
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
          readOnly={text == "delete" ? true : false}
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
          readOnly={text == "delete" ? true : false}
        />
      </div>
      {text != "delete" ? (
        <div>
          <p>
            <label htmlFor="file">Picture upload: </label>
          </p>
          <input
            accept="image/x-png,image/gif,image/jpeg, image/avif, image/webp"
            type="file"
            id={style.file}
            onChange={inputPic}
            readOnly={text == "delete" ? true : false}
          />
          {inputs?.pic.picUrl && (
            <div>
              <img src={inputs?.pic.picUrl} alt="" />
            </div>
          )}
        </div>
      ) : (
        ""
      )}

      <p className={style.btns}>
        <button>{btn}</button>
        <button onClick={(e) => cancelBtn(e)}>Cancel</button>
      </p>
    </form>
  );

  function submit(e) {
    e.preventDefault();
    if (text == "new")
      return addNewProductService(inputs)
        .then((res) => navigate(nav))
        .catch(function (e) {
          alert(e);
        });
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

  function inputPic(e) {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
  }

  function cancelBtn(e) {
    e.preventDefault();
    console.log({ inputs });

    if (
      inputs.picUrl != undefined &&
      inputs.picUrl != picUrlOld &&
      fileData.name != undefined
    ) {
      console.log("inputs " + { inputs });
      delUselessPic(data.authId, inputs, picUrlOld, productId, fileData);
    }
    navigate("/admin/products/1/title/asc");
  }
};

export default ProductForm;
