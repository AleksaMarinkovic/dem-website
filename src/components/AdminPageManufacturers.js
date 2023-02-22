import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Table from "./TableAdmin";
import ManufacturerForm from "./ManufacturerForm";

const AdminPageManufacturers = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  const manufacturerToAddDefault = {
    manufacturerName: "",
    manufacturerWebsiteUrl: "",
    manufacturerImageUrl: "",
  };
  // errors
  const [fetchError, setFetchError] = useState(null);
  const [addError, setAddError] = useState(null);
  const [changeError, setChangeError] = useState(null);

  // form data add
  const [manufacturerToAddImageData, setManufacturerToAddImageData] =
    useState();
  const [manufacturerToAdd, setManufacturerToAdd] = useState(
    manufacturerToAddDefault
  );

  // form data change

  const [manufacturerToChangeImageData, setManufacturerToChangeImageData] =
    useState();
  const [manufacturerToChange, setManufacturerToChange] = useState();

  // success messages
  const [successMessageManufacturerAdd, setSuccessMessageManufacturerAdd] =
    useState(null);
  const [
    successMessageManufacturerChange,
    setSuccessMessageManufacturerChange,
  ] = useState(null);

  //old name and website url for changing manufacturer
  const [oldManufacturerName, setOldManufacturerName] = useState();
  const [oldManufacturerWebsiteUrl, setOldManufacturerWebsiteUrl] = useState();

  //setup columns for table
  const columns = useMemo(
    () => [
      {
        Header: "Proizvođači",
        columns: [
          {
            id: "col1",
            Header: "Naziv",
            accessor: (row) => row.manufacturerName,
          },
          {
            id: "col2",
            Header: "Link za website",
            accessor: (row) => row.manufacturerWebsiteUrl,
          },
          {
            id: "col3",
            Header: "Slika",
            Cell: (tableProps) => (
              <img
                style={{ maxWidth: "10vw", maxHeight: "auto" }}
                src={tableProps.row.original.manufacturerImageUrl}
                alt={tableProps.row.original.manufacturerName}
              />
            ),
            accessor: (row) => row.manufacturerImageUrl,
          },
        ],
      },
    ],
    []
  );

  //On first load OR whenever manufacturer to add/change changes send request to get all manufacturers
  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getManufacturers")
        .then((response) => {
          if (response.data.success) {
            setManufacturers(response.data.data);
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
  }, [manufacturerToAdd]);

  // When a row in the table of manufacturers is selected, set ManufacturerToChange state to the row values
  const onRowChange = (manufacturer) => {
    setManufacturerToChange(manufacturer);
    setOldManufacturerName(manufacturer.manufacturerName);
    setSuccessMessageManufacturerAdd();
    setSuccessMessageManufacturerChange();
    setAddError();
    document.getElementById("izmenaProizvodjac").scrollIntoView({behavior: "smooth", block:"center"});
  };

  // When a manufacturer image is uploaded in add manufacturer form, sets state to uploaded image
  const addFileChangeHandler = (e) => {
    setManufacturerToAddImageData(e.target.files[0]);
  };

  // When something changes in add manufacturer form, set state to new input value
  const onAddFormInputChange = (event) => {
    const { name, value } = event.target;
    setManufacturerToAdd({
      ...manufacturerToAdd,
      [name]: value,
    });
  };

  // Triggers when button for deletion of a manufacturer is clicked
  const onDeleteManufacturerClick = (e) => {
    e.preventDefault();
    const confirmed = window.confirm("Ova akcija će izbrisati proizvođača: " + manufacturerToChange.manufacturerName + "\n TAKOĐE ĆE SE IZBRISATI SVI PROIZVODI OD OVOG PROIZVOĐAČA \n DA LI STE SIGURNI DA ŽELITE DA NASTAVITE?");
    if(confirmed){
      const data = new FormData();
    data.append("_id", manufacturerToChange._id);
    data.append("manufacturerName", manufacturerToChange.manufacturerName);

    Axios.post("/removeManufacturer", data)
      .then((response) => {
        if (response.data.success) {
          setManufacturerToChange();
          setSuccessMessageManufacturerAdd("Uspešno izbrisan proizvođač.");
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setAddError(error.response.data.message);
          setManufacturerToAdd(manufacturerToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setAddError("Error 003");
          setManufacturerToAdd(manufacturerToAddDefault);
        } else {
          // request setup failed
          setAddError("Error 004");
          setManufacturerToAdd(manufacturerToAddDefault);
        }
      });
    }    
  }

  // Triggers when submit is pressed on add manufacturer form
  const onAddManufacturerClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", manufacturerToAddImageData);
    data.append("manufacturerName", manufacturerToAdd.manufacturerName);
    data.append(
      "manufacturerWebsiteUrl",
      manufacturerToAdd.manufacturerWebsiteUrl
    );

    Axios.post("/addManufacturer", data)
      .then((response) => {
        if (response.data.success) {
          setManufacturerToAdd(manufacturerToAddDefault);
          setSuccessMessageManufacturerAdd("Uspešno dodat nov proizvođač.");
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setAddError(error.response.data.message);
          setManufacturerToAdd(manufacturerToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setAddError("Error 003");
          setManufacturerToAdd(manufacturerToAddDefault);
        } else {
          // request setup failed
          setAddError("Error 004");
          setManufacturerToAdd(manufacturerToAddDefault);
        }
      });
  };

  // When a manufacturer image is uploaded in change manufacturer form, sets state to uploaded image
  const changeFileChangeHandler = (e) => {
    setManufacturerToChangeImageData(e.target.files[0]);
  };
  // When something changes in change manufacturer form, set state to new input value
  const onChangeFormInputChange = (event) => {
    const { name, value } = event.target;
    setManufacturerToChange({
      ...manufacturerToChange,
      [name]: value,
    });
  };

  // Triggers when submit is pressed on change manufacturer form
  const onChangeManufacturerClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("_id", manufacturerToChange._id)
    data.append("image", manufacturerToChangeImageData);
    data.append("manufacturerName", manufacturerToChange.manufacturerName);
    data.append("manufacturerWebsiteUrl", manufacturerToChange.manufacturerWebsiteUrl);
    data.append("oldManufacturerName", oldManufacturerName);

    Axios.post("/updateWithIdManufacturer", data)
      .then((response) => {
        if (response.data.success) {
          setManufacturerToChange();
          setSuccessMessageManufacturerChange("Uspešno izmenjen proizvođač.");
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setChangeError(error.response.data.message);
          setManufacturerToAdd(manufacturerToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setChangeError("Error 003");
          setManufacturerToAdd(manufacturerToAddDefault);
        } else {
          // request setup failed
          setChangeError("Error 004");
          setManufacturerToAdd(manufacturerToAddDefault);
        }
      });
  };

  return (
    <div>
      {isBusy && !fetchError && <div>Loading manufacturers</div>}
      {fetchError && <div className="error-message">{fetchError}</div>}
      {!isBusy && (
        <div style={{ maxWidth: "100%" }} className="vertical-container-admin">
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">
                IZMENA PODATAKA POSTOJEĆIH PROIZVOĐAČA
              </div>
              <Table
                columns={columns}
                data={manufacturers}
                onRowSelect={onRowChange}
              />
              <div id="izmenaProizvodjac" visibility="hidden"></div>
              {manufacturerToChange ? (
                <div className="form-container-inner">
                  <ManufacturerForm
                    onSubmit={onChangeManufacturerClick}
                    valueName={manufacturerToChange.manufacturerName}
                    valueWebsiteUrl={manufacturerToChange.manufacturerWebsiteUrl}
                    onFormInputChange={onChangeFormInputChange}
                    buttonText="IZMENI PROIZVOĐAČA"
                    fileChangeHandler={changeFileChangeHandler}
                    isAdd={false}
                    deleteClick={onDeleteManufacturerClick}
                  ></ManufacturerForm>
                </div>
              ) : (
                <div className="form-header-text">
                  Kliknite na proizvođača u tabeli da ga izmenite
                </div>
              )}
            </div>
            {successMessageManufacturerChange ? (
              <div className="success-message">
                {successMessageManufacturerChange}
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
          <div className="separator" style={{ width: "80vw" }}></div>
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">
                UNESITE PODATKE DA DODATE NOVOG PROIZVOĐAČA:
              </div>
              <ManufacturerForm
                onSubmit={onAddManufacturerClick}
                valueName={manufacturerToAdd.manufacturerName}
                valueWebsiteUrl={manufacturerToAdd.manufacturerWebsiteUrl}
                onFormInputChange={onAddFormInputChange}
                buttonText="DODAJ PROIZVOĐAČA"
                fileChangeHandler={addFileChangeHandler}
                isAdd={true}
              ></ManufacturerForm>
            </div>
            {successMessageManufacturerAdd ? (
              <div className="success-message">{successMessageManufacturerAdd}</div>
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

export default AdminPageManufacturers;
