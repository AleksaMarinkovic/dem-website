import React from "react";
import { motion } from "framer-motion";

const ServicePage = () => {
  return (
    <motion.div
      key="service"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div id="top" className="top-anchor" />
      FROM SERVICE PAGE
    </motion.div>
  );
};

export default ServicePage;
