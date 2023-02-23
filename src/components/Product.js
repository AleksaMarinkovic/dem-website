import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const [product, setProduct] = useState(props);
  const navigate = useNavigate();
  const onClickProduct = () => {
    navigate("/products/"+product._id);
  };
  return (
    <div className="product-item-wrapper" onClick={onClickProduct}>
      <div className="product-item-image-wrapper">
        <img
          src={product.productImageUrl}
          alt={product.productName}
          className="product-item-image"
        ></img>
      </div>
      <div className="product-item">
        <div className="product-item-name">{product.productName}</div>
        <div className="product-item-category">{product.productCategory}</div>
        <div className="product-item-description">
          {product.productDescription}
        </div>
      </div>
    </div>
  );
};

export default Product;
