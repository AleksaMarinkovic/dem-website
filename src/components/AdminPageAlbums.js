import Axios from "axios";
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import AlbumsForm from "./AlbumsForm";
import LoadingSpinner from "./LoadingSpinner";
import Table from "./TableAdmin";

const AdminPageAlbums = () => {
  // states
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [products, setProducts] = useState([1, 2, 3]);
  const [isBusy, setIsBusy] = useState(true);
  const [fetchedAlbums, setFetchedAlbums] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState(false);
  const [changedData, setChangedData] = useState(false);
  const [randomStringAdd, setRandomStringAdd] = useState(Math.random().toString(36));

  const albumToAddDefault = {
    albumName: "",
    albumProduct: "",
    albumImagesUrls: "",
  };

  // errors
  const [fetchErrorAlbums, setFetchErrorAlbums] = useState(null);
  const [fetchErrorProducts, setFetchErrorProducts] = useState(null);
  const [addAlbumError, setAddAlbumError] = useState(null);
  const [deleteAlbumError, setDeleteAlbumError] = useState(null);

  // form data add
  const [albumToAddImagesData, setAlbumToAddImagesData] = useState();
  const [albumToAdd, setAlbumToAdd] = useState(albumToAddDefault);

  // success messages
  const [successMessageAddAlbum, setSuccessMessageAddAlbum] = useState(null);
  const [successMessageDeleteAlbum, setSuccessMessageDeleteAlbum] =
    useState(null);

  //setup columns for table
  const columns = useMemo(
    () => [
      {
        Header: "Albumi slika",
        columns: [
          {
            id: "col1",
            Header: "Naziv albuma",
            accessor: (row) => row.albumName,
          },
          {
            id: "col2",
            Header: "Proizvod vezan za album",
            accessor: (row) => row.albumProductName,
          },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    async function fetchDataAlbums() {
      console.log("got data albums");
      await Axios.get("/getAllAlbums")
        .then((response) => {
          if (response.data.success) {
            setAlbums(response.data.data);
            setFetchedAlbums(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            setFetchErrorAlbums(error.response.data.message + " - albumi");
          } else if (error.request) {
            // request made no response from server
            setFetchErrorAlbums("Error 003 - albumi");
          } else {
            // request setup failed
            setFetchErrorAlbums("Error 004 - albumi");
          }
        });
    }
    fetchDataAlbums();
  }, [changedData]);

  useEffect(() => {
    async function fetchDataProducts() {
      console.log("got data products");
      await Axios.get("/getAvailableProducts")
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data);
            setFetchedProducts(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            setFetchErrorProducts(error.response.data.message + " - proizvodi");
          } else if (error.request) {
            // request made no response from server
            setFetchErrorProducts("Error 003 - proizvodi");
          } else {
            // request setup failed
            setFetchErrorProducts("Error 004 - proizvodi");
          }
        });
    }
    fetchDataProducts();
  }, [changedData]);

  useEffect(() => {
    if (fetchedProducts && fetchedAlbums) {
      setIsBusy(false);
    }
  }, [fetchedProducts, fetchedAlbums, changedData]);

  const onRowChange = (album) => {
    setSelectedAlbum(album);
    setSuccessMessageAddAlbum();
    setAddAlbumError();
    document
      .getElementById("brisanjeAlbuma")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const addFilesChangeHandler = (e) => {
    setAlbumToAddImagesData(e.target.files);
  };

  const onAddFormInputChange = (e) => {
    const { name, value } = e.target;
    setAlbumToAdd({
      ...albumToAdd,
      [name]: value,
    });
  };

  const onDeleteAlbumClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("albumId", selectedAlbum._id);
    Axios.post("/removeAlbumById", data)
      .then((response) => {
        if (response.data.success) {
          setSuccessMessageDeleteAlbum(response.data.message);
          setSelectedAlbum();
          setChangedData(!changedData);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setDeleteAlbumError(error.response.data.message);
          setSelectedAlbum();
        } else if (error.request) {
          // request made no response from server
          setDeleteAlbumError("Error 003");
          setSelectedAlbum();
        } else {
          // request setup failed
          setDeleteAlbumError("Error 004");
          setSelectedAlbum();
        }
      });
  };

  const onAddAlbumClick = (e) => {
    // add album with axios call
    e.preventDefault();
    const data = new FormData();

    for (let i = 0; i < albumToAddImagesData.length; i++) {
      data.append("images", albumToAddImagesData[i]);
    }
    //data.append("images", albumToAddImagesData);
    data.append("albumName", albumToAdd.albumName);
    data.append("albumProduct", albumToAdd.albumProduct);

    Axios.post("/addAlbum", data)
      .then((response) => {
        if (response.data.success) {
          setAlbumToAdd(albumToAddDefault);
          setSuccessMessageAddAlbum(response.data.message);
          setChangedData(!changedData);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setAddAlbumError(error.response.data.message);
          setAlbumToAdd(albumToAddDefault);
        } else if (error.request) {
          // request made no response from server
          setAddAlbumError("Error 003");
          setAlbumToAdd(albumToAddDefault);
        } else {
          // request setup failed
          setAddAlbumError("Error 004");
          setAlbumToAdd(albumToAddDefault);
        }
      });
      setRandomStringAdd(Math.random().toString(36));
  };

  return (
    <div>
      {isBusy && !fetchErrorAlbums && !fetchErrorProducts && <LoadingSpinner />}
      {fetchErrorAlbums && (
        <div className="error-message">{fetchErrorAlbums}</div>
      )}
      {fetchErrorProducts && (
        <div className="error-message">{fetchErrorProducts}</div>
      )}
      {!isBusy && (
        <div style={{ maxWidth: "100%" }} className="vertical-container-admin">
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">PREGLED POSTOJEĆIH ALBUMA</div>
              <Table
                columns={columns}
                data={albums}
                onRowSelect={onRowChange}
              ></Table>
              <div id="brisanjeAlbuma" visibility="hidden"></div>
              {selectedAlbum ? (
                <div className="form-container-inner">
                  <div>
                    Obrišite album: {selectedAlbum.albumName} za proivod:{" "}
                    {selectedAlbum.albumProductName}
                  </div>
                  <button onClick={onDeleteAlbumClick}>Obriši</button>
                </div>
              ) : (
                <div className="form-header-text">
                  Kliknite na album u tabeli da ga izbrišete
                </div>
              )}
            </div>
            {successMessageDeleteAlbum && (
              <div className="success-message">{successMessageDeleteAlbum}</div>
            )}
            {deleteAlbumError && (
              <div className="error-message">{deleteAlbumError}</div>
            )}
          </div>
          <div className="separator" style={{ width: "80vw" }}></div>
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">
                UNESITE PODATKE DA DODATE NOVI ALBUM ZA PROIZVOD:
              </div>
              <AlbumsForm
                onSubmit={onAddAlbumClick}
                valueName={albumToAdd.albumName}
                valueProduct={albumToAdd.albumProduct}
                onFormInputChange={onAddFormInputChange}
                fileChangeHandler={addFilesChangeHandler}
                products={products}
                randomString={randomStringAdd}
              ></AlbumsForm>
            </div>
            {successMessageAddAlbum && (
              <div className="success-message">{successMessageAddAlbum}</div>
            )}
            {addAlbumError && (
              <div className="error-message">{addAlbumError}</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPageAlbums;
