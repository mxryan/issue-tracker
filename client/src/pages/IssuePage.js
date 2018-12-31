import React from "react";
class IssuePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueList : null,
    }
  }
  grabIssues = (project) => {
    // grabs issues for a particular project
    // route is /api/issues/projectName
    fetch("/api/issues/project")
    .then(res => res.json())
    .then(json => {
      console.log(json);
    })
    .catch(err => console.log(err));
  }
  render(){
    return (
      <div>
        <h1>Issue Page</h1>
        <p>I am the issue page for a particular project</p>
        
        <p>I should have a form for creating a new issue</p>
        <p>I should have a list of all issues</p>
        <p>I should have clickable buttons for each issue on list that assist with CRUD actions</p>
        <p>Like Delete, Close, Edit</p>
        <p>Maybe a second form for editing?</p>
      </div>
    )
  }
}

export default IssuePage