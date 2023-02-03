import React from "react";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <motion.div 
    key="homepage"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      <div id="top" className="top-anchor" />
      GLAVNA STRANA
    </motion.div>
  );
};
export default HomePage;
