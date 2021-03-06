import React from 'react';
class NewProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectName: ""
    }
  }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state);
  }
  submitState = () => {
    let outData = {
      projectName: this.state.projectName
    }
    fetch("/api/project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(outData)
    })
    .then(res => res.json())
    .then(d => {
      console.log(d);
      window.location.reload();
    })
    .catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <p>New Project</p>
        <input
          type="text"
          value={this.state.projectName}
          onChange={this.handleChange}
          name="projectName"
        />
        <button onClick={this.submitState}>Submit</button>
      </div>
    )
  }
}

export default NewProjectForm