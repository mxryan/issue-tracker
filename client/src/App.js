import React, { Component } from 'react';
import NewProjectForm from "./components/NewProjectForm";
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
      border: "5px solid black"
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
            <div style={flexItem}>new issue</div>
          </div>
          <div style={flexContainer}>
            <div style={flexItem}>new project</div>
            <div style={flexItem}>new issue</div>
            
          </div>
        </div>
      </div>
    );
  }
}

export default App;
