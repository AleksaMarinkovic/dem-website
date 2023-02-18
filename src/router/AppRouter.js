import React from "react";
import { HashRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import AnimatedRoutes from "./AnimatedRoutes";

const AppRouter = () => {
  return (
    <div>
      <HashRouter>
        <Header />
          <AnimatedRoutes />
        <Footer />
      </HashRouter>
    </div>
  );
};

export default AppRouter;
