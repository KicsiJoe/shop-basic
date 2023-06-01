import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import style from "../css/Orders.module.css"

const Orders = () => {
  const { loggedIn } = useContext(AuthContext);

  return  (
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
              <th
                className={style.th_box}
                // onClick={() => change_filter("item-number")}
              >
                <span>Username</span>
                <span className={style.arrow_in_filter}>
                  {/* {arrow_status("item-number")} */}
                </span>
              </th>
              <th
                className={style.th_box}
                // onClick={() => change_filter("price")}
              >
                <span>Price</span>
                <span className={style.arrow_in_filter}>
                  {/* {arrow_status("price")} */}
                </span>
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
            {/* {filtered?.map(([id, obj]) => (
              <tr key={uuid()}>
                <td>{obj.title}</td>
                <td>{obj["item-number"]}</td>
                <td>
                  <span>{obj.price}</span> <span>EUR</span>
                </td>
                <td className={style.links_box}>
                  {obj.pic.picUrl && obj.pic.picName != "no_image.png"? (
                    <span className={style.pic_indicator}>{with_img}</span>
                  ) : (
                    ""
                  )}
                  <Link to={`/orders/edit/${id}`}>Edit</Link> |
                  <Link to={`/orders/del/${id}`}>Delete</Link> |
                  <span
                    // onClick={() =>
                    //   delProductService(id, loggedIn.authId).then((res) =>
                    //     setPushed((prev) => !prev)
                    //   )
                    // }
                    className={style.del_icon}
                  >
                    {delete_icon}
                  </span>
                </td>
              </tr> 
            ))}*/}
          </tbody>
        </table>

    </section>
  )
  
};

export default Orders;
