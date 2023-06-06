import React, { useContext, useEffect, useState } from "react";
// import style from "../css/Admin.module.css";
import style from "../css/Orders.module.css"
import { delOrder } from "../services/orders";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { FbformToCartForm } from "../services/utilities";
import { v4 as uid } from "uuid";
import { HelperContext } from "../contexts/HelperContext";

const OrderDelete = () => {
  const { orderId } = useParams();
  const { loggedIn } = useContext(AuthContext);
  const { helper, setHelper } = useContext(HelperContext);
  const [orderItems, setOrderItems] = useState(null);
  console.log(orderItems);

  const navigate = useNavigate();

  useEffect(() => {
    FbformToCartForm(helper.orderItems, setOrderItems);
  }, []);

  return (
    <section className="main-container">
      {/* <div className={style.table_width_title}> */}
        <h3 className={style.title}>Delete Order</h3>
        <h3 className={style.delete_ques}>
          Are you sure you want to remove this order?
        </h3>

        <div>Payment Total: {helper.totalPrice} EUR</div>
        
        <div className={style.cards_container}>
          {orderItems?.length > 0 && orderItems != null
            ? orderItems.map((item) => {
                return (
                  <div key={uid()} className={style.cart_box}>
                    <img
                      className={style.card_img}
                      src={item[0].pic.picUrl}
                      alt="picture"
                    />
                    <div>{item[0].title}</div>
                    <div>{item[0].price} EUR</div>
                    <div>Subtotal: {item[1] * item[0].price} EUR</div>
                    <div >
                      <span>QTY: {item[1]}</span>
                    </div>
                  </div>
                );
              })
            : ""}
        </div>

        <div className={style.btns_box} >
          <button onClick={() => navigate(-1)}>Cancel</button>
          <button
            onClick={() =>
              delOrder(orderId, loggedIn.userId).then((res) =>
                navigate("/orders")
              )
            }
          >
            Remove
          </button>
        </div>
      
    </section>
  );
};

export default OrderDelete;
