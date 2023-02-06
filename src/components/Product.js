import React, { useState } from "react";

const Product = (props) => {
  const [product, setProduct] = useState(props);
  return (
    <div className="product-item-wrapper">
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
