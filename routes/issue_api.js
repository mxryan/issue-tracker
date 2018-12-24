const express = require("express");
const db = require("../models");
const router = express.Router();


// helper function
function isEmpty(obj) {
  for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

router.post("/api/issues/:projectname", (req, res) => {
  console.log("hit /api/issues with param name: " + req.params.projectname)
  // REFACTOR: validate the incoming form data then instantiate new issue object
  // then push that issue's _id onto project with db.Project.findOneAndUpdate
  // if found: save the issue object
  // if not found: send appropriate info back to client

  db.Project.findOne({ projectName: req.params.projectname }, (findErr, foundProj) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log(findErr);
    }
  
    if (foundProj) {
      const issue = new db.Issue({
        issueTitle: req.body.issueTitle,
        issueText: req.body.issueText,
        createdBy: req.body.createdBy,
        assignedTo: req.body.assignedTo ? req.body.assignedTo : "",
        statusText: req.body.statusText ? req.body.statusText : ""
      });
      issue.save((saveErr, savedIssue) => {
        if (saveErr) {
          res.status(500).send({error: saveErr});
          return console.log(saveErr);
        }
        db.Project.findByIdAndUpdate(foundProj._id, { $push: {issues: issue._id} }, { new: true },(findErr, updatedProj) => {
          if (findErr) {
            res.status(500).send({error: findErr});
            return console.log(findErr);
          }
          res.status(201).send({ issueData: savedIssue, projectData: updatedProj });
        }); 
      });
      
    } else {
      res.status(409).send({ message: "Project doesn't exist." });
    }
  });
});

router.put("/api/issues/:projectname", (req, res) => {
  // check that there are update fields
  const updateObj = {};
  for (let key in req.body) {
    if (key != "_id" && req.body[key]) {
      updateObj[key] = req.body[key];
    }
  }
  if (isEmpty(updateObj)) {
    res.status(404).send({message: "At least one field in addition to _id must be filled in"});
  } else {
    db.Issue.findByIdAndUpdate(req.body._id, updateObj, { new: true }, (updateErr, updatedIssue) => {
      if (updateErr) {
        res.status(500).send({ error: updateErr });
        return console.log(updateErr);
      }
      if (updatedIssue) {
        res.status(201).send({ data: updatedIssue });
      } else {
        res.status(404).send({ message: "Unable to find project with that id" });
      }
    });
  }
});

router.delete("/api/issues/:projectname", (req, res) => {
  db.Issue.findByIdAndDelete(req.body._id, (findErr, deletedIssue) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log({ error: findErr });
    }
    if (deletedIssue) {
      res.status(201).send({ message: "Deleted " + deletedIssue._id, data: deletedIssue });
      console.log(deletedIssue);
    } else {
      res.status(404).send({ message: "_id error. Are you sure " + req.body._id + " is a valid _id?" });
      console.log("Delete failed.");
    }
  });
});

router.get("/api/issues/:projectname", (req, res) => {
  
  const queryObj = {match: {}};
  for (let key in req.query) {
    queryObj.match[key] = req.query[key];
  }
  db.Project.findOne({projectName: req.params.projectname}).populate({
    path: "issues",
    ...queryObj
  }).exec((findErr, foundProj) => {
    if (findErr) {
      res.status(500).send({ error: findErr });
      return console.log({ error: findErr });
    }
    if (foundProj) {
      res.status(201).send({ data: foundProj });
    } else {
      res.status(404).send({ message: "Could not find project" });
    }
  })
});

module.exports = router;