import React, { Component } from 'react';
import IssuePage from "./pages/IssuePage";
import ProjectPage from "./pages/ProjectPage";
import NewProjectForm from "./components/NewProjectForm";
import NewIssueForm from "./components/NewIssueForm";
import UpdateIssueForm from './components/UpdateIssueForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "projects",
      selectedProject: null
    }
  }

  // setPage = (pageName) => {
  //   this.setState({
  //     page: pageName
  //   });
  // }

  setProject = (projectName) => {
    this.setState({
      selectedProject: projectName,
      page: "issues"
    });
  }
  render() {
    
    const container = {
      width: "90%",
      margin: "auto"
    }
    const flexContainer = {
      display: "flex",
      justifyContent: "space-around"
    }
    const flexItem = {
      width: "380px",
      border: "1px solid black",
      padding: "20px"
    }

    const currentPage = this.state.page === "projects"
      ? <ProjectPage setProject={this.setProject}/>
      : <IssuePage setPage={this.setPage} projectName={this.props.selectedProject}/>;

    return (
      <div className="App">
        <header>
          <div style={container}>
            <h1>Issue Tracker</h1>
          </div>
        </header>

        <div style={container}>
          <h1>OLD</h1>
          <div style={flexContainer}>
            <div style={flexItem}>
              <NewProjectForm />
            </div>
            <div style={flexItem}>
              <NewIssueForm />
            </div>
          </div>
          <div style={flexContainer}>
            <div style={flexItem}><UpdateIssueForm /></div>
            <div style={flexItem}>new issue</div>
            
          </div>
        </div>
        <hr/>
        <div style={container}>
          <h1>New</h1>
          {currentPage}
        </div>
      </div>
    );
  }
}

export default App;
