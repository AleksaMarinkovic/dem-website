import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import ProductsPage from "../components/ProductsPage";
import Info from "../components/Info";
import Blog from "../components/Blog";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import AdminPage from "../components/AdminPage";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route path="/products" element={<ProductsPage />} exact></Route>
        <Route path="/info" element={<Info />} exact></Route>
        <Route path="/blog" element={<Blog />} exact></Route>
        <Route path="/admin" element={<AdminPage />} exact></Route>
        <Route path="/*" element={<HomePage />}></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
