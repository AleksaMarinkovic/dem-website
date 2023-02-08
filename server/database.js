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

const getData = async () => {
  const data = await product.find();
  return data;
};

const setProduct = async (id, update) => {
  console.log("FROM DATABASE.JS");
  console.log(update);
  console.log(id);
  if( !mongoose.Types.ObjectId.isValid(id) ) return false;
  product.findByIdAndUpdate(id, update, (err,result) => {
      if(err) console.log(err);
      else console.log(result);
  });
}

exports.connectDB = connectDB;
exports.getData = getData;
exports.setProduct = setProduct;