import React, { Component } from 'react';
import NewProjectForm from "./components/NewProjectForm";
import NewIssueForm from "./components/NewIssueForm";
import UpdateIssueForm from './components/UpdateIssueForm';
class App extends Component {
  render() {
    const container = {
      width: "90%"
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
    return (
      <div className="App">
        <header>
          <div style={container}>
            <h1>Issue Tracker</h1>
          </div>
        </header>
        <div style={container}>
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
      </div>
    );
  }
}

export default App;
