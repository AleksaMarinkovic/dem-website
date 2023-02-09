import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Table from "./TableAdmin";
import useLocalStorageState from "use-local-storage-state";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";

const AdminPage = () => {
  const [password, setPassword, { removeItem }] = useLocalStorageState(
    "password",
    {
      defaultValue: "",
    }
  );
  const [products, setProducts] = useState([]);
  const [isBusy, setIsBusy] = useState(true);
  const [productToChange, setProductToChange] = useState();
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

  useEffect(() => {
    if (password !== "admin") {
      setPassword(prompt("Password: "));
    }
    async function fetchData() {
      await Axios.get("/getProducts")
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data);
            setIsBusy(false);
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
  }, [productToChange]);

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
    console.log(productToChange);
  };

  const onFormInputChangeCheckbox = (event) => {
    const { checked } = event.target;
    setProductToChange({
      ...productToChange,
      productAvailability: checked,
    });
  };

  const changeProduct = (event) => {
    event.preventDefault();
    Axios.post("/updateWithId", { ...productToChange })
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

  const logout = () => {
    redirect("./");
    removeItem();
  };

  return password === "admin" ? (
    <motion.div
      key="adminPage"
      className="horizontal-container-admin"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isBusy && <div>Loading</div>}
      {!isBusy && (
        <div style={{ maxWidth: "100%" }}>
          <Table columns={columns} data={products} onRowSelect={onRowChange} />
          {productToChange ? (
            <div>
              <form
                onSubmit={changeProduct}
                className="vertical-admin-page-container"
              >
                <label className="form-text" htmlFor="naziv">
                  Naziv:
                </label>
                <input
                  className="form-input"
                  value={productToChange.productName}
                  type="text"
                  id="naziv"
                  name="productName"
                  required
                  onChange={onFormInputChange}
                ></input>
                <label className="form-text" htmlFor="kategorija">
                  Kategorija:
                </label>
                <input
                  className="form-input"
                  value={productToChange.productCategory}
                  type="text"
                  id="kategorija"
                  name="productCategory"
                  required
                  onChange={onFormInputChange}
                ></input>
                <label className="form-text" htmlFor="opis">
                  Opis:
                </label>
                <input
                  className="form-input"
                  value={productToChange.productDescription}
                  type="text"
                  id="opis"
                  name="productDescription"
                  required
                  onChange={onFormInputChange}
                ></input>
                <label className="form-text" htmlFor="dostupnost">
                  Dostupnost:
                </label>
                <input
                  className="form-input"
                  checked={productToChange.productAvailability}
                  onClick={onFormInputChangeCheckbox}
                  name="productAvailability"
                  type="checkbox"
                  id="dostupnost"
                ></input>
                <button className="button-form-adminpage" type="submit">
                  IZMENI
                </button>
              </form>
            </div>
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
      )}
    </motion.div>
  ) : (
    <div>Neispravan password: {password}</div>
  );
};

export default AdminPage;
