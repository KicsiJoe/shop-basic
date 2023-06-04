import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import style from "../css/Orders.module.css";
import { delOrder, getOrders, oneOrderPrice } from "../services/orders";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import { delete_icon } from "../icon/icons";
import { getUsersNameWithId } from "../services/admin-service";
import { ProductsContext } from "../contexts/ProductsContext";

const Orders = () => {
  const { loggedIn } = useContext(AuthContext);
  const { productsList } = useContext(ProductsContext);
  const [orders, setOrders] = useState(null);
  const [users, setUsers] = useState(null);
  const [pushed, setPushed] = useState(false);
  console.log(orders);

  useEffect(() => {
    if (loggedIn?.authId) {
      getOrders(loggedIn?.role, loggedIn?.authId).then((res) => setOrders(res));
    }
  }, [pushed]);

  useEffect(() => {
    getUsersNameWithId().then((res) => setUsers(res));
  }, [orders]);

  return (
    <section className="main-container">
      <div className={style.table_width_title}>
        <h3 className={style.title}>Orders</h3>
      </div>
      <table>
        <thead>
          <tr>
            <th
              className={style.th_box}
              // onClick={() => change_filter("title")}
            >
              <span>Order Id </span>
              <span className={style.arrow_in_filter}>
                {/* {arrow_status("title")} */}
              </span>
            </th>
            {loggedIn && loggedIn?.role == "admin" ? (
              <th
                className={style.th_box}
                // onClick={() => change_filter("item-number")}
              >
                <span>Username</span>
                <span className={style.arrow_in_filter}>
                  {/* {arrow_status("item-number")} */}
                </span>
              </th>
            ) : (
              ""
            )}
            <th
              className={style.th_box}
              // onClick={() => change_filter("price")}
            >
              <span>Total price</span>
              <span className={style.arrow_in_filter}>
                {/* {arrow_status("price")} */}
              </span>
            </th>
            <th className={style.th_box}>
              <span>Items</span>
            </th>
            <th className={style.th_box}>
              <span>Date</span>
            </th>
            <th className={style.th_box}>
              <span>Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {orders &&
            orders?.map(({ orderId, orderItems, time, userId }) => (
              <tr key={uuid()}>
                <td>{orderId}</td>
                {loggedIn && users && loggedIn?.role == "admin" ? (
                  <td>
                    {
                      Object.values(
                        users?.find((item) => item[userId] != undefined)
                      )[0]
                    }
                  </td>
                ) : (
                  ""
                )}

                <td>
                  {oneOrderPrice(orderItems, productsList)} <span>EUR</span>
                </td>

                <td className={style.list_of_items}>
                  <ul>
                    {Object.entries(orderItems).map(([id, numb]) => (
                      <li key={uuid()}> {`${id} : ${numb}`} pcs </li>
                    ))}
                  </ul>
                </td>
                <td>
                  <span>{time}</span>
                </td>
                <td className={style.links_box}>
                  <div>
                    <Link to={`/orders/edit/${""}`}>Edit</Link> |
                    <Link to={`/orders/del/${""}`}>Delete</Link> |
                    <span
                      onClick={() =>
                        delOrder(orderId, userId).then((res) =>
                          setPushed((prev) => !prev)
                        )
                      }
                      className={style.del_icon}
                    >
                      {delete_icon}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </section>
  );
};

export default Orders;
