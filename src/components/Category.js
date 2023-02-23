import { React, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Category = (props) => {
  const [category, setCategory] = useState(props);
  const navigate = useNavigate();

  const onClickCategory = () => {
    navigate("/products/categories/" + category.categoryName);
  };

  return (
    <motion.div className="product-item-wrapper" onClick={onClickCategory}>
      <div className="product-item-image-wrapper">
        <img
          src={category.categoryImageUrl}
          alt={category.categoryName}
          className="product-item-image"
        ></img>
      </div>
      <div className="product-item">
        <div className="product-item-name">{category.categoryName}</div>
      </div>
    </motion.div>
  );
};
export default Category;
