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
    // styles - move these to separate file and import them as one object?
    const flexContainer = {
      display: "flex",
      width: "90%",
      justifyContent: "space-between"
    }
    const flexStyleForLeftCol = {
      width: "30%",
    }
    const flexStyleForRtCol = {
      minWidth: "60%",
    }
    const issueBoxStyle = {
      height: "700px",
      overflow: "scroll"
    }

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
        
        
        <div style={flexContainer}>
          <div style={flexStyleForLeftCol}>
            <NewProjectForm getProjects={this.getProjects}/>
          </div>
  
          <div style={{...issueBoxStyle, flexStyleForRtCol}}>
            <ul>
              {projects}
            </ul>
          </div>
        </div>
        
      </div>
    )
  }
}
export default ProjectPage;