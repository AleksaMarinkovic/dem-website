const mongoose = require("mongoose");
var product;
var category;
var manufacturer;
var album;

// for simulating delay in db acess
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/dem-website");

  //product schema
  const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productCategory: String,
    productImageUrl: String,
    productAvailability: Boolean,
    productManufacturer: String,
  });
  product = mongoose.model("products", productSchema);

  //category schema
  const categorySchema = new mongoose.Schema({
    categoryName: String,
    categoryImageUrl: String,
  });
  category = mongoose.model("categories", categorySchema);

  //manufacturer schema
  const manufacturerSchema = new mongoose.Schema({
    manufacturerName: String,
    manufacturerImageUrl: String,
    manufacturerWebsiteUrl: String,
  });
  manufacturer = mongoose.model("manufacturer", manufacturerSchema);

  const albumSchema = new mongoose.Schema({
    albumName: String,
    albumImagesUrls: String,
    albumProduct: String,
    albumProductName: String,
  });
  album = mongoose.model("albums", albumSchema);
};

// PRODUCTS

// get all products in database
const getAllProducts = async () => {
  try {
    const data = product.find();
    return data;
  } catch {
    return false;
  }
};

// get all products that should be available on website
const getAvailableProducts = async () => {
  try {
    const data = await product.find({ productAvailability: true }).exec();
    return data;
  } catch {
    return false;
  }
};

// get all products that should be available on website
const getProductsByFilter = async (filter) => {
  try {
    const data = await product.find(filter).exec();
    return data;
  } catch {
    return false;
  }
};

// remove all products that are manufactured by a specific manufacturer
const removeProductsByManufacturer = async (manufacturer) => {
  try {
    //find array of products that have this category
    const data = await product
      .find({ productManufacturer: manufacturer })
      .exec();
    //delete all products in this array
    data.forEach((item) => {
      if (!mongoose.Types.ObjectId.isValid(item._id)) return false;
      product.findOneAndDelete({ _id: item._id }, (err) => {
        if (err) {
          return false;
        }
      });
    });
    return data;
  } catch {
    return false;
  }
};

// get a product by ID
const getProduct = async (productId) => {
  try {
    const data = await product.findById(productId).exec();
    if (data === null) {
      return false;
    }
    return data;
  } catch {
    return false;
  }
};

// add a product
const addProduct = async (productToAdd) => {
  const newProduct = new product({
    productName: productToAdd.productName,
    productDescription: productToAdd.productDescription,
    productCategory: productToAdd.productCategory,
    productImageUrl: productToAdd.productImageUrl,
    productAvailability: productToAdd.productAvailability,
    productManufacturer: productToAdd.productManufacturer,
  });
  newProduct.save((err, res) => {
    if (err) {
      return false;
    }
    return res;
  });
};

// update product by id and with update object
const setProduct = async (id, update) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  product.findByIdAndUpdate(id, update, (err) => {
    if (err) return err;
    return true;
  });
};

// update all products manufacturer field
const updateManufacturerOfProducts = async (
  oldManufacturerName,
  newManufacturerName
) => {
  try {
    //find products that have this manufacturer
    const data = await product
      .find({ productManufacturer: oldManufacturerName })
      .exec();
    data.forEach((item) => {
      if (!mongoose.Types.ObjectId.isValid(item._id)) return false;
      const update = {
        productManufacturer: newManufacturerName,
      };
      let updateWithNewManufacturerPromise;
      updateWithNewManufacturerPromise = setProduct(item._id, update);
      updateWithNewManufacturerPromise.then((data1) => {
        if (data1 === false) {
          return;
        }
      });
    });
    return data;
  } catch {
    return false;
  }
};

// update all products category field
const updateCategoryOfProducts = async (oldCategoryName, newCategoryName) => {
  try {
    //find products that have this category
    const data = await product
      .find({ productCategory: oldCategoryName })
      .exec();
    data.forEach((item) => {
      if (!mongoose.Types.ObjectId.isValid(item._id)) return false;
      const update = {
        productCategory: newCategoryName,
      };
      let updateWithNewCategoryPromise;
      updateWithNewCategoryPromise = setProduct(item._id, update);
      updateWithNewCategoryPromise.then((data1) => {
        if (data1 === false) {
          return;
        }
      });
    });
    return data;
  } catch {
    return false;
  }
};

