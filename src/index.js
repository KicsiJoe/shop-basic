import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Account from "./pages/Account";
import About from "./pages/About";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import { AuthAdmin, AuthAnonym } from "./components/Auth";
import Admin from "./pages/Admin";
import AdminDelProduct from "./components/Admin/AdminDelProduct";
import Home from "./pages/Home";
import Themes from "./pages/Themes";
import Cart from "./pages/Cart";
import AdminProductsList from "./pages/AdminProductsList";
import AdminNewProduct from "./pages/AdminNewProduct";
import AdminEditProduct from "./pages/AdminEditProduct";
import AdminBasic from "./pages/AdminBasic";
import Orders from "./pages/Orders";

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
      { path: "/orders", element: <AuthAnonym><Orders /></AuthAnonym> },
      { path: "/search", element: <Search /> },
      { path: "/favorites", element: <Favorites /> },
      { path: "/themes", element: <Themes /> },
      { path: "/cart", element: <Cart /> },
      { path: "/account", element: <Account /> },
      {
        path: "/admin",
        element: (
          <AuthAdmin>
            <AdminBasic />
          </AuthAdmin>
        ),
        children: [
          {
            path: "/admin",
            element: <Admin />,
          },
          {
            path: "/admin/products/:pageId/:sortBy/:sortType",
            element: <AdminProductsList />,
          },
          {
            path: "/admin/new-product",
            element: <AdminNewProduct />,
          },
          {
            path: "/admin/product/edit/:productId",
            element: <AdminEditProduct />,
          },
          {
            path: "/admin/product/del/:productId",
            element: <AdminDelProduct />,
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <RouterProvider router={router} />
  </>
);
