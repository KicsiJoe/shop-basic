import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import "../src/css/App.css";
import { useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { CartContext } from "./contexts/CartContext";
import { UserCartContext } from "./contexts/UserCartContext";
import { ProductsContext } from "./contexts/ProductsContext";
import { getProduct } from "./services/user-services";
import { getUserCart } from "./services/cart-services";

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  const [cart, setCart] = useState({});
  const [productsList, setProductsList] = useState(null);
  const [userCart, setUserCart] = useState(null);
  const [trigger, setTrigger] = useState(true);

  useEffect(() => {
    getProduct("all").then((res) => {
      if (res != null) {
        setProductsList(Object.entries(res));
      } else {
        setProductsList([]);
      }
    });
  }, [trigger]);

  useEffect(() => {
    console.log("triggereltem a userCartot");
    if (loggedIn.authId) {
      getUserCart(loggedIn.authId, setUserCart);
    }
  }, [loggedIn, trigger, cart ]);


  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <ProductsContext.Provider value={{ productsList, setProductsList, setTrigger }}>
        <CartContext.Provider value={{ cart, setCart }}>
          <UserCartContext.Provider
            value={{ userCart, setUserCart, setTrigger }}
          >
            <div className="main-container">
              <Header />
              <div>
                <Outlet className="outlet_container" />
              </div>
              <Footer />
            </div>
          </UserCartContext.Provider>
        </CartContext.Provider>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
