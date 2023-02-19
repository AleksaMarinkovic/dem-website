import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Table from "./TableAdmin";
import useLocalStorageState from "use-local-storage-state";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProductForm from "./ProductForm";
import AdminPageCategories from "./AdminPageCategories";

const AdminPage = () => {
  const [password, setPassword, { removeItem }] = useLocalStorageState(
    "password",
    {
      defaultValue: "",
    }
  );
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [fetchedProducts, setFetchedProducts] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState(false);
  const [productToChange, setProductToChange] = useState();
  const productToAddDefault = {
    productName: "",
    productDescription: "",
    productAvailability: true,
    productCategory: "",
    productImageUrl: "",
  };
  const [productToAddImageData, setProductToAddImageData] = useState();
  const [productToChangeImageData, setProductToChangeImageData] = useState();
  const [productToAdd, setProductToAdd] = useState(productToAddDefault);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const columns = useMemo(
    () => [
      {
        Header: "Proizvodi",
        columns: [
          {
            id: "col1",
            Header: "Naziv",
            accessor: (row) => row.productName,
          },
          {
            id: "col2",
            Header: "Kategorija",
            accessor: (row) => row.productCategory,
          },
          {
            id: "col3",
            Header: "Dostupnost",
            accessor: (row) =>
              row.productAvailability ? "Na stanju" : "Nije na stanju",
          },
        ],
      },
    ],
    []
  );

  const addFileChangeHandler = (e) => {
    setProductToAddImageData(e.target.files[0]);
  };
  const changeFileChangeHandler = (e) => {
    setProductToChangeImageData(e.target.files[0]);
  };

  useEffect(() => {
    if (password !== "admin") {
      setPassword(prompt("Password: "));
    }
    if(!fetchedProducts){
      async function fetchData() {
        await Axios.get("/getProducts")
          .then((response) => {
            if (response.data.success) {
              setProducts(response.data.data);
              setFetchedProducts(true);
            }
          })
          .catch((error) => {
            if (error.response) {
              setError(error.response.data.message);
              setProductToChange();
            }
            if (error.request) {
              // request made no response from server
              setError("Error 003");
              setProductToChange();
            } else {
              // request setup failed
              setError("Error 004");
              setProductToChange();
            }
          });
      }
      fetchData();
    }
    if(!fetchedCategories){
      async function fetchCategoryData() {
        await Axios.get("/getCategories")
          .then((response) => {
            if (response.data.success) {
              setCategories(response.data.data);
              setFetchedCategories(true);
            }
          })
          .catch((error) => {
            if (error.response) {
              setError(error.response.data.message);
            }
            if (error.request) {
              // request made no response from server
              setError("Error 003");
            } else {
              // request setup failed
              setError("Error 004");
            }
          });
      }
      fetchCategoryData();

    }

    if(fetchedCategories && fetchedProducts){
      setIsBusy(false);
    }
  }, [productToChange, productToAdd, fetchedCategories, fetchedProducts]);

  const onRowChange = (product) => {
    setProductToChange(product);
    setSuccessMessage();
  };

  const onFormInputChange = (event) => {
    const { name, value } = event.target;
    setProductToChange({
      ...productToChange,
      [name]: value,
    });
  };

  const onFormInputChangeCheckbox = (event) => {
    const { checked } = event.target;
    setProductToChange({
      ...productToChange,
      productAvailability: checked,
    });
  };

  const onAddFormInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name: " + name,"value: " + value);
    setProductToAdd({
      ...productToAdd,
      [name]: value,
    });
  };

  const onAddFormInputChangeCheckbox = (event) => {
    const { checked } = event.target;
    setProductToAdd({
      ...productToAdd,
      productAvailability: checked,
    });
  };

  const changeProduct = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("_id", productToChange._id);
    if (productToChangeImageData)
      data.append("image", productToChangeImageData);
    data.append("productName", productToChange.productName);
    data.append("productCategory", productToChange.productCategory);
    data.append("productAvailability", productToChange.productAvailability);
    data.append("productDescription", productToChange.productDescription);

    Axios.post("/updateWithId", data)
      .then((response) => {
        if (response.data.success) {
          setProductToChange();
          setSuccessMessage("Uspešno izmenjen proizvod");
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setError(error.response.data.message);
          setProductToChange();
        }
        if (error.request) {
          // request made no response from server
          setError("Error 003");
          setProductToChange();
        } else {
          // request setup failed
          setError("Error 004");
          setProductToChange();
        }
      });
  };

  const onAddProductClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", productToAddImageData);
    data.append("productName", productToAdd.productName);
    data.append("productCategory", productToAdd.productCategory);
    data.append("productAvailability", productToAdd.productAvailability);
    data.append("productDescription", productToAdd.productDescription);

    Axios.post("/single", data)
      .then((response) => {
        if (response.data.success) {
          setProductToAdd(productToAddDefault);
          setSuccessMessage("Uspešno dodat proizvod");
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setError(error.response.data.message);
          setProductToAdd(productToAddDefault);
        }
        if (error.request) {
          // request made no response from server
          setError("Error 003");
          setProductToAdd(productToAddDefault);
        } else {
          // request setup failed
          setError("Error 004");
          setProductToAdd(productToAddDefault);
        }
      });
  };

  const logout = () => {
    redirect("./");
    removeItem();
  };

  return password === "admin" ? (
    <motion.div
      key="adminPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isBusy && <div>Loading</div>}
      {!isBusy && (
        <div
          style={{ maxWidth: "100%" }}
          className="horizontal-container-admin"
        >
          <div className="vertical-admin-page-container">
            <Table
              columns={columns}
              data={products}
              onRowSelect={onRowChange}
            />
            {productToChange ? (
              <ProductForm
                onSubmit={changeProduct}
                valueName={productToChange.productName}
                valueCategory={productToChange.productCategory}
                valueDescription={productToChange.productDescription}
                valueAvailability={productToChange.productAvailability}
                onFormInputChange={onFormInputChange}
                onFormInputChangeCheckbox={onFormInputChangeCheckbox}
                buttonText="IZMENI"
                fileChangeHandler={changeFileChangeHandler}
                categories={categories}
                isAdd={false}
              ></ProductForm>
            ) : (
              <div>Kliknite na neki proizvod da ga izmenite</div>
            )}
            {successMessage ? (
              <div>{successMessage}</div>
            ) : (
              <div style={{ visibility: "hidden" }}></div>
            )}
            <NavLink onClick={logout} to="/">
              IZLOGUJ SE
            </NavLink>
          </div>
          <div className="vertical-admin-page-container">
            <div>UNESITE PODATKE DA DODATE NOVI PROIZVOD NA SAJT: </div>
            <ProductForm
              onSubmit={onAddProductClick}
              valueName={productToAdd.productName}
              valueCategory={productToAdd.productCategory}
              valueDescription={productToAdd.productDescription}
              valueAvailability={productToAdd.productAvailability}
              onFormInputChange={onAddFormInputChange}
              onFormInputChangeCheckbox={onAddFormInputChangeCheckbox}
              buttonText="DODAJ"
              fileChangeHandler={addFileChangeHandler}
              categories={categories}
              isAdd={true}
            ></ProductForm>
          </div>
          <AdminPageCategories></AdminPageCategories>
        </div>
      )}
    </motion.div>
  ) : (
    <div>Neispravan password: {password}</div>
  );
};

export default AdminPage;
