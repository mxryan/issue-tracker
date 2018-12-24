// note: run toLower on all project names?
// note: switch html files to a views folder
// note: review helmet js lessons
// note: 'prevent xss' requirement may be more involved then using the basic middleware. need to read the helmet js lessons
// todo:
// - change param from projectname to projectName
// - break out helper functions
// - break out routes
// - break out controllers
// - add query support for get route
// - CRA for front end
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const db = require("./models");
const projectApi = require("./routes/project_api");
const issueApi = require("./routes/issue_api");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "client/build")));
app.use(projectApi);
app.use(issueApi);

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/issue-tracker", {
    useNewUrlParser: true
  });
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => console.log("Server on."));