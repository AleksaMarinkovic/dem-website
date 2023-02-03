import React from "react";
import { motion } from "framer-motion";

const Blog = () => {
  return (
    <motion.div
    key="blog"
    initial={{opacity: 0}}
    animate={{opacity: 1}}
    exit={{opacity: 0}}
    >
      <div id="top" className="top-anchor" />
      BLOG 
    </motion.div>
  );
};

export default Blog;
