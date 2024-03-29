import React, { useEffect, useState, useMemo } from "react";
import { motion } from "framer-motion";
import Axios from "axios";
import Table from "./TableAdmin";
import { redirect } from "react-router-dom";
import { NavLink } from "react-router-dom";
import ProductForm from "./ProductForm";
import AdminPageCategories from "./AdminPageCategories";
import AdminPageManufacturers from "./AdminPageManufacturers";
import AdminPageAlbums from "./AdminPageAlbums";
import AdminPageCertificates from "./AdminPageCertificates";
import Collapsible from "react-collapsible";
import {
  CollapsibleTriggerOpened,
  CollapsibleTrigger,
} from "./CollapsibleTrigger";
import LoadingSpinner from "./LoadingSpinner";

const AdminPage = () => {
  const [tokenSession, setSetTokenSession] = useState(null);
  const [randomStringAdd, setRandomStringAdd] = useState(Math.random().toString(36));
  const [randomStringChange, setRandomStringChange] = useState(Math.random().toString(36));

  const productToAddDefault = {
    productName: "",
    productDescription: "",
    productHighlighted: false,
    productAvailability: true,
    productManufacturer: "",
    productCategory: "",
    productImageUrl: "",
  };

  //data changed
  const [changedData, setChangedData] = useState(false);
  //fetched products
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);

  //busy means its in process of fetching data
  //fetchedProducts and Categories means data has been successfully fetched
  const [isBusy, setIsBusy] = useState(true);
  const [fetchedProducts, setFetchedProducts] = useState(false);
  const [fetchedCategories, setFetchedCategories] = useState(false);
  const [fetchedManufacturers, setFetchedManufacturers] = useState(false);

  //state for adding or changing products
  const [productToChange, setProductToChange] = useState();
  const [productToAdd, setProductToAdd] = useState(productToAddDefault);

  //state for image data for adding or changing products
  const [productToAddImageData, setProductToAddImageData] = useState();
  const [productToChangeImageData, setProductToChangeImageData] = useState();

  //error message if change or add didn't execute properly
  const [changeError, setChangeError] = useState(null);
  const [addError, setAddError] = useState(null);

  //error message if fetch products/categories didn't execute properly
  const [fetchErrorProducts, setFetchErrorProducts] = useState(null);
  const [fetchErrorCategories, setFetchErrorCategories] = useState(null);
  const [fetchErrorManufacturers, setFetchErrorManufacturers] = useState(null);

  //error message on login
  const [loginError, setLoginError] = useState(null);

  //success message if change or add executed properly
  const [successMessageChange, setSuccessMessageChange] = useState(null);
  const [successMessageAdd, setSuccessMessageAdd] = useState(null);

  //setup columns for table
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
            Header: "Proizvođač",
            accessor: (row) => row.productManufacturer,
          },
          {
            id: "col4",
            Header: "Dostupnost",
            accessor: (row) =>
              row.productAvailability ? "Dostupan" : "Nije dostupan",
          },
          {
            id: "col5",
            Header: "Istaknut",
            accessor: (row) =>
              row.productHighlighted ? "Istaknut" : "Nije istaknut",
          },
          {
            id: "col6",
            Header: "Naslovna slika",
            Cell: (tableProps) => (
              <img
                style={{ maxWidth: "10vw", maxHeight: "auto" }}
                src={tableProps.row.original.productImageUrl}
                alt={tableProps.row.original.productName}
              />
            ),
            accessor: (row) => row.productImageUrl,
          },
        ],
      },
    ],
    []
  );

  // login
  useEffect(() => {
    if (tokenSession === null) {
      let insertedUsername = prompt("Username: ");
      let insertedPassword = prompt("Password: ");
      async function checkUser(user, pass) {
        const data = new FormData();
        data.append("user", user);
        data.append("password", pass);
        await Axios.post("/adminLogin", data)
          .then((response) => {
            if (response.data.success && response.data.data !== undefined) {
              setSetTokenSession(response.data.data);
            }
            if (!response.data.success) {
              setLoginError(response.data.message);
            }
          })
          .catch((error) => {
            if (error.response) {
              // request made and server responded
              setLoginError(error.response.data.message);
              return;
            } else if (error.request) {
              // request made no response from server
              setLoginError("Error 003");
              return;
            } else {
              // request setup failed
              setLoginError("Error 004");
              return;
            }
          });
      }
      checkUser(insertedUsername, insertedPassword);
    }
  }, [tokenSession, setSetTokenSession]);

  // fetch data
  useEffect(() => {
    if (tokenSession) {
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
              setFetchErrorProducts(
                error.response.data.message + " - proizvodi"
              );
              setProductToChange();
            } else if (error.request) {
              // request made no response from server
              setFetchErrorProducts("Error 003 - proizvodi");
              setProductToChange();
            } else {
              // request setup failed
              setFetchErrorProducts("Error 004 - proizvodi");
              setProductToChange();
            }
          });
      }
      fetchData();

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
              setFetchErrorCategories(
                error.response.data.message + " - kategorije"
              );
            } else if (error.request) {
              // request made no response from server
              setFetchErrorCategories("Error 003 - kategorije");
            } else {
              // request setup failed
              setFetchErrorCategories("Error 004 - kategorije");
            }
          });
      }
      fetchCategoryData();

      async function fetchManufacturerData() {
        await Axios.get("/getManufacturers")
          .then((response) => {
            if (response.data.success) {
              setManufacturers(response.data.data);
              setFetchedManufacturers(true);
            }
          })
          .catch((error) => {
            if (error.response) {
              setFetchErrorManufacturers(
                error.response.data.message + " - proizvođači"
              );
            } else if (error.request) {
              // request made no response from server
              setFetchErrorManufacturers("Error 003 - proizvođači");
            } else {
              // request setup failed
              setFetchErrorManufacturers("Error 004 - proizvođači");
            }
          });
      }
      fetchManufacturerData();
    }
  }, [tokenSession, changedData]);

  // allow render when all is fetched
  useEffect(() => {
    if (fetchedCategories && fetchedProducts && fetchedManufacturers) {
      setIsBusy(false);
    }
  }, [fetchedCategories, fetchedProducts, fetchedManufacturers, changedData]);

  // When a row in the table of categories is selected, set ProductToChange state to the row values
  const onRowChange = (product) => {
    setProductToChange(product);
    setSuccessMessageChange();
    setChangeError();
    document
      .getElementById("izmenaProduct")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // When a product image is uploaded in add product form, sets state to uploaded image
  const addFileChangeHandler = (e) => {
    setProductToAddImageData(e.target.files[0]);
  };

  // When something changes in add product form, set state to new input value
  const onAddFormInputChange = (event) => {
    const { name, value } = event.target;
    setProductToAdd({
      ...productToAdd,
      [name]: value,
    });
  };

  // When something changes in add category form CHECKBOX, set state to new input value
  const onAddFormInputChangeCheckbox = (event) => {
    const { checked } = event.target;
    setProductToAdd({
      ...productToAdd,
      productAvailability: checked,
    });
  };

  const onAddFormInputChangeCheckboxHighlighted = (event) => {
    const { checked } = event.target;
    setProductToAdd({
      ...productToAdd,
      productHighlighted: checked,
    });
  };

  // Triggers when submit is pressed on add product form
  const onAddProductClick = (e) => {
    e.preventDefault();
    console.log(e);
    const data = new FormData();
    data.append("image", productToAddImageData);
    data.append("productName", productToAdd.productName);
    data.append("productCategory", productToAdd.productCategory);
    data.append("productAvailability", productToAdd.productAvailability);
    data.append("productDescription", productToAdd.productDescription);
    data.append("productManufacturer", productToAdd.productManufacturer);
    data.append("productHighlighted", productToAdd.productHighlighted);

    Axios.post("/addProduct", data)
      .then((response) => {
        if (response.data.success) {
          setProductToAdd(productToAddDefault);
          setSuccessMessageAdd(response.data.message);
          setChangedData(!changedData);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setAddError(error.response.data.message);
          setProductToAdd(productToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setAddError("Error 003");
          setProductToAdd(productToAddDefault);
        } else {
          // request setup failed
          setAddError("Error 004");
          setProductToAdd(productToAddDefault);
        }
      });
      setRandomStringAdd(Math.random().toString(36));
  };

  // When a product image is uploaded in change product form, sets state to uploaded image
  const changeFileChangeHandler = (e) => {
    setProductToChangeImageData(e.target.files[0]);
  };

  // When something changes in change product form, set state to new input value
  const onChangeFormInputChange = (event) => {
    const { name, value } = event.target;
    setProductToChange({
      ...productToChange,
      [name]: value,
    });
  };

  // When something changes in change category form CHECKBOX, set state to new input value
  const onChangeFormInputChangeCheckbox = (event) => {
    const { checked } = event.target;
    setProductToChange({
      ...productToChange,
      productAvailability: checked,
    });
  };

  const onChangeFormInputChangeCheckboxHighlighted = (event) => {
    const { checked } = event.target;
    setProductToChange({
      ...productToChange,
      productHighlighted: checked,
    });
  };

  // Triggers when submit is pressed on change product form
  const onChangeProductClick = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("_id", productToChange._id);
    if (productToChangeImageData)
      data.append("image", productToChangeImageData);
    data.append("productName", productToChange.productName);
    data.append("productCategory", productToChange.productCategory);
    data.append("productAvailability", productToChange.productAvailability);
    data.append("productDescription", productToChange.productDescription);
    data.append("productManufacturer", productToChange.productManufacturer);
    data.append("productHighlighted", productToChange.productHighlighted);

    Axios.post("/updateProductWithId", data)
      .then((response) => {
        if (response.data.success) {
          setProductToChange();
          setSuccessMessageChange(response.data.message);
          setChangedData(!changedData);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setChangeError(error.response.data.message);
          setProductToChange();
        } else if (error.request) {
          // request made no response from server
          setChangeError("Error 003");
          setProductToChange();
        } else {
          // request setup failed
          setChangeError("Error 004");
          setProductToChange();
        }
      });
      setRandomStringChange(Math.random().toString(36));
  };

  // Triggers when logout button is pressed. Removes password from localstorage
  const logout = () => {
    redirect("./");
  };

  return tokenSession ? (
    <motion.div
      key="adminPage"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {isBusy &&
        !fetchErrorProducts &&
        !fetchErrorCategories &&
        !fetchErrorManufacturers && <LoadingSpinner />}
      {fetchErrorProducts ? (
        <div className="error-message">{fetchErrorProducts}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
      {fetchErrorCategories ? (
        <div className="error-message">{fetchErrorCategories}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
      {fetchErrorManufacturers ? (
        <div className="error-message">{fetchErrorManufacturers}</div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
      {!isBusy && (
        <div style={{ maxWidth: "100%" }} className="vertical-container-admin">
          <Collapsible
            trigger={<CollapsibleTrigger text="PROIZVODI" />}
            triggerWhenOpen={<CollapsibleTriggerOpened text="PROIZVODI" />}
            className="collapsible-wrapper"
            openedClassName="collapsible-wrapper-opened"
          >
            <div className="vertical-admin-page-container">
              <div className="form-container">
                <div className="form-header-text">
                  IZMENA PODATAKA POSTOJEĆEG PROIZVODA:{" "}
                </div>
                <Table
                  columns={columns}
                  data={products}
                  onRowSelect={onRowChange}
                />
                <div id="izmenaProduct" visibility="hidden"></div>
                {productToChange ? (
                  <div className="form-container-inner">
                    <ProductForm
                      onSubmit={onChangeProductClick}
                      valueName={productToChange.productName}
                      valueCategory={productToChange.productCategory}
                      valueDescription={productToChange.productDescription}
                      valueAvailability={productToChange.productAvailability}
                      valueHighlighted={productToChange.productHighlighted}
                      valueManufacturer={productToChange.productManufacturer}
                      onFormInputChange={onChangeFormInputChange}
                      onFormInputChangeCheckbox={
                        onChangeFormInputChangeCheckbox
                      }
                      onFormInputChangeCheckboxHighlighted = {onChangeFormInputChangeCheckboxHighlighted}
                      buttonText="IZMENI"
                      fileChangeHandler={changeFileChangeHandler}
                      categories={categories}
                      manufacturers={manufacturers}
                      isAdd={false}
                      randomString = {randomStringChange}
                    ></ProductForm>
                  </div>
                ) : (
                  <div className="form-header-text">
                    Kliknite na proizvod u tabeli da ga izmenite
                  </div>
                )}
              </div>
              {successMessageChange ? (
                <div className="success-message">{successMessageChange}</div>
              ) : (
                <div style={{ visibility: "hidden" }}></div>
              )}
              {changeError ? (
                <div className="error-message">{changeError}</div>
              ) : (
                <div style={{ visibility: "hidden" }}></div>
              )}
            </div>
            <div className="separator" style={{ width: "100%" }}></div>
            <div className="vertical-admin-page-container">
              <div className="form-container">
                <div className="form-header-text">
                  UNESITE PODATKE DA DODATE NOVI PROIZVOD:
                </div>
                <ProductForm
                  onSubmit={onAddProductClick}
                  valueName={productToAdd.productName}
                  valueCategory={productToAdd.productCategory}
                  valueDescription={productToAdd.productDescription}
                  valueAvailability={productToAdd.productAvailability}
                  valueHighlighted={productToAdd.productHighlighted}
                  valueManufacturer={productToAdd.productManufacturer}
                  onFormInputChange={onAddFormInputChange}
                  onFormInputChangeCheckbox={onAddFormInputChangeCheckbox}
                  onFormInputChangeCheckboxHighlighted = {onAddFormInputChangeCheckboxHighlighted}
                  buttonText="DODAJ"
                  fileChangeHandler={addFileChangeHandler}
                  categories={categories}
                  manufacturers={manufacturers}
                  isAdd={true}
                  randomString={randomStringAdd}
                ></ProductForm>
                {successMessageAdd ? (
                  <div className="success-message">{successMessageAdd}</div>
                ) : (
                  <div style={{ visibility: "hidden" }}></div>
                )}
                {addError ? (
                  <div className="error-message">{addError}</div>
                ) : (
                  <div style={{ visibility: "hidden" }}></div>
                )}
              </div>
            </div>
          </Collapsible>
          <Collapsible
            trigger={
              <CollapsibleTrigger text="KATEGORIJE"></CollapsibleTrigger>
            }
            triggerWhenOpen={<CollapsibleTriggerOpened text="KATEGORIJE" />}
            className="collapsible-wrapper"
            openedClassName="collapsible-wrapper-opened"
          >
            <AdminPageCategories></AdminPageCategories>
          </Collapsible>
          <Collapsible
            trigger={
              <CollapsibleTrigger text="PROIZVOĐAČI"></CollapsibleTrigger>
            }
            triggerWhenOpen={<CollapsibleTriggerOpened text="PROIZVOĐAČI" />}
            className="collapsible-wrapper"
            openedClassName="collapsible-wrapper-opened"
          >
            <AdminPageManufacturers></AdminPageManufacturers>
          </Collapsible>

          <Collapsible
            trigger={<CollapsibleTrigger text="ALBUMI"></CollapsibleTrigger>}
            triggerWhenOpen={<CollapsibleTriggerOpened text="ALBUMI" />}
            className="collapsible-wrapper"
            openedClassName="collapsible-wrapper-opened"
          >
            <AdminPageAlbums></AdminPageAlbums>
          </Collapsible>
          <Collapsible
          trigger={<CollapsibleTrigger text="SERTIFIKATI"></CollapsibleTrigger>}
          triggerWhenOpen={<CollapsibleTriggerOpened text="SERTIFIKATI" />}
          className="collapsible-wrapper"
          openedClassName="collapsible-wrapper-opened"
        >
          <AdminPageCertificates></AdminPageCertificates>
        </Collapsible>
          <NavLink onClick={logout} to="/" className="logout-adminpage">
            IZLOGUJ SE
          </NavLink>
        </div>
      )}
    </motion.div>
  ) : (
    <div className="error-message">{loginError}</div>
  );
};

export default AdminPage;
