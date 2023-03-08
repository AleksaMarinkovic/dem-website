import React, { useState, useEffect, useMemo } from "react";
import Axios from "axios";
import Table from "./TableAdmin";
import CertificateForm from "./CertificateForm";
import LoadingSpinner from "./LoadingSpinner";

const AdminPageCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isBusy, setIsBusy] = useState(true);

  const [fetchError, setFetchError] = useState(null);
  const [addError, setAddError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);
  const [certificateToAddImageData, setCertificateToAddImageData] = useState();
  const [certificateToAddUrl1Data, setCertificateToAddUrl1Data] = useState();
  const [certificateToAddUrl2Data, setCertificateToAddUrl2Data] = useState();

  const [certificateToDelete, setCertificateToDelete] = useState();

  const [certificateName, setCertificateName] = useState("");
  const [successMessageCertificateAdd, setSuccessMessageCertificateAdd] =
    useState(null);
  const [successMessageCertificateDelete, setSuccessMessageCertificateDelete] =
    useState(null);

  const [changedData, setChangedData] = useState();

  const [randomStringAdd1, setRandomStringAdd1] = useState(
    Math.random().toString(36)
  );
  const [randomStringAdd2, setRandomStringAdd2] = useState(
    Math.random().toString(36)
  );
  const [randomStringAdd3, setRandomStringAdd3] = useState(
    Math.random().toString(36)
  );

  //setup columns for table
  const columns = useMemo(
    () => [
      {
        Header: "Naziv",
        columns: [
          {
            id: "col1",
            Header: "Naziv",
            accessor: (row) => row.certificateName,
          },
          {
            id: "col2",
            Header: "Slika",
            Cell: (tableProps) => (
              <img
                style={{ maxWidth: "10vw", maxHeight: "auto" }}
                src={tableProps.row.original.certificateImageUrl}
                alt={tableProps.row.original.certificateImageUrl}
              />
            ),
            accessor: (row) => row.categoryImageUrl,
          },
          {
            id: "col3",
            Header: "Politika",
            accessor: (row) => row.certificateUrl1,
          },
          {
            id: "col3",
            Header: "Sertifikat",
            accessor: (row) => row.certificateUrl2,
          },
        ],
      },
    ],
    []
  );

  //On first load OR whenever certificate to add/delete changes send request to get all certificates
  useEffect(() => {
    async function fetchData() {
      await Axios.get("/getCertificates")
        .then((response) => {
          if (response.data.success) {
            setCertificates(response.data.data);
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
  }, [changedData]);

  const onRowChange = (certificate) => {
    setCertificateToDelete(certificate);
    setSuccessMessageCertificateAdd();
    setAddError();
    document
      .getElementById("izmenaSertifikat")
      .scrollIntoView({ behavior: "smooth", block: "center" });
  };

  // When a certificate image is uploaded in add certificate form, sets state to uploaded image
  const addFileImageChangeHandler = (e) => {
    setCertificateToAddImageData(e.target.files[0]);
  };

  // When a certificate policy is uploaded in add certificate form, sets state to uploaded file
  const addFilePolicyChangeHandler = (e) => {
    setCertificateToAddUrl1Data(e.target.files[0]);
  };

  // When a certificate certificate is uploaded in add certificate form, sets state to uploaded file
  const addFileCertificateChangeHandler = (e) => {
    setCertificateToAddUrl2Data(e.target.files[0]);
  };

  // Set name when input in form changes
  const onAddFormInputChange = (event) => {
    const { value } = event.target;
    setCertificateName(value);
  };

  // Triggers when submit is pressed on delete certificate
  const onDeleteCertificateClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("certificateId", certificateToDelete._id);
    Axios.post("/removeCertificate", data)
      .then((response) => {
        if (response.data.success) {
          setCertificateToDelete();
          setSuccessMessageCertificateDelete(response.data.message);
          setChangedData(!changedData);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setDeleteError(error.response.data.message);
          setCertificateToDelete();
        } else if (error.request) {
          // request made no response from server
          setDeleteError("Error 003");
          setCertificateToDelete();
        } else {
          // request setup failed
          setDeleteError("Error 004");
          setCertificateToDelete();
        }
      });
  };

  // Triggers when submit is pressed on add certificate form
  const onAddCertificateClick = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("image", certificateToAddImageData);
    data.append("url1", certificateToAddUrl1Data);
    data.append("url2", certificateToAddUrl2Data);

    data.append("certificateName", certificateName);

    Axios.post("/addCertificate", data)
      .then((response) => {
        if (response.data.success) {
          setCertificateName("");
          setSuccessMessageCertificateAdd(response.data.message);
          setChangedData(!changedData);
        }
      })
      .catch((error) => {
        if (error.response) {
          // request made and server responded
          setAddError(error.response.data.message);
          setCertificateName("");
        } else if (error.request) {
          // request made no response from server
          setAddError("Error 003");
          setCertificateName("");
        } else {
          // request setup failed
          setAddError("Error 004");
          setCertificateName("");
        }
      });
    setRandomStringAdd1(Math.random().toString(36));
    setRandomStringAdd2(Math.random().toString(36));
    setRandomStringAdd3(Math.random().toString(36));
  };
  return (
    <div>
      {isBusy && !fetchError && <LoadingSpinner />}
      {fetchError && <div className="error-message">{fetchError}</div>}
      {!isBusy && (
        <div style={{ maxWidth: "100%" }} className="vertical-container-admin">
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">POSTOJEĆI SERTIFIKATI</div>
              <Table
                columns={columns}
                data={certificates}
                onRowSelect={onRowChange}
              />
              <div id="izmenaSertifikat" visibility="hidden"></div>
              {certificateToDelete ? (
                <button onClick={onDeleteCertificateClick}>IZBRISI</button>
              ) : (
                <div className="form-header-text">
                  Kliknite na sertifikat u tabeli da ga izbrišete
                </div>
              )}
            </div>
            {successMessageCertificateDelete && (
              <div className="success-message">
                {successMessageCertificateDelete}
              </div>
            )}
            {deleteError && <div className="error-message">{deleteError}</div>}
          </div>
          <div className="separator" style={{ width: "80vw" }}></div>
          <div className="vertical-admin-page-container">
            <div className="form-container">
              <div className="form-header-text">
                UNESITE PODATKE DA DODATE NOV SERTIFIKAT:
              </div>
              <CertificateForm
                onSubmit={onAddCertificateClick}
                valueName={certificateName}
                onFormInputChange={onAddFormInputChange}
                fileChangeHandlerImage={addFileImageChangeHandler}
                fileChangeHandlerPolicy={addFilePolicyChangeHandler}
                fileChangeHandlerCertificate={addFileCertificateChangeHandler}
                randomString1={randomStringAdd1}
                randomString2={randomStringAdd2}
                randomString3={randomStringAdd3}
              ></CertificateForm>
            </div>
            {successMessageCertificateAdd && (
              <div className="success-message">
                {successMessageCertificateAdd}
              </div>
            )}
            {addError && <div className="error-message">{addError}</div>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPageCertificates;
