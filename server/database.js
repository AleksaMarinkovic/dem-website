const fileHandler = require("../server/fileHandler");

const mongoose = require("mongoose");
var product;
var category;
var manufacturer;
var album;
var user;
let certificate;

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
    productHighlighted: Boolean
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

  const userSchema = new mongoose.Schema({
    userName: String,
    userPassword: String,
  });
  user = mongoose.model("users", userSchema);

  const certificateSchema = new mongoose.Schema({
    certificateName: String,
    certificateUrl1: String,
    certificateUrl2: String,
    certificateImageUrl: String,
  });
  certificate = mongoose.model("certificates", certificateSchema);
};

// CERTIFICATES

// add a certificate
const addCertificate = async (certificateToAdd) => {
  console.log(certificateToAdd);
  const newCertificate = new certificate({
    certificateName: certificateToAdd.certificateName,
    certificateUrl1: certificateToAdd.certificateUrl1,
    certificateUrl2: certificateToAdd.certificateUrl2,
    certificateImageUrl: certificateToAdd.certificateImageUrl,
  });
  console.log(newCertificate);
  newCertificate.save((err, res) => {
    if (err) {
      return false;
    }
    return res;
  });
};

// remove a certificate
const removeCertificate = async (certificateId) => {
  try {
    const data = await certificate
      .findOneAndDelete({ _id: certificateId })
      .exec();
    if (!data) {
      return false;
    } else {
      if (
        data &&
        data.certificateImageUrl &&
        data.certificateUrl1 &&
        data.certificateUrl1
      ) {
        fileHandler.deleteFile(data.certificateImageUrl);
        fileHandler.deleteFile(data.certificateUrl1);
        fileHandler.deleteFile(data.certificateUrl2);
      }
      return data;
    }
  } catch (error) {
    return error;
  }
};

// get certificate

const getCertificates = async () => {
  try {
    const data = certificate.find();
    return data;
  } catch {
    return false;
  }
};

// USERS

const checkUser = async (username, password) => {
  try {
    const data = await user.findOne({ userName: username }).exec();
    if (!data) {
      return false;
    }
    if (data.userPassword === password) {
      return true;
    }
    return false;
  } catch (error) {
    return error;
  }
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

// get all products that should be available on website by Filter
const getProductsByFilter = async (filter) => {
  try {
    const data = await product
      .find({ ...filter, productAvailability: true })
      .exec();
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
    data.forEach(async (item) => {
      if (!mongoose.Types.ObjectId.isValid(item._id)) return false;
      let document = await product.findOneAndDelete({ _id: item._id });
      if (document) {
        fileHandler.deleteFile(document.productImageUrl);
      }
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
    productHighlighted: productToAdd.productHighlighted
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
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    await product.findByIdAndUpdate(id, update, (err, document) => {
      if (document) {
        if (update.productImageUrl) {
          fileHandler.deleteFile(document.productImageUrl);
        }
        return true;
      }
      if (err) {
        return err;
      }
    });
  } catch (error) {
    return error;
  }
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
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    await category.findByIdAndUpdate(id, update, (err, document) => {
      if (document) {
        if (update.categoryImageUrl) {
          fileHandler.deleteFile(document.categoryImageUrl);
        }
        return true;
      }
      if (err) return err;
    });
  } catch (error) {
    return error;
  }
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
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) return false;
    manufacturer.findByIdAndUpdate(id, update, (err, document) => {
      if (document) {
        if (update.manufacturerImageUrl) {
          fileHandler.deleteFile(document.manufacturerImageUrl);
        }
        return true;
      }
      if (err) return err;
    });
  } catch (error) {
    return error;
  }
};

// remove a manufacturer
const removeManufacturer = async (manufacturerId) => {
  manufacturer.findOneAndDelete({ _id: manufacturerId }, (err, document) => {
    if (err) {
      return false;
    } else {
      if (document.manufacturerImageUrl) {
        fileHandler.deleteFile(document.manufacturerImageUrl);
      }
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
      let savedAlbum = await newAlbum.save();
      return savedAlbum;
    }
  } catch (error) {
    return error;
  }
};

// remove an album
const removeAlbum = async (albumId) => {
  try {
    let document = await album.findOneAndDelete({ _id: albumId });
    if (document) {
      let imageUrlsArray = splitImageUrls(document.albumImagesUrls);
      imageUrlsArray.forEach((url) => {
        fileHandler.deleteFile(url);
      });
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return error;
  }
};

// get an album by product id
const getAlbumByProductId = async (productId) => {
  try {
    const data = await album.find({ albumProduct: productId }).exec();
    let newData;
    if (typeof data === "undefined" || data.length === 0) {
      return false;
    } else {
      let imageUrlArray = splitImageUrls(data[0].albumImagesUrls);
      newData = {
        _id: data[0]._id,
        albumName: data[0].albumName,
        albumProduct: data[0].albumProduct,
        albumImagesUrls: imageUrlArray,
      };
      return newData;
    }
  } catch (error) {
    return error;
  }
};

const getAllAlbums = async () => {
  try {
    const data = await album.find();
    return data;
  } catch {
    return false;
  }
};

const splitImageUrls = (imagesUrls) => {
  let imageUrlArray = [];
  imagesUrls
    .split("|")
    .filter((i) => i)
    .forEach((url) => {
      imageUrlArray.push(url);
    });
  return imageUrlArray;
};

exports.connectDB = connectDB;

// users
exports.checkUser = checkUser;

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
exports.getAllAlbums = getAllAlbums;

// certificates
exports.addCertificate = addCertificate;
exports.removeCertificate = removeCertificate;
exports.getCertificates = getCertificates;
