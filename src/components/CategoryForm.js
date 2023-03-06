import React from "react";

const CategoryForm = ({
  onSubmit,
  valueName,
  onFormInputChange,
  fileChangeHandler,
  buttonText,
  isAdd,
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
          name="categoryName"
          required
          onChange={onFormInputChange}
        ></input>
        <input type="file" name="image" onChange={fileChangeHandler} className="category-form-image-input" required={isAdd} key={randomString}></input>
        <button className="button-category-form-adminpage" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default CategoryForm;
