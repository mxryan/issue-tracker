import React from "react";
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: null
    }
  }
  render() {
    return (
      <div>
        <h1>Project Page</h1>
        <p>Should have a form for creating a new project</p>
        <p>Should have a list of existing projects</p>
      </div>
    )
  }
}
export default ProjectPage;