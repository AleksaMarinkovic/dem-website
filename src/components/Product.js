import React from "react";
import { useNavigate } from "react-router-dom";
import { NavHashLink } from "react-router-hash-link";
import { BiCategory } from "react-icons/bi";
import { MdPrecisionManufacturing } from "react-icons/md";
import { TbMinusVertical } from "react-icons/tb";
import { MdReadMore } from "react-icons/md";

const Product = (props) => {
  const navigate = useNavigate();

  const onClickProduct = () => {
    navigate("/products/" + props._id);
  };

  return (
    <div>
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
        <div className='divider'></div>
        <div className="horizontal-product-text-container">
          <NavHashLink
            className="product-big-link"
            smooth
            to={"/products/" + props._id}
            title={"Stranica za proizvod: " + props.productName}
          >
            <div className="svg-container">
              <div>{props.productName}</div>
            </div>
          </NavHashLink>
        </div>
        <div className="horizontal-product-text-container" style={{paddingTop:'0'}}>
          <NavHashLink
            className="product-small-link-alt"
            smooth
            to={"/products/" + props._id}
            title="Detaljnije"
          >
            <div className="svg-container">
              <div>Detaljnije </div>
              <MdReadMore className="svg-1"></MdReadMore>
            </div>
          </NavHashLink>
        </div>
      </div>
    </div>
  );
};

export default Product;
