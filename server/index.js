const database = require("../server/database");
const path = require("path");
const express = require("express");
const app = express();
const buildPath = path.join(__dirname, "..", "build");
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

app.listen(port, "localhost", () => {
  console.log("server start on port " + port);
});
