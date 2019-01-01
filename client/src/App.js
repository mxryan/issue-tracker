import React, { Component } from 'react';
import IssuePage from "./pages/IssuePage";
import ProjectPage from "./pages/ProjectPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "projects",
      selectedProject: null
    }
  }

  setProject = (projectName) => {
    this.setState({
      selectedProject: projectName,
      page: "issues"
    });
  }

  goToProjectList = () => {
    this.setState({
      selectedProject: null,
      page: "projects"
    });
  }
  render() {
    const container = {
      width: "90%",
      margin: "auto"
    }
   
    const currentPage = this.state.page === "projects"
      ? <ProjectPage setProject={this.setProject}/>
      : <IssuePage goToProjectList={this.goToProjectList} projectName={this.state.selectedProject}/>;

    return (
      <div className="App">
        <div style={container}>
          <h1>Issue Tracker</h1>
          {currentPage}
        </div>
      </div>
    );
  }
}

export default App;
