const mongoose = require("mongoose");
var product;


const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/dem-website");
  const productSchema = new mongoose.Schema({
    _id: mongoose.ObjectId,
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

const getAvailableProducts = async () => {
  try {
    const data = await product.find({ productAvailability: true}).exec();
    return data;
  }catch{
    return false;
  }
};

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