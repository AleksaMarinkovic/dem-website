const mongoose = require("mongoose");
var product;


const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/dem-website");
  const productSchema = new mongoose.Schema({});
  product = mongoose.model("products", productSchema);
};

const getData = async () => {
  const data = await product.find();
  return data;
};

const setProduct = async (id, update) => {
  console.log("FROM DATABASE.JS");
  console.log(update);
  const filter = { _id : id};
  const update1 = update;
  let doc = await product.findOneAndUpdate(filter, update1, {new:true});
  console.log("DOC: " + doc);
}

exports.connectDB = connectDB;
exports.getData = getData;
exports.setProduct = setProduct;