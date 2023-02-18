import React from "react";
import { motion } from "framer-motion";
import Partners from "./Partners";
import HomePageMain from "./HomePageMain";

const HomePage = () => {
  return (
    <motion.div 
    key="homepage"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      <div id="top" className="top-anchor" />
      <HomePageMain></HomePageMain>
      <Partners></Partners>
    </motion.div>
  );
};
export default HomePage;
