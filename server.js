const express = require("express");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendfile("public/index.html");
});

app.listen(PORT, () => console.log("Server on."));