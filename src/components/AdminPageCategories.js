import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Table from "./TableAdmin";
import CategoryForm from "./CategoryForm";

const AdminPageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  const categoryToAddDefault = {
    categoryName: "",
    categoryImageUrl: "",
  };
  const [fetchError, setFetchError] = useState(null);
  const [addError, setAddError] = useState(null);
  const [changeError, setChangeError] = useState(null);
  const [categoryToAddImageData, setCategoryToAddImageData] = useState();
  const [categoryToAdd, setCategoryToAdd] = useState(categoryToAddDefault);
  const [successMessageCategoryAdd, setSuccessMessageCategoryAdd] = useState(null);
  const [successMessageCategoryChange, setSuccessMessageCategoryChange] = useState(null);
  const [categoryToChange, setCategoryToChange] = useState();
  const [categoryToChangeImageData, setCategoryToChangeImageData] = useState();
  const [oldCategoryName, setOldCategoryName] = useState();

  //setup columns for table
  const columns = useMemo(
    () => [
      {
        Header: "Kategorije",
        columns: [
          {
            id: "col1",
            Header: "Naziv",
            accessor: (row) => row.categoryName,
          },
          {
            id: "col2",
            Header: "Slika",
            Cell: (tableProps) => (
              <img
                style={{ maxWidth: "10vw", maxHeight: "auto" }}
                src={tableProps.row.original.categoryImageUrl}
                alt={tableProps.row.original.categoryName}
              />
            ),
            accessor: (row) => row.categoryImageUrl,
          },
        ],
      },
    ],
    []
  );

  //On first load OR whenever category to add/change changes send request to get all categories
  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getCategories")
        .then((response) => {
          if (response.data.success) {
            setCategories(response.data.data);
            setIsBusy(false);
          }
        })
        .catch((error) => {
          if (error.response) {
            setFetchError(error.response.data.message);
          } else if (error.request) {
            // request made no response from server
            setFetchError("Error 003");
          } else {
            // request setup failed
            setFetchError("Error 004");
          }
        });
    }
    fetchData();
  }, [categoryToAdd]);

  // When a row in the table of categories is selected, set CategoryToChange state to the row values
  const onRowChange = (category) => {
    setCategoryToChange(category);
    setOldCategoryName(category.categoryName);
    console.log(category);
    setSuccessMessageCategoryAdd();
    setSuccessMessageCategoryChange();
    setAddError();
    document.getElementById("izmenaKategorija").scrollIntoView({behavior: "smooth", block:"center"});

  };

  // When a category image is uploaded in add category form, sets state to uploaded image
  const addFileChangeHandler = (e) => {
    setCategoryToAddImageData(e.target.files[0]);
  };
  // When something changes in add category form, set state to new input value
  const onAddFormInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryToAdd({
      ...categoryToAdd,
      [name]: value,
    });
  };
  // Triggers when submit is pressed on add category form
  const onAddCategoryClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", categoryToAddImageData);
    data.append("categoryName", categoryToAdd.categoryName);

    Axios.post("/addCategory", data)
      .then((response) => {
        if (response.data.success) {
          setCategoryToAdd(categoryToAddDefault);
          setSuccessMessageCategoryAdd("Uspešno dodata nova kategorija.");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // request made and server responded
          setAddError(error.response.data.message);
          setCategoryToAdd(categoryToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setAddError("Error 003");
          setCategoryToAdd(categoryToAddDefault);
        } else {
          // request setup failed
          setAddError("Error 004");
          setCategoryToAdd(categoryToAddDefault);
        }
      });
  };

  // When a category image is uploaded in change category form, sets state to uploaded image
  const changeFileChangeHandler = (e) => {
    setCategoryToChangeImageData(e.target.files[0]);
  };
  // When something changes in change category form, set state to new input value
  const onChangeFormInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryToChange({
      ...categoryToChange,
      [name]: value,
    });
  };
  // Triggers when submit is pressed on change category form
  const onChangeCategoryClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("_id", categoryToChange._id);
    data.append("image", categoryToChangeImageData);
    data.append("categoryName", categoryToChange.categoryName);
    data.append("oldCategoryName", oldCategoryName);

    Axios.post("/updateWithIdCategory", data)
      .then((response) => {
        if (response.data.success) {
          setCategoryToChange();
          setSuccessMessageCategoryChange("Uspešno izmenjena kategorija.");
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response) {
          // request made and server responded
          setChangeError(error.response.data.message);
          setCategoryToAdd(categoryToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setChangeError("Error 003");
          setCategoryToAdd(categoryToAddDefault);
        } else {
          // request setup failed
          setChangeError("Error 004");
          setCategoryToAdd(categoryToAddDefault);
        }
      });
  };

  return (
    <div>
      {isBusy && !fetchError && <div>Loading categories</div>}
      {fetchError && <div className="error-message">{fetchError}</div>}
      {!isBusy && (
        <div style={{ maxWidth: "100%" }} className="vertical-container-admin">
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">
                IZMENA PODATAKA POSTOJEĆE KATEGORIJE
              </div>
              <Table
                columns={columns}
                data={categories}
                onRowSelect={onRowChange}
              />
              <div id="izmenaKategorija" visibility="hidden"></div>
              {categoryToChange ? (
                <div className="form-container-inner">
                  <CategoryForm
                    onSubmit={onChangeCategoryClick}
                    valueName={categoryToChange.categoryName}
                    onFormInputChange={onChangeFormInputChange}
                    buttonText="IZMENI KATEGORIJU"
                    fileChangeHandler={changeFileChangeHandler}
                    isAdd={false}
                  ></CategoryForm>
                </div>
              ) : (
                <div className="form-header-text">
                  Kliknite na kategoriju u tabeli da je izmenite
                </div>
              )}
            </div>
            {successMessageCategoryChange ? (
              <div className="success-message">
                {successMessageCategoryChange}
              </div>
            ) : (
              <div style={{ visibility: "hidden" }}></div>
            )}
            {changeError ? (
              <div className="error-message">{changeError}</div>
            ) : (
              <div style={{ visibility: "hidden" }}></div>
            )}
          </div>
          <div className="separator" style={{width: "80vw"}}></div>
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">
                UNESITE PODATKE DA DODATE NOVU KATEGORIJU:
              </div>
              <CategoryForm
                onSubmit={onAddCategoryClick}
                valueName={categoryToAdd.categoryName}
                onFormInputChange={onAddFormInputChange}
                buttonText="DODAJ KATEGORIJU"
                fileChangeHandler={addFileChangeHandler}
                isAdd={true}
              ></CategoryForm>
            </div>
            {successMessageCategoryAdd ? (
              <div className="success-message">{successMessageCategoryAdd}</div>
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
      )}
    </div>
  );
};

export default AdminPageCategories;
