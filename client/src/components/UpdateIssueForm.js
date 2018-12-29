import React from 'react';
class UpdateIssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: "",
      _id: "",
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
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(d => console.log(d))
      .catch(e => console.log(e));
  }

  render() {
    const inputs = Object.keys(this.state).map((key, index) => {
      if (key === "open") {
        return (
          <div>
            <input
              type="checkbox"
              name="close"
              onClick={this.handleCheck}
              checked={this.state.open}
            />
          </div>
        )
      } else {
        return (
          <div>
            <p>{key}</p>
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

        {inputs}
        <button onClick={this.submitState}>Submit</button>
      </div>
    )
  }
}

export default UpdateIssueForm