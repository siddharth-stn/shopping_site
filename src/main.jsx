import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/styles.css";
import { BrowserRouter, Route, Routes } from "react-router";
import CommonLayout from "./components/CommonLayout";
import Homepage from "./pages/Homepage";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import CartContext from "./utilities/CartContext";
import { ToastContainer } from "react-toastify";
import ViewCart from "./pages/ViewCart";


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CartContext>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route element={<CommonLayout />}>
            <Route path="/" element={<Homepage />} />
            <Route path="product-list" element={<ProductList />} />
            <Route
              path="product-details/:productId"
              element={<ProductDetails />}
            />
            <Route path="view-cart" element={<ViewCart />} />
          </Route>

        </Routes>
      </BrowserRouter>
    </CartContext>
  </StrictMode>,
);
