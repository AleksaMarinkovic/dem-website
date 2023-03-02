import Axios from "axios";
import React, { useState, useMemo } from "react";
import { useEffect } from "react";
import AlbumsForm from "./AlbumsForm";
import Table from "./TableAdmin";

const AdminPageAlbums = () => {
  // states
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [products, setProducts] = useState([1,2,3]);
  const [isBusy, setIsBusy] = useState(true);
  const [fetchedAlbums, setFetchedAlbums] = useState(false);
  const [fetchedProducts, setFetchedProducts] = useState(false);

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
      await Axios.get("/getAllAlbums")
        .then((response) => {
          if (response.data.success) {
            setAlbums(response.data.data);
            setFetchedAlbums(true);
            console.log(response.data.data + ' albumi');
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
  }, []);

  useEffect(() => {
    async function fetchDataProducts() {
      await Axios.get("/getAvailableProducts")
        .then((response) => {
          if (response.data.success) {
            setProducts(response.data.data);
            setFetchedProducts(true);
            console.log(response.data.data + ' proizvodi');

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
  }, []);

  useEffect(() => {
    if (fetchedProducts && fetchedAlbums) {
      setIsBusy(false);
    }
  }, [fetchedProducts, fetchedAlbums]);

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
    // delete album with axios call
    console.log("Delete album");
  };

  const onAddAlbumClick = (e) => {
    // add album with axios call
    e.preventDefault();
    const data = new FormData();

    for (let i = 0; i < albumToAddImagesData.length; i++) {
        data.append('images', albumToAddImagesData[i]);
      }
    //data.append("images", albumToAddImagesData);
    data.append("albumName", albumToAdd.albumName);
    data.append("albumProduct", albumToAdd.albumProduct);

    Axios.post("/addAlbum", data)
    .then((response) => {
      if(response.data.success){
        setAlbumToAdd(albumToAddDefault);
        setSuccessMessageAddAlbum("Uspešno dodat nov album.")
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
    })
  };

  return (
    <div>
      {isBusy && !fetchErrorAlbums && !fetchErrorProducts && <div>Loading</div>}
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
                    {selectedAlbum.albumProduct}
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
