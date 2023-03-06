import React from "react";

const AlbumsForm = ({
  onSubmit,
  valueName,
  valueProduct,
  onFormInputChange,
  fileChangeHandler,
  products,
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
          name="albumName"
          required
          onChange={onFormInputChange}
        ></input>
        <label className="form-text" htmlFor="proizvod">
          Album je za proizvod:
        </label>
        <select
          id="proizvod"
          name="albumProduct"
          required
          onChange={onFormInputChange}
          value={valueProduct}
        >
          <option defaultValue={true} value={""}>
            -- izaberite proizvod --
          </option>
          {products.map((product) => {
            return (
              <option value={product._id} key={product._id}>
                {product.productName}
              </option>
            );
          })}
        </select>
        <input
          type="file"
          name="images"
          onChange={fileChangeHandler}
          className="form-image-input"
          required
          multiple
          key={randomString}
        ></input>
        <button className="button-form-adminpage" type="submit">
          DODAJ ALBUM
        </button>
      </form>
    </div>
  );
};

export default AlbumsForm;
