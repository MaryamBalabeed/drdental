import React, { Component } from "react";
import "../App.css";
import { userSignUp } from "../api";
import { Redirect } from "react-router-dom";
import swal from "sweetalert";

export default class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // the input fileds value
      input: {},
      error: "", // This For Error in the validation func
      redirect: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // This Function Is to check if the required inputs are empty or not.
  // if so then will return false to the this.handleSubmit() function
  Validate = () => {
    if (
      // This condition if the user enter a value in a required input then he removed the value before he click submit button, after that he clicked the button.
      this.state.input.firstName === "" ||
      this.state.input.lastName === "" ||
      this.state.input.email === "" ||
      this.state.input.password === ""
    ) {
      console.log("Empty");
      return false;
    } else if (
      // Here to check if the user clicked submit button and the input's Object's target name were not exist in the Object.
      this.state.input.firstName == null ||
      this.state.input.lastName == null ||
      this.state.input.email == null ||
      this.state.input.password == null
    ) {
      console.log("Empty");
      return false;
    }
  };

  // Add the new user info to the database (Sign Up)
  handleSubmit(event) {
    event.preventDefault();

    let returnBoolean = true;
    returnBoolean = this.Validate();
    console.log("Return ", returnBoolean);

    if (returnBoolean != false) {
      // Here To check if the returnBoolean false, that's mean everything good and will save the new account in the database.
      const newUser = this.state.input;
      console.log(newUser);
      userSignUp(newUser)
        .then((res) => {
          console.log("res");
          console.log(res);
          console.log(res.data);

          //Redirect To the Login Page
          this.setState({
            ...this.state,
            redirect: "/Login",
          });
        })
        .catch((err) => {
          console.log("ERR: ", err);
        });
    } else {
      this.setState({
        error: "There is an Empty Input. Please Fill the empty input.",
      });
    }
  }

  // Get the input fileds value and add them to the (input) state
  handleChange = (event) => {
    let dataInput = this.state.input;

    dataInput[event.target.name] = event.target.value;

    this.setState({
      input: dataInput,
      error: "",
    });
  };
  render() {
    if (this.state.redirect) {
      swal("SignUp successfully!");
      return <Redirect to={this.state.redirect} />;
    }

    return (
      <div className="container">
        <div
          className="Card-signup"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div
            class="card"
            style={{
              width: "38rem",
              marginBottom: "15px",
              boxShadow: "10px 10px 5px grey",
            }}
          >
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>
              Create an Account
            </h1>

            <span
              style={{ color: "red", textAlign: "center", display: "block" }}
            >
              {this.state.error}
            </span>

            <div className="row justify-content-md-center">
              <form className="w-50" onSubmit={this.handleSubmit}>
                <div class="col-md-12">
                  <label style={{ marginTop: "15px" }} for="InputFirstName">
                    First Name{" "}
                    <span style={{ color: "red", verticalAlign: "s" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="InputFirstName"
                    aria-describedby="firstName"
                    placeholder="First Name"
                    name="firstName"
                    onChange={this.handleChange}
                  />
                  <label style={{ marginTop: "15px" }} for="InputLastName">
                    Last Name{" "}
                    <span style={{ color: "red", verticalAlign: "s" }}>*</span>
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="InputLastName"
                    aria-describedby="lastName"
                    placeholder="Last Name"
                    name="lastName"
                    onChange={this.handleChange}
                  />
                  <label style={{ marginTop: "15px" }} for="exampleInputEmail1">
                    Email address{" "}
                    <span style={{ color: "red", verticalAlign: "s" }}>*</span>
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    placeholder="Enter email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <label style={{ marginTop: "15px" }} for="Phone">
                    Phone Number
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="Phone"
                    aria-describedby="Phone Number"
                    placeholder="Enter Phone Number"
                    name="phone"
                    onChange={this.handleChange}
                  />
                  <label
                    style={{ marginTop: "15px" }}
                    for="exampleInputPassword1"
                  >
                    Password{" "}
                    <span style={{ color: "red", verticalAlign: "s" }}>*</span>
                  </label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ marginTop: "10px" }} class="form-check">
                  <small id="emailHelp" class="form-text text-muted">
                    <span>
                      If you already have an account?
                      <a href="./Login"> Login</a>
                    </span>
                  </small>
                  <small id="emailHelp" class="form-text text-muted">
                    <span style={{ color: "red" }}>* Required</span>
                  </small>
                </div>
                <div class="col-md-8">
                  <button
                    style={{ marginTop: "10px", marginLeft: "45px" }}
                    type="submit"
                    class="btn btn-info"
                  >
                    Create A New Account
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
