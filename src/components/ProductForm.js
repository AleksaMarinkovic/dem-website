import React from "react";

const ProductForm = ({onSubmit, valueName, valueCategory, valueDescription, valueAvailability, onFormInputChange, onFormInputChangeCheckbox}) => {
    console.log(valueName);
    console.log(valueCategory);
    console.log(valueDescription);
    console.log(valueAvailability);


    return (
        <div>
                <form
                  onSubmit={onSubmit}
                  className="vertical-admin-page-container"
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
                  <input
                    className="form-input"
                    value={valueCategory}
                    type="text"
                    id="kategorija"
                    name="productCategory"
                    required
                    onChange={onFormInputChange}
                  ></input>
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
                  <button className="button-form-adminpage" type="submit">
                    IZMENI
                  </button>
                </form>
              </div>
    )
}   

export default ProductForm;