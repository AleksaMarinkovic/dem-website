const database = require("../server/database");
const path = require("path");
const express = require("express");
const buildPath = path.join(__dirname, "..", "build");
const multer = require("multer");
const port = 8080;
const app = express();

// for simulating delay in server
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

app.use(express.json());
app.use(express.static(buildPath));
app.use("/images", express.static("images"));

database.connectDB();

// multer middleware for storing an image on upload
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const upload = multer({ storage: fileStorageEngine });


// potential further implementation with multer middleware for supporting multimple images
app.post("/multiple", upload.array("images", 3), (req, res) => {
  res.send("Multiple files upload success");
});


// PRODUCTS
// adding product with multer middleware for image storing
// image url after storing is sent to db on productImageUrl field
app.post("/addProduct", upload.single("image"), (req, res) => {
  try {
    const addPromise = database.addProduct({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productAvailability: req.body.productAvailability,
      productCategory: req.body.productCategory,
      productImageUrl: req.file.path,
    });
    addPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 008",
          data: [],
        });
        return;
      }
      res.send({
        success: true,
        message: "Uspešno dodat proizvod.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// get all products which should be available on website (productAvailability is true)
app.get("/getAvailableProducts", (req, res) => {
  try {
    const dataPromise = database.getAvailableProducts();
    dataPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 005",
          data: [],
        });
        return;
      } else {
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

// get all products in db
app.get("/getProducts", (req, res) => {
  try {
    const dataPromise = database.getAllProducts();
    dataPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 005",
          data: [],
        });
        return;
      } else {
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

// update a product with certain id with or without a new image
// if image is not provided, current image remains
app.post("/updateProductWithId", upload.single("image"), (req, res) => {
  try {
    let updatePromise;
    if (req.file) {
      updatePromise = database.setProduct(req.body._id, {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productAvailability: req.body.productAvailability,
        productCategory: req.body.productCategory,
        productImageUrl: req.file.path
      });
    } else {
      updatePromise = database.setProduct(req.body._id, {
        productName: req.body.productName,
        productDescription: req.body.productDescription,
        productAvailability: req.body.productAvailability,
        productCategory: req.body.productCategory
      });
    }

    updatePromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 001",
          data: [],
        });
        return;
      }
      res.send({
        success: true,
        message: "Uspešno izmenjen proizvod.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// get a specific product with a given id
app.post("/getProductById", (req, res) => {
  try {
    const getPromise = database.getProduct(req.body._id);
    getPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 009",
          data: [],
        });
        return;
      }
      res.send({
        success: true,
        message: "Uspešno uhvacen proizvod.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// add a product (must have an image: frontend doesn't allow not uploading image)
app.post("/addProduct", (req, res) => {
  try {
    const addPromise = database.addProduct({
      productName: req.body.productName,
      productDescription: req.body.productDescription,
      productAvailability: req.body.productAvailability,
      productCategory: req.body.productCategory,
      productImageUrl: req.body.productImageUrl,
    });
    addPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 008",
          data: [],
        });
      }
      res.send({
        success: true,
        message: "Uspešno dodat proizvod.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// CATEGORIES
// adding category with multer middleware for image storing
// image url after storing is sent to db on categoryImageUrl field
app.post("/addCategory", upload.single("image"), (req, res) => {
  try {
    const addCategoryPromise = database.addCategory({
      categoryName: req.body.categoryName,
      categoryImageUrl: req.file.path
    });
    addCategoryPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 008",
          data: [],
        });
        return;
      }
      res.send({
        success: true,
        message: "Uspešno dodata kategorija.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// get all categories
app.get("/getCategories", (req, res) => {
  try {
    const dataPromise = database.getAllCategories();
    dataPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 005",
          data: [],
        });
        return;
      } else {
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

// update category and alter all products that have that category to have new category
app.post("/updateWithIdCategory", upload.single("image"), (req, res) => {
  try {

    //update all products to have new category
    let changeCategoryPromise;
    changeCategoryPromise = database.updateCategoryOfProducts(req.body.oldCategoryName, req.body.categoryName)
    changeCategoryPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 001",
          data: [],
        });
        return;
      }
    });
    
    //update category itself
    let updatePromise;
    if (req.file) {
      updatePromise = database.setCategory(req.body._id, {
        categoryName: req.body.categoryName,
        categoryImageUrl: req.file.path
      });
    } else {
      updatePromise = database.setCategory(req.body._id, {
        categoryName: req.body.categoryName
      });
    }

    updatePromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 001",
          data: [],
        });
        return;
      }
      res.send({
        success: true,
        message: "Uspešno izmenjena kategorija.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// MANUFACTURERS
// adding manufacturer with multer middleware for image storing
// image url after storing is sent to db on manufacturerImageUrl field
app.post("/addManufacturer", upload.single("image"), (req, res) => {
  try {
    const addManufacturerPromise = database.addManufacturer({
      manufacturerName: req.body.manufacturerName,
      manufacturerWebsiteUrl : req.body.manufacturerWebsiteUrl,
      manufacturerImageUrl: req.file.path
    });
    addManufacturerPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 008",
          data: [],
        });
        return;
      }
      res.send({
        success: true,
        message: "Uspešno dodat proizvođač.",
        data: data,
      });
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error 002",
      data: [],
    });
  }
});

// get all manufacturers
app.get("/getManufacturers", (req, res) => {
  try {
    const dataPromise = database.getAllManufacturers();
    dataPromise.then((data) => {
      if (data === false) {
        res.status(500).send({
          success: false,
          message: "Error 005",
          data: [],
        });
        return;
      } else {
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

// remove a manufacturer
app.post("/removeManufacturer", (req, res) => {
  // first remove all products with manufacturer name
  // then remove the manufacturer itself
});

app.listen(port, "localhost", () => {
  console.log("server start on port " + port);
});
