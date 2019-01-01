import React from 'react';
class UpdateIssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      issueTitle: "",
      issueText: "",
      createdBy: "",
      assignedTo: "",
      statusText: "",
      open: true
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }
  handleCheck = (e) => {
    this.setState({
      open: !this.state.open
    });
  } 
  submitState = () => {
    // let outData = {
    //   projectName: this.state.projectName
    // }
    fetch("/api/issues/" + this.state.projectName, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({_id: this.props.selectedIssueId, ...this.state})
    })
      .then(res => res.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }

  render() {
    console.log(this.state);
    
    const inputs = Object.keys(this.state).map((key, index) => {
      if (key === "open") {
        return (
          <div>
            <span>Issue Is Open: </span>
            <input
              type="checkbox"
              name="close"
              onClick={this.handleCheck}
              checked={this.state.open}
            />
          </div>
        )
      } else if (key==="_id"){
        return (
          <div>
            <span>{key} : {this.props.selectedIssueId}</span>
          </div>
        )
      }else {
        return (
          <div>
            <span>{key}&nbsp; &nbsp;</span>
            <input
              type="text"
              value={this.state[key]}
              onChange={this.handleChange}
              name={key}
            />
          </div>
        )
      }
    });
    return (
      <div>
        <p>Update an Issue</p>
        <p>Selected issue: {this.props.selectedIssueId}</p>
        {inputs}
        <button onClick={this.submitState}>Submit</button>
      </div>
    )
  }
}

export default UpdateIssueForm