import React from "react";
import NewIssueForm from "../components/NewIssueForm";
class IssuePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueList : null,
    }
  }
  grabIssues = (project) => {
    fetch("/api/issues/" + project)
    .then(res => res.json())
    .then(json => {
      console.log(json.data.issues);
      this.setState({
        issueList: json.data.issues
      });
    })
    .catch(err => console.log(err));
  }
  componentDidMount() {
    console.log("projectName: ",this.props.projectName)
    this.grabIssues(this.props.projectName);
  }

  render(){
    const flexContainer = {
      display: "flex",
      width: "90%",
      justifyContent: "space-between"
    }
    const flexStyleForLeftCol = {
      width: "30%",
      
    }
    const flexStyleForRtCol = {
      width: "60%",
      
    }
    const issues = this.state.issueList ? this.state.issueList.map((issueObj) => {
      return (
        <div key={issueObj._id}>

          <div style={flexContainer}>
            <h5 style={flexStyleForLeftCol}>Issue Title</h5>
            <p style={flexStyleForRtCol}>{issueObj.issueTitle}</p>
          </div>

          <div style={flexContainer}>
            <h5 style={flexStyleForLeftCol}>Issue Text</h5>
            <p style={flexStyleForRtCol}>{issueObj.issueText}</p>
          </div>

          <div style={flexContainer}>
            <h5 style={flexStyleForLeftCol}>createdBy</h5>
            <p style={flexStyleForRtCol}>{issueObj.createdBy}</p>
          </div>

          <div style={flexContainer}>
            <h5 style={flexStyleForLeftCol}>Assigned To</h5>
            <p style={flexStyleForRtCol}>{issueObj.assignedTo}</p>
          </div>

          <div style={flexContainer}>
            <h5 style={flexStyleForLeftCol}>Status Text</h5>
            <p style={flexStyleForRtCol}>{issueObj.statusText}</p>
          </div>

          <div style={flexContainer}>
            <h5 style={flexStyleForLeftCol}>Open</h5>
            <p style={flexStyleForRtCol}>{issueObj.open}</p>
          </div>

          

          <hr/>
          
        </div>
      )
    }) : <div><p>No issues for this project</p></div>
    return (
      <div>
        <h1>Issue Page</h1>
        <h3>Project: {this.props.projectName}</h3>
        <button onClick={this.props.goToProjectList}>Go back to project page</button>
        <div id="new-issue-form">
          <NewIssueForm />
        </div>
        <div id="issue-container">
          {issues}
        </div>
        
      </div>
    )
  }
}

export default IssuePage