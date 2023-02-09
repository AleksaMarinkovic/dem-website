import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Product from "./Product";

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getAvailableProducts")
        .then((response) => {
          if (response.data.success) {
            setData(response.data.data);
            setIsBusy(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            setError(error.response.data.message);
          }
          if (error.request) {
            setError("Error 003");
          } else {
            setError("Error 004");
          }
        });
    }
    fetchData();
  }, []);
  return (
    <motion.div
      key="productsPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div id="top" className="top-anchor" />
      {isBusy && <div>Loading</div>}
      {!isBusy && (
        <div className="product-list-container">
          {data.map((item) => {
            return <Product {...item} />;
          })}
        </div>
      )}
    </motion.div>
  );
};
export default ProductsPage;
