import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Table from "./TableAdmin";
import CategoryForm from './CategoryForm';

const AdminPageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  const categoryToAddDefault = {
    categoryName: "",
    categoryImageUrl: "",
  };
  const [error, setError] = useState(null);
  const [categoryToAddImageData, setCategoryToAddImageData] = useState();
  const [categoryToAdd, setCategoryToAdd] = useState(categoryToAddDefault);

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
            Cell: (tableProps) => <img style={{maxWidth: "10vw", maxHeight: 'auto'}} src={tableProps.row.original.categoryImageUrl} alt={tableProps.row.original.categoryImageUrl}/>,
            accessor: (row) => row.categoryImageUrl
          },
        ],
      },
    ],
    []
  );
  const addFileChangeHandler = (e) => {
    setCategoryToAddImageData(e.target.files[0]);
  };

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
    fetchData();
  }, [categoryToAdd]);

  const onAddFormInputChange = (event) => {
    const { name, value } = event.target;
    setCategoryToAdd({
      ...categoryToAdd,
      [name]: value,
    });
  };

  const onAddCategoryClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", categoryToAddImageData);
    data.append("categoryName", categoryToAdd.categoryName);

    Axios.post("/singleCategory", data)
      .then((response) => {
        if (response.data.success) {
          setCategoryToAdd(categoryToAddDefault);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setError(error.response.data.message);
          setCategoryToAdd(categoryToAddDefault);
        }
        if (error.request) {
          // request made no response from server
          setError("Error 003");
          setCategoryToAdd(categoryToAddDefault);
        } else {
          // request setup failed
          setError("Error 004");
          setCategoryToAdd(categoryToAddDefault);
        }
      });
  };

  return (
    <div>
      {isBusy && <div>Loading categories</div>}
      {!isBusy && (
        <div
          style={{ maxWidth: "100%" }}
          className="horizontal-container-admin"
        >
          <Table columns={columns} data={categories} />
          <div>UNESITE PODATKE DA DODATE NOVU KATEGORIJU</div>
            <CategoryForm
              onSubmit={onAddCategoryClick}
              valueName={categoryToAdd.categoryName}
              onFormInputChange={onAddFormInputChange}
              buttonText="DODAJ KATEGORIJU"
              fileChangeHandler={addFileChangeHandler}
            ></CategoryForm>
          </div>
      )}
    </div>
  );
};

export default AdminPageCategories;
