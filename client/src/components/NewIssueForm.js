import React from 'react';
class NewIssueForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      issueTitle: "",
      issueText: "",
      createdBy: "",
      assignedTo: "",
      statusText: ""
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }
  submitState = () => {
    fetch("/api/issues/" + this.props.projectName, {
      method: "POST",
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
   });
    return (
      <div>
        <h3>New Issue </h3>
        <h6>Project: {this.props.projectName}</h6>
        
        {inputs}
        <button onClick={this.submitState}>Submit</button>
      </div>
    )
  }
}

export default NewIssueForm