import React from "react";

const ProductForm = ({
  onSubmit,
  valueName,
  valueCategory,
  valueDescription,
  valueManufacturer,
  valueAvailability,
  valueHighlighted,
  onFormInputChange,
  onFormInputChangeCheckbox,
  onFormInputChangeCheckboxHighlighted,
  fileChangeHandler,
  buttonText,
  categories,
  manufacturers,
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
            <option defaultValue={true} value={""}>
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
        <label className="form-text" htmlFor="proizvodjac">
          Proizvođač:
        </label>
        <select
          id="proizvodjac"
          name="productManufacturer"
          required
          onChange={onFormInputChange}
          value={valueManufacturer}
        >
          {isAdd && (
            <option defaultValue={true} value={""}>
              -- izaberite proizvođača --
            </option>
          )}
          {manufacturers.map((manufacturer) => {
            return (
              <option
                value={manufacturer.manufacturerName}
                key={manufacturer.manufacturerName}
              >
                {manufacturer.manufacturerName}
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
        <div className="form-availability-horizontal">
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
        </div>
        <div className="form-availability-horizontal">
          <label className="form-text" htmlFor="istaknutost">
            Istaknutost:
          </label>
          <input
            checked={valueHighlighted}
            onClick={onFormInputChangeCheckboxHighlighted}
            name="productHighlighted"
            type="checkbox"
            id="istaknutost"
          ></input>
        </div>
        <input
          type="file"
          name="image"
          onChange={fileChangeHandler}
          className="form-image-input"
          required={isAdd}
          key={randomString}
        ></input>
        <button className="button-form-adminpage" type="submit">
          {buttonText}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;
