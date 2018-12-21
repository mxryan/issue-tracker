const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");

const IssueSchema = new mongoose.Schema({
  issueTitle: {
    type: String,
    trim: true,
    required: "Issue Title is Required"
  },
  issueText: {
    type: String,
    required: "Issue Text is Required"
  },
  createdBy: {
    type: String,
    required: "Created By is Required"
  },
  assignedTo: {
    type: String
  },
  statusText: {
    type: String
  },
  open: {
    type: Boolean,
    default: true
  }
});
IssueSchema.plugin(timestamps);

const Issue = mongoose.model("Issue", IssueSchema);
module.exports = Issue