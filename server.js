const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const db = require("./models");
const PORT = process.env.PORT || 5000;
const app = express();

app.use(helmet());
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

// I can POST /api/issues/{projectname} with form data containing required issue_title, issue_text, created_by, and optional assigned_to and status_text.
// The object saved (and returned) will include all of those fields (blank for optional no input) and also include created_on(date/time), updated_on(date/time), open(boolean, true for open, false for closed), and _id.
app.post("/api/issues/:projectname", (req, res) => {
  // INCOMING FORM DATA:
  // REQUIRED: issue_title, issue_text, created_by
  // OPTIONAL: assigned_to, status_text
  // RETURNED OBJECT: all fields above +
  // DATE created_on, DATE updated_on, BOOL open, OBJECT ID _id
  
});


// I can PUT /api/issues/{projectname} with a _id and any fields in the object with a value to object said object. Returned will be 'successfully updated' or 'could not update '+_id. This should always update updated_on. If no fields are sent return 'no updated field sent'.
app.put("/api/issues/:projectname", (req, res) => {
  // stuff
});

// I can DELETE /api/issues/{projectname} with a _id to completely delete an issue. If no _id is sent return '_id error', success: 'deleted '+_id, failed: 'could not delete '+_id.
app.delete("/api/issues/:projectname", (req, res) => {
  // stuff
});

// I can GET /api/issues/{projectname} for an array of all issues on that specific project with all the information for each issue as was returned when posted.
// I can filter my get request by also passing along any field and value in the query(ie. /api/issues/{project}?open=false). I can pass along as many fields/values as I want.
app.get("/api/issues/:projectname", (req, res) => {
  // stuff
});


app.listen(PORT, () => console.log("Server on."));