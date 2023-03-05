import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Product from "./Product";
import LoadingSpinner from "./LoadingSpinner";

const ProductsPage = () => {
  const [data, setData] = useState([]);
  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [fetchError, setFetchError] = useState();
  const [sortBy, setSortBy] = useState("name");
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getAvailableProducts")
        .then((response) => {
          if (response.data.success) {
            // sort recieved data by sorBy parameter, then set state
            setData(response.data.data);
            setIsBusy(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            setFetchError(error.response.data.message);
          } else if (error.request) {
            setFetchError("Error 003");
          } else {
            setFetchError("Error 004");
          }
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    let filteredData = data.filter(
      (item) =>
        item.productCategory.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.productManufacturer.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.productName.toLowerCase().includes(searchFilter.toLowerCase()) ||
        item.productDescription.toLowerCase().includes(searchFilter.toLowerCase())
    );
    setDataToDisplay(sortProducts(sortBy, filteredData));
  }, [sortBy, searchFilter, data]);

  const onSortChange = (event) => {
    const { value } = event.target;
    setSortBy(value);
  };

  const sortProducts = (typeOfSort, array) => {
    switch (typeOfSort) {
      case "name":
        return array.sort((a, b) => a.productName.localeCompare(b.productName));
      case "manufacturer":
        return array.sort((a, b) =>
          a.productManufacturer.localeCompare(b.productManufacturer)
        );
      case "category":
        return array.sort((a, b) =>
          a.productCategory.localeCompare(b.productCategory)
        );
      default:
        return array.sort((a, b) => a.productName.localeCompare(b.productName));
    }
  };

  const onSearchFilterChange = (event) => {
    const { value } = event.target;
    setSearchFilter(value);
  };

  return (
    <motion.div
      key="productsPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div id="top" className="top-anchor" />
      {isBusy && !fetchError && <LoadingSpinner />}
      {fetchError ? (
        <div className="error-message">{fetchError}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
      {!isBusy && (
        <div>
          <label htmlFor="sort">Sortiraj po:</label>
          <select id="sort" name="sort" onChange={onSortChange} value={sortBy}>
            <option value="name" key="name">
              Nazivu
            </option>
            <option value="manufacturer" key="manufacturer">
              Proizvođaču
            </option>
            <option value="category" key="category">
              Kategoriji
            </option>
          </select>
          <label htmlFor="naziv">Pretraga:</label>
          <input
            style={{ width: "200px" }}
            value={searchFilter}
            type="text"
            id="filter"
            name="filter"
            onChange={onSearchFilterChange}
          ></input>
          <div className="product-list-container">
            {dataToDisplay.map((item) => {
              return <Product {...item} />;
            })}
          </div>
        </div>
      )}
    </motion.div>
  );
};
export default ProductsPage;
