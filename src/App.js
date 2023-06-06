import { Outlet } from "react-router-dom";
import Header from "./pages/Header";
import Footer from "./pages/Footer";
import "../src/css/App.css";
import { useEffect, useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { CartContext } from "./contexts/CartContext";
import { UserCartContext } from "./contexts/UserCartContext";
import { ProductsContext } from "./contexts/ProductsContext";
import { getProduct } from "./services/user-services";
import { getUserCart } from "./services/cart-services";
import { HelperContext } from "./contexts/HelperContext";

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  const [cart, setCart] = useState({});
  const [productsList, setProductsList] = useState(null);
  const [userCart, setUserCart] = useState(null);
  const [trigger, setTrigger] = useState(true);
  const [triggerHeader, setTriggerHeader] = useState(true);
  const [helper, setHelper] = useState(null);
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
    if (loggedIn.authId) {
      getUserCart(loggedIn.authId, setUserCart);
    }
  }, [loggedIn, trigger, cart, triggerHeader]);

  // useEffect(() => {
  //   console.log("vagyok");
  //   const auth = getAuth(app);
  //   onAuthStateChanged(auth, (user) => {
  //     console.log(auth);
  //     console.log("vagyok");
  //     console.log(user);
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(uid);

  //       // loadUserRole(uid, setUserData, navigate);
  //     } else {
  //       console.log("nem mukodik");
  //       // setUserData(null);
  //     }
  //   });
  // }, [loggedIn]);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <ProductsContext.Provider
        value={{ productsList, setProductsList, setTrigger }}
      >
        <CartContext.Provider value={{ cart, setCart, setTriggerHeader }}>
          <UserCartContext.Provider
            value={{ userCart, setUserCart, setTrigger }}
          >
            <HelperContext.Provider value={{ helper, setHelper }}>
              <div className="main-container">
                <Header />

                <div>
                  <Outlet className="outlet_container" />
                </div>
                <Footer />
              </div>
            </HelperContext.Provider>
          </UserCartContext.Provider>
        </CartContext.Provider>
      </ProductsContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
