import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Product from "./Product";
import Category from "./Category";

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [fetchError, setFetchError] = useState();

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
            setFetchError(error.response.data.message);
          }
          else if (error.request) {
            setFetchError("Error 003");
          } else {
            setFetchError("Error 004");
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
      className="page-padding"
    >
      <div id="top" className="top-anchor" />
      {isBusy && !fetchError && <div>Loading</div>}
      {fetchError ? (
        <div className="error-message">{fetchError}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
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
