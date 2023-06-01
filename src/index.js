import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./pages/Account";
import About from "./pages/About";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import {Auth, AuthAdmin }from "./components/Auth";
import Admin from "./pages/Admin";
import AdminProductsList from "./components/Admin/AdminProductsList";
import AdminDelProduct from "./components/Admin/AdminDelProduct";
import AdminEditProduct from "./components/Admin/AdminEditProduct"
import AdminNewProduct from "./components/Admin/AdminNewProduct"
import Home from "./pages/Home";
import Themes from "./pages/Themes";
import Cart from "./pages/Cart.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      {
        path: "/about",
        element: <About />,
      },
      { path: "/search", element: <Search /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/themes", element: <Themes /> },
      { path: "/cart", element: <Cart /> },
      { path: "/account", element: <Account /> },
      { path: "/admin", element: <AuthAdmin><Admin /> </AuthAdmin>},
      { path: "/admin/products/:pageId/:sortBy/:sortType", element: <AuthAdmin><AdminProductsList /> </AuthAdmin>},
      { path: "/admin/new-product", element: <AuthAdmin><AdminNewProduct /> </AuthAdmin>},
      { path: "/admin/product/edit/:productId", element: <AuthAdmin><AdminEditProduct /> </AuthAdmin>},
      { path: "/admin/product/del/:productId", element: <AuthAdmin><AdminDelProduct /> </AuthAdmin>},
    ],
  },
]);
  

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
