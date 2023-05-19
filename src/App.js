import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import "../src/css/App.css";
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { CartContext } from "./contexts/CartContext.js";

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  const [cart, setCart] = useState({});
  console.log(cart);
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <CartContext.Provider value={{cart, setCart}}>
      <div className="main-container">
        <Header />
        <div>
          <Outlet className="outlet_container" />
        </div>
        <Footer />
      </div>
      </CartContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