// CATEGORIES

// get all categories
const getAllCategories = async () => {
  try {
    const data = category.find();
    return data;
  } catch {
    return false;
  }
};

// add a category
const addCategory = async (categoryToAdd) => {
  const newCategory = new category({
    categoryName: categoryToAdd.categoryName,
    categoryImageUrl: categoryToAdd.categoryImageUrl,
  });
  newCategory.save((err, res) => {
    if (err) {
      return false;
    }
    return res;
  });
};

// update a category by ID with update object
const setCategory = async (id, update) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  category.findByIdAndUpdate(id, update, (err) => {
    if (err) return err;
    return true;
  });
};

// MANUFACTURERS

// get all manufacturer
const getAllManufacturers = async () => {
  try {
    const data = manufacturer.find();
    return data;
  } catch {
    return false;
  }
};

// add a manufacturer
const addManufacturer = async (manufacturerToAdd) => {
  const newManufacturer = new manufacturer({
    manufacturerName: manufacturerToAdd.manufacturerName,
    manufacturerImageUrl: manufacturerToAdd.manufacturerImageUrl,
    manufacturerWebsiteUrl: manufacturerToAdd.manufacturerWebsiteUrl,
  });
  newManufacturer.save((err, res) => {
    if (err) {
      return false;
    }
    return res;
  });
};

// update a manufacturer by ID with update object
const setManufacturer = async (id, update) => {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;
  manufacturer.findByIdAndUpdate(id, update, (err) => {
    if (err) return err;
    return true;
  });
};

// remove a manufacturer
const removeManufacturer = async (manufacturerId) => {
  manufacturer.findOneAndDelete({ _id: manufacturerId }, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

// ALBUMS

// add an album
const addAlbum = async (albumToAdd) => {
  let productName;
  try {
    const data = await getProduct(albumToAdd.albumProduct);
    if (data === false) {
      return false;
    } else {
      productName = data.productName;
      const newAlbum = new album({
        albumName: albumToAdd.albumName,
        albumImagesUrls: albumToAdd.albumImagesUrls,
        albumProduct: albumToAdd.albumProduct,
        albumProductName: productName,
      });
      newAlbum.save((err, res) => {
        if (err) {
          return false;
        }
        console.log(res);
        return res;
      });
    }
  } catch (error) {
    return error;
  }
};

// remove an album
const removeAlbum = async (albumId) => {
  album.findOneAndDelete({ _id: albumId }, (err) => {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};

// get an album by product id
const getAlbumByProductId = async (productId) => {
  try {
    const data = await album.find({ albumProduct: productId }).exec();
    let newData;
    if (typeof data === "undefined" || data.length === 0) {
      return false;
    } else {
      let imageUrlArray = [];
      data[0].albumImagesUrls
        .split("|")
        .filter((i) => i)
        .forEach((url) => {
          imageUrlArray.push(url);
        });
      newData = {
        _id: data[0]._id,
        albumName: data[0].albumName,
        albumProduct: data[0].albumProduct,
        albumImagesUrls: imageUrlArray,
      };
      console.log(newData);
      return newData;
    }
  } catch (error) {
    return error;
  }
};

exports.connectDB = connectDB;

// products
exports.getAllProducts = getAllProducts;
exports.getAvailableProducts = getAvailableProducts;
exports.getProductsByFilter = getProductsByFilter;
exports.setProduct = setProduct;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.updateCategoryOfProducts = updateCategoryOfProducts;
exports.removeProductsByManufacturer = removeProductsByManufacturer;
exports.updateManufacturerOfProducts = updateManufacturerOfProducts;

// categories
exports.getAllCategories = getAllCategories;
exports.addCategory = addCategory;
exports.setCategory = setCategory;

// manufacturers
exports.getAllManufacturers = getAllManufacturers;
exports.addManufacturer = addManufacturer;
exports.setManufacturer = setManufacturer;
exports.removeManufacturer = removeManufacturer;

// albums
exports.addAlbum = addAlbum;
exports.removeAlbum = removeAlbum;
exports.getAlbumByProductId = getAlbumByProductId;
