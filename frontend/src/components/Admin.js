import React, { Component } from "react";
import {
  getAllClinics,
  AddNewClinic,
  deleteClinicByID,
  userSignUp,
} from "../api";
import OneClinicAdmin from "./oneClinicAdmin";
import swal from "sweetalert";
import $ from "jquery";

export default class Admin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // All clinics from the database
      clinics: [],
      // The input value entered by admin when adding clinic
      input: {},
      // The errors for the validation when adding clinic
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validate = this.validate.bind(this);
  }
  componentDidMount() {
    // getting all clinics from the database (backend - routers) and save it in the state (clinics)
    getAllClinics()
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log("DATA: ", response.data);
        this.setState({ clinics: response.data });
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  }

  // Get the input from the form when adding new clinic by admin and save it in the state (input)
  handleChange(event) {
    let input = this.state.input;
    input[event.target.name] = event.target.value;
    this.setState({
      input,
    });
  }

  /* Validation for adding new clinic check if the clinic name and service type is entered 
   otherwise it will show an error because these two fields are required in the model  */
  validate(type) {
    let input = this.state.input;
    console.log(input);
    let errors = {};
    let isValid = true;
    if (type === "clinc") {
      if (!input["clincName"]) {
        isValid = false;
        errors["clincName"] = "Please enter your Clinic Name.";
      }
      if (!input["serviceType"]) {
        isValid = false;
        errors["serviceType"] = "Please enter your Services.";
      }
      if (!input["clinicImage"]) {
        input["clinicImage"] =
          "https://e7.pngegg.com/pngimages/574/699/png-clipart-medicine-pharmacy-consultant-pharmacist-clinic-icon-scanner-heart-cartoon-thumbnail.png";
      }
    } else if (type === "user") {
      if (!input["firstName"]) {
        isValid = false;
        errors["firstName"] = "Please enter your first Name.";
      }
      if (!input["lastName"]) {
        isValid = false;
        errors["lastName"] = "Please enter your last Name.";
      }
      if (!input["email"]) {
        isValid = false;
        errors["email"] = "Please enter your email.";
      }
      if (!input["password"]) {
        isValid = false;
        errors["password"] = "Please enter your password.";
      }
    }
    this.setState({
      errors: errors,
    });
    console.log(isValid);
    return isValid;
  }

  // Add new clinic (the new clinics from the state input) to the database (Clinics Model)
  handleSubmit(event) {
    event.preventDefault();
    console.log("here");
    if (this.validate("clinc")) {
      console.log("here2");
      const newClinic = this.state.input;
      console.log(newClinic);
      AddNewClinic(newClinic)
        .then((res) => {
          console.log("res");
          console.log(res);
          console.log(res.data);
          swal("Created!", "Clinic created successfully!", "success");
          const newClinicsList = this.state.clinics.filter((clinic) => {
            return clinic;
          });

          console.log(newClinicsList.push(newClinic));
          this.setState({ clinics: newClinicsList });
          window.$("#exampleModal").modal("toggle");
          $("#exampleModal").find("input,select").val("").end();
        })

        .catch((err) => {
          console.log("ERR: ", err);
        });
    }
  }

  // Deleteing clinic from the database by admin
  deleteClinic = (id) => {
    deleteClinicByID(id)
      .then((res) => {
        console.log(`The Article with the ID ${id} has been deleted.`);

        const newClinicsList = this.state.clinics.filter((clinic) => {
          return clinic._id !== id;
        });
        console.log(newClinicsList);
        this.setState({ clinics: newClinicsList });
        $("#exampleModal").find("input,select").val("").end();
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };
  adduser = (event) => {
    event.preventDefault();
    if (this.validate("user")) {
      const userinfo = this.state.input;
      userSignUp(userinfo)
        .then((res) => {
          console.log("res");
          console.log(res);
          console.log(res.data);
          swal("Created!", "User created successfully!", "success");
          window.$("#exampleModalCenter").modal("toggle");
          $("#exampleModalCenter").find("input,select").val("").end();
        })

        .catch((err) => {
          console.log("ERR: ", err);
        });
    }
  };
  render() {
    const allClinics = this.state.clinics.map((clinic, index) => {
      return (
        // Display the table (table for displaying all clinics) row in another component
        <OneClinicAdmin
          Name={clinic.clincName}
          Service={clinic.serviceType}
          Rating={clinic.rating}
          id={clinic._id}
          deleteClinic={this.deleteClinic}
          key={index}
          IdNumber={index + 1}
          Image={clinic.clinicImage}
          location={clinic.locationId}
          updatedAt={clinic.updatedAt}
        />
      );
    });
    return (
      <div>
        <br />
        {/* <!-- Button trigger modal for adding new clinic --> */}
        <div class="col-md-12 text-center">
          <button
            type="button"
            class="btn btn-info "
            data-toggle="modal"
            data-target="#exampleModal"
          >
            Add New Clinic
          </button>
          <br />
          <button
            type="button"
            class="btn btn-info"
            data-toggle="modal"
            data-target="#exampleModalCenter"
          >
            Add New User
          </button>
        </div>
        <hr></hr>
        <div className="mr-4">
          <table className="table ml-4 table-hover table-borderless">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Services</th>
                <th scope="col">Rating</th>
                <th scope="col">Image</th>
                <th scope="col">Edit/Delete</th>
              </tr>
            </thead>
            {allClinics}
          </table>
        </div>
        {/* <!-- Modal for adding new clinic --> */}
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document" id="modalContent">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  Add New Clinic
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                      <h2>Add Clinic</h2>
                      <label className="control-label">Clinic Name</label>
                      <input
                        className="form-control"
                        placeholder="Enter Name"
                        onChange={this.handleChange}
                        name="clincName"
                        value={this.state.input.clincName}
                      />
                      <div className="text-danger">
                        {this.state.errors.clincName}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input
                        className="form-control"
                        placeholder="Enter Location"
                        onChange={this.handleChange}
                        name="locationId"
                        value={this.state.input.locationId}
                      />
                    </div>
                    <div className="form-group">
                      <label>Clinic Image</label>
                      <input
                        className="form-control"
                        placeholder="Enter Image"
                        onChange={this.handleChange}
                        name="clinicImage"
                        value={this.state.input.clinicImage}
                      />
                    </div>
                    <div className="form-group">
                      <label>Services</label>
                      <input
                        className="form-control"
                        placeholder="Enter email"
                        name="serviceType"
                        onChange={this.handleChange}
                        value={this.state.input.serviceType}
                      />
                      <div className="text-danger">
                        {this.state.errors.serviceType}
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Rating</label>
                      <select
                        className="form-control"
                        name="rating"
                        id="ratings"
                        onChange={this.handleChange}
                        value={this.state.input.rating}
                      >
                        <option selected="selected" value="1">
                          1
                        </option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>

                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button type="submit" class="btn btn-info">
                        Save changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          class="modal fade"
          id="exampleModalCenter"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">
                  Add A New User
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                <form onSubmit={this.adduser}>
                  <div class="col-md-12">
                    <label for="InputFirstName">First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="InputFirstName"
                      aria-describedby="firstName"
                      placeholder="First Name"
                      name="firstName"
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.state.errors.firstName}
                    </div>
                    <label for="InputLastName">Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      id="InputLastName"
                      aria-describedby="lastName"
                      placeholder="Last Name"
                      name="lastName"
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.state.errors.lastName}
                    </div>

                    <label for="exampleInputEmail1">Email address</label>
                    <input
                      type="email"
                      class="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      name="email"
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">{this.state.errors.email}</div>
                    <label for="Phone">Phone Number</label>
                    <input
                      type="number"
                      class="form-control"
                      id="Phone"
                      aria-describedby="Phone Number"
                      placeholder="Enter Phone Number"
                      name="phone"
                      onChange={this.handleChange}
                    />
                    <label for="exampleInputPassword1">Password</label>
                    <input
                      type="password"
                      class="form-control"
                      id="exampleInputPassword1"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChange}
                    />
                    <div className="text-danger">
                      {this.state.errors.password}
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                    <button type="submit" class="btn btn-info">
                      Create A New User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
