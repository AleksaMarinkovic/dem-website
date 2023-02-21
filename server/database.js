const mongoose = require("mongoose");
var product;
var category;
var manufacturer;

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
    manufacturerWebsiteUrl: String
  });
  manufacturer = mongoose.model("manufacturer", manufacturerSchema);
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

// remove all products that are manufactured by a specific manufacturer
const removeProductsByManufacturer = async (manufacturer) => {
  try {
    //find products that have this category
    const data = await product
      .find({ productManufacturer: manufacturer })
      .exec();
    data.forEach((item) => {
      if (!mongoose.Types.ObjectId.isValid(item._id)) return false;
      //remove the product
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
    manufacturerWebsiteUrl: manufacturerToAdd.manufacturerWebsiteUrl
  });
  newManufacturer.save((err, res) => {
    if (err) {
      return false;
    }
    return res;
  });
};

// remove a manufacturer
const removeManufacturer = async (manufacturerId) => {
  manufacturer.findOneAndDelete({ _id : manufacturerId}, (err) => {
    if(err){
      return false;
    }
    else{
      return true;
    }
  });
}

exports.connectDB = connectDB;

// products
exports.getAllProducts = getAllProducts;
exports.getAvailableProducts = getAvailableProducts;
exports.setProduct = setProduct;
exports.addProduct = addProduct;
exports.getProduct = getProduct;
exports.updateCategoryOfProducts = updateCategoryOfProducts;
exports.removeProductsByManufacturer = removeProductsByManufacturer;

// categories
exports.getAllCategories = getAllCategories;
exports.addCategory = addCategory;
exports.setCategory = setCategory;

// manufacturers
exports.getAllManufacturers = getAllManufacturers;
exports.addManufacturer = addManufacturer;
exports.removeManufacturer = removeManufacturer;
