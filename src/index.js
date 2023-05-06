import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Account from "./components/Account";
import About from "./components/About";
import Search from "./components/Search";
import Cart from "./components/Cart";
import Favorites from "./components/Favorites";
import Themes from "./components/Themes";
import {Auth, AuthAdmin }from "./components/Auth";
import Admin from "./components/Admin/Admin";
import AdminProductsList from "./components/Admin/AdminProductsList";
import AdminDelProduct from "./components/Admin/AdminDelProduct";
import AdminEditProduct from "./components/Admin/AdminEditProduct"
import AdminNewProduct from "./components/Admin/AdminNewProduct"

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
      // {
      //   path: "/about",
      //   element: (
      //     <Auth>
      //       <About />
      //     </Auth>
      //   ),
      // },
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
