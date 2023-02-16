import Axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

const ProductPage = () => {
  let { id } = useParams();
  const [product, setProduct] = useState();
  const [isBusy, setIsBusy] = useState(true);

  useEffect(() => {
    async function fetchData() {
      await Axios.post("/getIndividualProduct", {
        _id: id,
      })
        .then((response) => {
          if (response.data.success) {
            setProduct(response.data.data);
            setIsBusy(false);
            console.log(response.data.data);
          }
        })
        .catch((error) => {
          if (error.response) {
            // request made and server responded
            setProduct();
            console.log(error.response.data.message);
          }
          if (error.request) {
            // request made no response from server
            setProduct();
            console.log("Error 003");
          } else {
            // request setup failed
            console.log("Error 004");
            setProduct();
          }
        });
    }
    fetchData();
  }, []);
  return isBusy ? (
    <motion.div>Loading</motion.div>
  ) : (
    <motion.div className="product-details-page-vertical-container">
      <div className="product-details-page-name">{product.productName}</div>
      <div className="product-details-page-horizontal-container">
        <img src={product.productImageUrl} alt={product.productName}></img>
        <div className="product-details-page-vertical-content-container">
          <div className="product-details-page-category">Kategorija: {product.productCategory}</div>
          <div className="product-details-page-description">Opis: {product.productDescription}</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductPage;
