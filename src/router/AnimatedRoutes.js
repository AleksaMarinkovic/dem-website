import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../components/HomePage";
import Products from "../components/Products";
import Info from "../components/Info";
import Blog from "../components/Blog";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} exact></Route>
        <Route path="/products" element={<Products />} exact></Route>
        <Route path="/info" element={<Info />} exact></Route>
        <Route path="/blog" element={<Blog />} exact></Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
