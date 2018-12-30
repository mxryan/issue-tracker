import React from "react";
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: null
    }
  }
  getProjects = () => {
    fetch("/api/projects")
    .then(res => res.json())
    .then(json => {
      this.setState({
        projectList: json.data
      });
      console.log(json);
    })
  }
  componentDidMount() {
    this.getProjects();
  }
  render() {
    const projects = this.state.projectList ? this.state.projectList.map((probObj, i) => {
      return (
        <li key={i}>{probObj.projectName}</li>
      )
    }) : <li>Yo</li>
    return (
      <div>
        <h1>Project Page</h1>
        <p>Should have a form for creating a new project</p>
        <p>Should have a list of existing projects</p>
        <ul>
          {projects}
        </ul>
      </div>
    )
  }
}
export default ProjectPage;