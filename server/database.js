const mongoose = require("mongoose");
var product;


const connectDB = async () => {
  mongoose.connect("mongodb://localhost:27017/dem-website");
  const productSchema = new mongoose.Schema({});
  product = mongoose.model("products", productSchema);
};

const getData = async () => {
  const data = await product.find();
  return data;
};

exports.connectDB = connectDB;
exports.getData = getData;