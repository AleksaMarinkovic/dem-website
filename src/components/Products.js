import React from "react";
import { motion } from "framer-motion";

const Products = () => {
  return (
    <motion.div 
    key="products"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      <div id="top" className="top-anchor" />
      PROIZVODI STRANA
    </motion.div>
  );
};
export default Products;
