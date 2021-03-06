// note: run toLower on all project names?
// note: switch html files to a views folder
// note: review helmet js lessons
// note: 'prevent xss' requirement may be more involved then using the basic middleware. need to read the helmet js lessons
// todo:
// change landing page to a form for making new projects and a list of extant projects
// implement a specific project page
// MAIN
// - make it so landing page is just a form for creating projects and a list of all projects with # of open issues
// - then clicking on a project takes you to that projects page where crud operations can be performed for issues
const path = require("path");
const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
// const db = require("./models");
const projectApi = require("./routes/project_api");
const issueApi = require("./routes/issue_api");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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