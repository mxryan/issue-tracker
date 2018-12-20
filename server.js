const express = require("express");
const helmet = require("helmet");
// const mongoose = require("mongoose");
// const db = require("./models");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendfile("public/index.html");
});

app.listen(PORT, () => console.log("Server on."));