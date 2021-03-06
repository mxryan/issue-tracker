const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    trim: true,
    required: "Project Name is Required"
  },
  issues: [{type: mongoose.Schema.Types.ObjectId, ref: "Issue"}]
});
ProjectSchema.plugin(timestamps);

const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
