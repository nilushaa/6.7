import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductList from "./pages/productList";
import ProductDetail from "./pages/productDeta";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}
