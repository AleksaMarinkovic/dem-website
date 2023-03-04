import React from "react";
import { useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { BiCategory } from "react-icons/bi";
import { MdPrecisionManufacturing } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";

const Product = (props) => {
  const navigate = useNavigate();

  const onClickProduct = () => {
    navigate("/products/" + props._id);
  };

  return (
    <div className="product-item-wrapper">
      <div className="img-box" onClick={onClickProduct}>
        <img src={props.productImageUrl} alt={props.productName}></img>
      </div>
      <div className="horizontal-product-text-container">
        <NavHashLink
          className="product-small-link"
          smooth
          to={"/products/categories/" + props.productCategory}
          title={"Proizvodi iz kategorije " + props.productCategory}
        >
          <div className="svg-container">
            <BiCategory className="svg-1"></BiCategory>
            <div>{props.productCategory}</div>
          </div>
        </NavHashLink>
        <div className="product-small-text-separator">
          <TbMinusVertical></TbMinusVertical>
        </div>
        <div className="product-small-text">
          <div className="svg-container">
            <MdPrecisionManufacturing className="svg-1"></MdPrecisionManufacturing>
            <div>{props.productManufacturer}</div>
          </div>
        </div>
      </div>
      <div className="text-background-wrapper">
        <div className="product-item-name">{props.productName}</div>
      </div>
    </div> /*
    <div className="product-item">
    SAMPLE
    </div>*/
  );
};

export default Product;
