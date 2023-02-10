const database = require("../server/database");
const path = require("path");
const express = require("express");
const buildPath = path.join(__dirname, "..", "build");

const app = express();

app.use(express.json());
app.use(express.static(buildPath));

const port = 8080;

database.connectDB();

app.get("/getAvailableProducts", (req, res) => {
  try {
    const dataPromise = database.getAvailableProducts();
    dataPromise.then((data) => {
      if(data === false){
        res.status(500).send({
          success: false,
          message: "Error 005",
          data: [],
        });
      }
      else{
        res.send({
          success: true,
          message: "Successfully retrieved data.",
          data: data,
        });
      }
      
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 006",
      data: [],
    });
  }
});

app.get("/getProducts", (req, res) => {
  try {
    const dataPromise = database.getAllProducts();
    dataPromise.then((data) => {
      if(data === false){
        res.status(500).send({
          success: false,
          message: "Error 005",
          data: [],
        });
      }
      else{
        res.send({
          success: true,
          message: "Successfully retrieved data.",
          data: data,
        });
      }
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 006",
      data: [],
    });
  }
});

app.post('/updateWithId', (req, res) => {
  try{
    const updatePromise = database.setProduct(req.body._id, {
      productName : req.body.productName,
      productDescription : req.body.productDescription,
      productAvailability : req.body.productAvailability,
      productCategory: req.body.productCategory,
      productImageUrl: req.body.productImageUrl
    });
    updatePromise.then((data)=>{
      if(data === false){
        res.status(500).send({
          success: false,
          message: "Error 001",
          data: [],
        });
      }
      res.send({
        success: true,
        message: "Uspešno izmenjen proizvod.",
        data: data,
      });
    });
  }
  catch (error){
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

app.post('/addProduct', (req, res) => {
  try{
    const addPromise = database.addProduct({
      productName : req.body.productName,
      productDescription : req.body.productDescription,
      productAvailability : req.body.productAvailability,
      productCategory: req.body.productCategory,
      productImageUrl: req.body.productImageUrl
    })
    addPromise.then((data) => {
      if(data===false){
        res.status(500).send({
          success: false,
          message: "Error 008",
          data: [],
        });
        console.log('error 008');
      }
      res.send({
        success: true,
        message: "Uspešno dodat proizvod.",
        data: data,
      });
    })
  }
  catch(error){
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    })        
    console.log(error);
  }
})




app.listen(port, "localhost", () => {
  console.log("server start on port " + port);
});
