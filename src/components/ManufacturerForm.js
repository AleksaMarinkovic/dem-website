import React from "react";

const ManufacturerForm = ({
  onSubmit,
  valueName,
  valueWebsiteUrl,
  onFormInputChange,
  fileChangeHandler,
  buttonText,
  isAdd,
  deleteClick,
  randomString
}) => {
  return (
    <div>
      <form
        onSubmit={onSubmit}
        className="vertical-admin-page-container"
        encType="multipart/form-data"
      >
        <label className="form-text" htmlFor="naziv">
          Naziv:
        </label>
        <input
          className="form-input"
          value={valueName}
          type="text"
          id="naziv"
          name="manufacturerName"
          required
          onChange={onFormInputChange}
        ></input>
        <label className="form-text" htmlFor="website">
          Link za website:
        </label>
        <input
          className="form-input"
          value={valueWebsiteUrl}
          type="text"
          id="website"
          name="manufacturerWebsiteUrl"
          required
          onChange={onFormInputChange}
        ></input>
        <input
          type="file"
          name="image"
          onChange={fileChangeHandler}
          className="category-form-image-input"
          required={isAdd}
          key={randomString}
        ></input>
        <button className="button-category-form-adminpage" type="submit">
          {buttonText}
        </button>
        {!isAdd && (
          <button className="button-category-form-adminpage" onClick={deleteClick}>
          IZBRIŠI PROIZVOĐAČA
        </button>
        )}
      </form>
    </div>
  );
};

export default ManufacturerForm;
