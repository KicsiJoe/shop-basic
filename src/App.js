import { Link, NavLink, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "../src/css/App.css"

function App() {
  return (
    <div className="main-container">
      <Header />
      <div className="outlet_container">
      <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
