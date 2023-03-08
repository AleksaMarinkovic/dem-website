import React from "react";

const CertificateForm = ({
  onSubmit,
  valueName,
  onFormInputChange,
  fileChangeHandlerImage,
  fileChangeHandlerPolicy,
  fileChangeHandlerCertificate,
  randomString1,
  randomString2,
  randomString3,
}) => {
  return (
    <div>
      <form onSubmit={onSubmit}
      className="vertical-admin-page-container"
      encType="multipart/form-data"
      >
        <label className="form-text" htmlFor="naziv">
        Naziv sertifikata:
        </label>
        <input
          className="form-input"
          value={valueName}
          type="text"
          id="naziv"
          name="categoryName"
          required
          onChange={onFormInputChange}
        ></input>
        <label className="form-text" htmlFor="slika">
        Slika: 
        </label>
        <input type="file" name="slika" onChange={fileChangeHandlerImage} className="category-form-image-input" required key={randomString1}></input>
        <label className="form-text" htmlFor="politika">
        Politika: 
        </label>
        <input type="file" name="politika" onChange={fileChangeHandlerPolicy} className="category-form-image-input" required key={randomString2}></input>
        <label className="form-text" htmlFor="sertifikat">
        Sertifikat: 
        </label>
        <input type="file" name="sertifikat" onChange={fileChangeHandlerCertificate} className="category-form-image-input" required key={randomString3}></input>
        <button className="button-category-form-adminpage" type="submit">
          DODAJ
        </button>
      </form>
    </div>
  );
};

export default CertificateForm;
