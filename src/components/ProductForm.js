import React from "react";

const ProductForm = ({
  onSubmit,
  valueName,
  valueCategory,
  valueDescription,
  valueAvailability,
  onFormInputChange,
  onFormInputChangeCheckbox,
  fileChangeHandler,
  buttonText,
  categories,
  isAdd,
}) => {
  console.log(categories);
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
          name="productName"
          required
          onChange={onFormInputChange}
        ></input>
        <label className="form-text" htmlFor="kategorija">
          Kategorija:
        </label>
        <select
          id="kategorija"
          name="productCategory"
          required
          onChange={onFormInputChange}
          value={valueCategory}
        >
          {isAdd && (
            <option defaultValue={true} value={''}>
              -- izaberite kategoriju --
            </option>
          )}
          {categories.map((category) => {
            return (
              <option value={category.categoryName} key={category.categoryName}>
                {category.categoryName}
              </option>
            );
          })}
        </select>
        <label className="form-text" htmlFor="opis">
          Opis:
        </label>
        <textarea
          className="form-textarea"
          value={valueDescription}
          type="text"
          id="opis"
          name="productDescription"
          required
          onChange={onFormInputChange}
        ></textarea>
        <label className="form-text" htmlFor="dostupnost">
          Dostupnost:
        </label>
        <input
          checked={valueAvailability}
          onClick={onFormInputChangeCheckbox}
          name="productAvailability"
          type="checkbox"
          id="dostupnost"
        ></input>
        <input type="file" name="image" onChange={fileChangeHandler}></input>
        <button className="button-form-adminpage" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
