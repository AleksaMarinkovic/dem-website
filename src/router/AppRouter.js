import React from "react";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AnimatedRoutes from "./AnimatedRoutes";

const AppRouter = () => {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="page-container">
          <AnimatedRoutes />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
