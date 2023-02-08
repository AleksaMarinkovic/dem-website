const database = require("../server/database");
const path = require("path");
const express = require("express");
const buildPath = path.join(__dirname, "..", "build");

const app = express();

app.use(express.json());
app.use(express.static(buildPath));

const port = 8080;

database.connectDB();

app.get("/getProducts", (req, res) => {
  try {
    const dataPromise = database.getData();
    dataPromise.then((data) => {
      res.send({
        success: true,
        message: "Got data.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Didn't get any data from server.",
      data: [],
    });
  }
});

app.post('/updateWithId', (req, res) => {
  try{
    const id = req.body._id;
    console.log(req.body);
    const update = {
      productName : req.body.productName,
      productDescription : req.body.productDescription,
      productAvailability : req.body.productAvailability,
      productCategory: req.body.productCategory,
      productImageUrl: req.body.productImageUrl
    }
    const updatePromise = database.setProduct(id,update);
    updatePromise.then((data)=>{
      res.send({
        success: true,
        message: "Successfully updated data.",
        data: data,
      });
    });
  }
  catch (error){
    res.status(500).send({
      success: false,
      message: "Server error on update.",
      data: [],
    });
  }
});

app.listen(port, "localhost", () => {
  console.log("server start on port " + port);
});
