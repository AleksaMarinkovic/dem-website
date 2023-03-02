import React from "react";
import { useNavigate } from "react-router-dom";

const Product = (props) => {
  const navigate = useNavigate(); 

  const onClickProduct = () => {
    navigate("/products/" + props._id);
  };

  return (
    <div className="product-item-wrapper">
      <div className="product-secondary-wrapper" onClick={onClickProduct}>
        <img
          src={props.productImageUrl}
          alt={props.productName}
          className="product-item-image"
        ></img>
        <div className="text-background-wrapper">
          <div className="product-item-name">{props.productName}</div>
        </div>
      </div>
    </div>
  );
};

export default Product;
