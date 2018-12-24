// note: run toLower on all project names?
// note: switch html files to a views folder
// note: review helmet js lessons
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
const PORT = process.env.PORT || 5000;
const app = express();

// helper function
function isEmpty(obj) {
  for(let key in obj) {
      if(obj.hasOwnProperty(key))
          return false;
  }
  return true;
}

app.use(helmet());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
} else {
  mongoose.connect("mongodb://localhost/issue-tracker", {
    useNewUrlParser: true
  });
}

app.get("/", (req, res) => {
  res.sendfile("public/index.html");
});

app.post("/api/project", (req, res) => {
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

// I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
// The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
app.post("/api/issues/:projectname", (req, res) => {
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


// I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.

app.put("/api/issues/:projectname", (req, res) => {
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

// I can DELETE /api/issues/{projectname} with a _id to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
app.delete("/api/issues/:projectname", (req, res) => {
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

// I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
// I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
app.get("/api/issues/:projectname", (req, res) => {
  
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

app.get("/:projectname", (req, res) => {
  console.log("hit project view route");
  res.sendFile(path.join(__dirname, "public/project.html"));
})


app.listen(PORT, () => console.log("Server on."));