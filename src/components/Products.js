import React from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import { useState, useEffect } from "react";

const Products = () => {
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getProducts")
        .then((response) => {
          setData(response.data.data);
          console.log(response.data.data);
          setIsBusy(false);
        })
        .catch((error) => {
          if (error.response) {
            console.log("ERROR: " + JSON.stringify(error.response.data));
          }
        });
    }
    fetchData();
  }, []);
  return (
    <motion.div
      key="products"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div id="top" className="top-anchor" />
      {isBusy && <div>Loading</div>}
      {!isBusy && (
        <div>
          {data.map((item) => {
            return (
              <ul className="product-item">
                <div className="product-item-name">{item.productName}</div>
                <div className="product-item-category">{item.productCategory}</div>
                <div className="product-item-description">{item.productDescription}</div>
              </ul>
            );
          })}
        </div>
      )}
    </motion.div>
  );
};
export default Products;
