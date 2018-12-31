import React from "react";
import NewProjectForm from "../components/NewProjectForm";
class ProjectPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectList: null
    }
  }
  getProjects = () => {
    console.log("getProjects called");
    fetch("/api/projects")
    .then(res => res.json())
    .then(json => {
      this.setState({
        projectList: json.data
      });
      console.log(json);
    })
    .catch(err => console.log(err));
  }

  logState = () => {
    console.log(this.state);
  }

  componentDidMount() {
    this.getProjects();
  }
  render() {
    const projects = this.state.projectList ? this.state.projectList.map((probObj, i) => {
      return (
        <li key={i}>
          <button onClick={()=>this.props.setProject(probObj.projectName)}>
            {probObj.projectName}
          </button>
        </li>
      )
    }) : <li>Currently there are no projects.</li>
    return (
      <div>
        <h1>Project Page</h1>
        <p>Should have a form for creating a new project</p>
        <p>Should have a list of existing projects</p>
        <p>Should be able to click on a project to bring up that projects issue page</p>
        <ul>
          {projects}
        </ul>
        <div>
          <NewProjectForm getProjects={this.getProjects}/>
        </div>
        <button 
          onClick={this.logState}
        >Log State</button>
      </div>
    )
  }
}
export default ProjectPage;