import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer";
import "../src/css/App.css";
import { useState } from "react";
import { AuthContext } from "./contexts/AuthContext";

function App() {
  const [loggedIn, setLoggedIn] = useState({});
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      <div className="main-container">
        <Header />
        <div>
          <Outlet className="outlet_container" />
        </div>
        <Footer />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
