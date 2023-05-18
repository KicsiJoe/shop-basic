import React, { useEffect, useContext } from "react";
import { useState } from "react";
import {
  addNewProductService,
  delProductService,
  editProductService,
  updateItem,
} from "../../services/admin-service";
import { useNavigate } from "react-router-dom";
import style from "../../css/Forms.module.css";

import { v4 as uuid } from "uuid";
import { AuthContext } from "../../contexts/AuthContext";
import { checkInputs, getOnePicUrl, savePic } from "../../services/utilities";
import {
  delAllPic,
  delUselessPics,
  prevPicSetterLoader,
} from "../../services/pic-service";

export const NO_IMG =
  "https://firebasestorage.googleapis.com/v0/b/shop-project-8783c.appspot.com/o/images%2FnoImg%2Fno_image.png?alt=media&token=a4dc5986-5d73-4fb7-b4c3-52de9cda1136";

const ProductForm = ({ btn, text, nav, data, productId }) => {
  console.log(data);
  const { loggedIn } = useContext(AuthContext);

  let basicInputs;
  if (text == "new") {
    basicInputs = {
      title: "",
      price: "",
      "item-number": "",
      pic: {
        picUrl: NO_IMG,
        picName: "no_image.png",
      },
      authId: loggedIn.authId,
    };
  }

  if (Object.keys(data).length > 0 && text != "new") {
    console.log("regi data hasznalat");
    basicInputs = {
      title: data.title,
      price: data.price,
      "item-number": data["item-number"],
      pic: {
        picUrl: data.pic.picUrl,
        picName: data.pic.picName,
      },
      authId: data.authId,
    };
  }

  // MEGLEVO KEPET IDE MENTI AZ ELSO BETOLTESNEL, VAGY UJ INDITASNAL ALAP KEPET AD HOZZA
  const [inputs, setInputs] = useState(basicInputs);
  console.log({ inputs });
  //INPUT RANYOMASKOR IDE MENT:
  const [newImage, setNewImage] = useState(null);
  // A TEST MAPPABA MENTI AZ UJ IMG OBJECTET:
  const [imageInput, setImageInput] = useState({
    picUrl: null,
    picName: null,
    file: null,
    map: null,
  });
  // console.clear()
  // const [fileData, setFileData] = useState(null);
  const [images, setImages] = useState([]);
  //OLDALFRISSITESHEZ KELL:
  const [newPicDownloadToSee, setNewPicDownloadToSee] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (newImage != null) {
      prevPicSetterLoader(newImage, inputs, setImageInput, productId).then(
        (res) => {
          console.log("valasztottunk kepet");
          return setNewPicDownloadToSee((prev) => !prev);
        }
      );
    }
  }, [newImage]);

  // useEffect(() => {
  //   if (imageInput?.picUrl) {
  //     console.log("van az imageInput.picUrl?" );
  //     downloadPicsRefs(inputs.authId, productId).then((res) => {
  //       return setImages(res);
  //     });
  //   }
  // }, [newImagePreview, newPicDownloadToSee]);

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

      <div>
        {text != "delete" ? (
          <>
            <p>
              <label htmlFor="file">Picture upload: </label>
            </p>
            <input
              className={
                checkInputs(inputs)
                  ? style.file_input
                  : (style.file_input, style.file_input_inactive)
              }
              disabled={!checkInputs(inputs)}
              accept="image/x-png,image/gif,image/jpeg, image/avif, image/webp"
              type="file"
              id={style.file}
              onChange={inputPic}
              readOnly={text == "delete" ? true : false}
            />
          </>
        ) : (
          ""
        )}
        {inputs && imageInput.picUrl == null ? (
          <div>
            <img src={inputs?.pic.picUrl} alt="" />
          </div>
        ) : (
          <div>
            <img src={imageInput.picUrl} alt="" />
          </div>
        )}
      </div>

      <p className={style.btns}>
        <button>{btn}</button>
        <button onClick={(e) => cancelBtn(e)}>Cancel</button>
      </p>
    </form>
  );

  function submit(e) {
    e.preventDefault();
    let inputsNew;

    //KESZ A NEW!!
    if (text == "new") {
      console.log("uj PRODUCT LETREHOZASA");
      if (newImage == null) {
        // inputsNew= {...inputs, pic : {picName: newImage.name, picUrl: "" }}
        inputsNew = { ...inputs };
        return addNewProductService(inputsNew)
          .then((res) => navigate(nav))
          .catch(function (e) {
            alert(e);
          });
      } else {
        inputsNew = { ...inputs, pic: { picName: newImage.name, picUrl: "" } };
        console.log(inputsNew);
        return addNewProductService(inputsNew)
          .then((res) => savePic(loggedIn.authId, res.name, newImage))
          .then((res) => updateItem(inputs, res))
          .then((resId) => delUselessPics(inputs, "test"))
          .then((res) => navigate(nav))
          .catch(function (e) {
            alert(e);
          });
      }
    }

    if (text == "edit") {
      console.log("EDIT PRODUCT");
      console.clear();
      if (newImage != null) {
        inputsNew = { ...inputs, pic: { picName: newImage.name, picUrl: "" } };
        console.log(inputsNew);
        savePic(loggedIn.authId, productId, newImage, inputsNew)
          .then((res) => {
            inputsNew = {
              ...inputs,
              pic: { picUrl: res.picUrl, picName: newImage.name },
            };
            setInputs(inputsNew);
            return inputsNew;
          })
          .then((res) =>
            updateItem(inputsNew, {
              authId: res.authId,
              productId: productId,
              picUrl: res.pic.picUrl,
              picName: res.pic.picName,
            })
          )
          // { authId, productId, picUrl: url, picName: fileName }
          // EZ ELOTT TUTI JO!!

          .then((res) => delUselessPics(inputsNew, productId))
          .then((response) => navigate(nav))
          .catch(function (e) {
            alert(e);
          });
      } else {
        return editProductService(inputs, productId).then((res) =>
          navigate(nav)
        );
      }
    }

    if (text == "delete")
      return delProductService(productId).then(res=> delAllPic(loggedIn.authId ,productId)).then((res) => navigate(nav));
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
    setNewImage(e.target.files[0]);
  }

  function cancelBtn(e) {
    e.preventDefault();
    console.clear();
    console.log(imageInput.picUrl);
    if (imageInput.picUrl != null) {
      console.log("torles" + " " + imageInput.map);
      delUselessPics(inputs, imageInput.map);
    }
    navigate("/admin/products/1/title/asc");
  }
};

export default ProductForm;
