import Axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ProductPage = () => {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [isBusy, setIsBusy] = useState(true);
  const [fetchError, setFetchError] = useState();

  useEffect(() => {
    async function fetchData() {
      await Axios.post("/getProductById", {
        _id: id,
      })
        .then((response) => {
          if (response.data.success) {
            setProduct(response.data.data);
            setIsBusy(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            // request made and server responded
            setProduct();
            setFetchError(error.response.data.message);
          } else if (error.request) {
            // request made no response from server
            setProduct();
            setFetchError("Error 003");
          } else {
            // request setup failed
            setFetchError("Error 004");
            setProduct();
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
    className="page-padding">
      {isBusy && !fetchError && !fetchError && <div>Loading</div>}
      {fetchError ? (
        <div className="error-message">{fetchError}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
      {!isBusy && (
        <div className="product-details-page-vertical-container">
          <div className="product-details-page-name">{product.productName}</div>
          <div className="product-details-page-horizontal-container">
            <img src={product.productImageUrl} alt={product.productName}></img>
            <div className="product-details-page-vertical-content-container">
              <div className="product-details-page-category">
                Kategorija: {product.productCategory}
              </div>
              <div className="product-details-page-description">
                Opis: {product.productDescription}
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ProductPage;
