const mongoose = require("mongoose");
var product;

const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/dem-website");
  const productSchema = new mongoose.Schema({
    productName: String,
    productDescription: String,
    productCategory: String,
    productImageUrl: String,
    productAvailability: Boolean 
  });
  product = mongoose.model("products", productSchema);
};

const getAllProducts = async () => {
  try {
    const data = product.find();
    return data;
  }catch{
    return false;
  }
};

const getProduct = async (productId) => {
  try {
    //console.log(productId);
    const data = await product.findById(productId).exec();
    //console.log(data);
    if(data === null){
      return false;
    }
    return data;
  }catch{
    return false;
  }
}

const getAvailableProducts = async () => {
  try {
    const data = await product.find({ productAvailability: true}).exec();
    return data;
  }catch{
    return false;
  }
};

const addProduct = async (productToAdd) => {
  const newProduct = new product({
    productName : productToAdd.productName,
    productDescription : productToAdd.productDescription,
    productCategory : productToAdd.productCategory,
    productImageUrl : productToAdd.productImageUrl,
    productAvailability : productToAdd.productAvailability
  });
  newProduct.save((err, res) => {
    if(err) {
      console.log(err);
      return false;
    }
    return res;
  })
}

const setProduct = async (id, update) => {
  if( !mongoose.Types.ObjectId.isValid(id) ) return false;
  product.findByIdAndUpdate(id, update, (err) => {
      if(err) return err;
      return true
  });
}

exports.connectDB = connectDB;
exports.getAllProducts = getAllProducts;
exports.getAvailableProducts = getAvailableProducts;
exports.setProduct = setProduct;
exports.addProduct = addProduct;
exports.getProduct = getProduct;