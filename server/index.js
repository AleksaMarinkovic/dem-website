const database = require("../server/database");
const path = require("path");
const express = require("express");
const buildPath = path.join(__dirname, "..", "build");
const multer = require("multer");

const app = express();

app.use(express.json());
app.use(express.static(buildPath));
app.use("/images", express.static("images"));

const port = 8080;

database.connectDB();

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const upload = multer({ storage: fileStorageEngine });

// for simulating delay in server
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

app.post("/single", upload.single("image"), (req, res) => {
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

app.post("/singleCategory", upload.single("image"), (req, res) => {
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

app.post("/multiple", upload.array("images", 3), (req, res) => {
  res.send("Multiple files upload success");
});

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

app.post("/single", upload.single("image"), (req, res) => {
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

app.post("/updateWithId", upload.single("image"), (req, res) => {
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

app.post("/getIndividualProduct", (req, res) => {
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

app.listen(port, "localhost", () => {
  console.log("server start on port " + port);
});
