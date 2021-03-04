import React, { Component } from "react";
import { editClinicByID } from "../api";

export default class OneClinicAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // when click the edit button it will be true and the data will show up in input field
      isEditMode: false,
      // The input value entered by admin when editing clinic
      input: {},
    };
    this.handleChange = this.handleChange.bind(this);
  }

  // when clicking delete button will execute the props delete fucntion from the Admin.js file
  deleteClinic = (event) => {
    event.preventDefault();
    this.props.deleteClinic(this.props.id);
  };

  // Editing clinic in the Admin
  editClinic = () => {
    const id = this.props.id;
    if (this.state.isEditMode) {
      this.setState({ isEditMode: false });
    } else {
      this.setState({ isEditMode: true });
    }
    const editedClinic = this.state.input;
    editClinicByID(id, editedClinic)
      .then((res) => {
        console.log(`The Article with the ID ${id} has been Edited.`);

        console.log("new edited", res.data);
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  // Get the input from the input filed when editing clinic by admin and save it in the state (input)
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }

  render() {
    return (
      <tbody className="mr-5">
        {this.state.isEditMode ? (
          <tr>
            <th scope="row">{this.props.IdNumber}</th>
            <td>
              <input
                name="clincName"
                onChange={this.handleChange}
                defaultValue={this.props.Name}
              />
            </td>
            <td>
              <input
                name="serviceType"
                onChange={this.handleChange}
                defaultValue={this.props.Service}
              />
            </td>
            <td>
              <input
                name="rating"
                onChange={this.handleChange}
                defaultValue={this.props.Rating}
              />
            </td>
            <td>
              <input
                name="clinicImage"
                onChange={this.handleChange}
                defaultValue={this.props.Image}
              />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={this.editClinic}
              >
                <span className={`material-icons `}>create</span>
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={this.deleteClinic}
              >
                <span className={`material-icons `}>delete</span>
              </button>
              <span>
                <p>Last update at: {this.props.updatedAt}</p>
              </span>
            </td>
          </tr>
        ) : (
          <tr>
            <th scope="row">{this.props.IdNumber}</th>
            <td>{this.props.Name}</td>
            <td>{this.props.Service}</td>
            <td>{this.props.Rating}</td>
            <td>
              <img src={this.props.Image} width="20%" />
            </td>
            <td>
              <button
                type="button"
                className="btn btn-outline-secondary btn-sm"
                onClick={this.editClinic}
              >
                <span className={`material-icons `}>create</span>
              </button>
              &nbsp;&nbsp;&nbsp;
              <button
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={this.deleteClinic}
              >
                <span className={`material-icons `}>delete</span>
              </button>
              <span>
                <p>Last update at: {this.props.updatedAt}</p>
              </span>
            </td>
          </tr>
        )}

        {/* <td>{this.props.location}</td> */}
      </tbody>
    );
  }
}
