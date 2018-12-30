const express = require("express");
const db = require("../models");
const router = express.Router();

router.post("/api/project", (req, res) => {
  db.Project.findOne({ projectName: req.body.projectName }, (findErr, foundProj) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log(findErr);
    }
    if (foundProj) {
      res.status(409).send({ message: "Project already exists" });
    } else {
      const proj = new db.Project({
        projectName: req.body.projectName
      });
      proj.save((saveErr, savedProject) => {
        if (saveErr) {
          res.status(500).send({ error: saveErr });
          return console.log(saveErr);
        } 
        res.status(201).send({ data: savedProject });
      });
    }
  })
});

router.get("/api/projects", (req, res) => {
  db.Project.find({},(findErr, projects) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log(findErr);
    }
    if (projects) {
      res.status(201).send({ data: projects })
    } else {
      res.status(404).send({ message: "No projects found" });
    }
  })
})
module.exports = router;