import React, { Component } from "react";
import "../App.css";
import { userLogin } from "../api";
import { Redirect } from "react-router-dom";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // the values of the input fileds for login
      loginDetails: {},
      // check if the user is logged or not
      isLogged: true,
      // the loggedin user id
      userId: "",
      // errors from the validation of the login form
      error: "",
      // check if the user is admin or not
      isAdmin: false,
      //change the render to use redirect
      redirect: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // check if the values enterd in the (loginDetails) state is in the database
  handleSubmit = (event) => {
    event.preventDefault();
    const loginData = this.state.loginDetails;
    console.log(loginData);

    // Return True

    userLogin(loginData)
      .then((res) => {
        console.log(res);
        console.log(res.data);

        if (res.data.length != 0) {
          console.log("Found SomeOne");

          if (res.data[0].isAdmin == true) {
            // Here to check if the user type is an admin or a user.
            // If he an admin will go to the Admin page.
            console.log("IS AN ADMIN");
            this.setState({ isAdmin: true });
          } else if (res.data[0].isAdmin == false) {
            // Else that's mean a user.
            console.log("IS A USER");

            this.setState({ islogged: true, userId: res.data[0]._id });
          }
          this.LoggedIn();
        } else {
          this.setState({
            // To print the error message if occurs.
            error:
              "Wrong password or email. Try again or click Forgot password to reset it",
          });
        }
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  // get the values of the input fileds and put them in the state (loginDetails) for login
  handleChange = (event) => {
    let dataInput = this.state.loginDetails;

    dataInput[event.target.name] = event.target.value;

    this.setState({
      loginDetails: dataInput,
      error: "",
    });
  };

  // add the login details (isLogged, userID, isAdmin) to the local storage
  LoggedIn = () => {
    let LoginState = true;
    let iduser = "";
    let Admin = false;

    localStorage.setItem("loggedin", JSON.stringify(LoginState));
    const lggedin = JSON.parse(localStorage.getItem("loggedin"));
    LoginState = true;
    localStorage.setItem("loggedin", JSON.stringify(LoginState));

    localStorage.setItem("admin", JSON.stringify(Admin));
    const admin = JSON.parse(localStorage.getItem("admin"));
    Admin = this.state.isAdmin;
    localStorage.setItem("admin", JSON.stringify(Admin));

    localStorage.setItem("id", JSON.stringify(iduser));
    const userId = JSON.parse(localStorage.getItem("id"));
    iduser = this.state.userId;
    localStorage.setItem("id", JSON.stringify(iduser));
    console.log(JSON.parse(localStorage.getItem("id")));

    this.props.isLogged();

    if (this.state.isAdmin) {
      this.setState({
        ...this.state,
        redirect: "/Admin",
      });
    } else {
      this.setState({
        ...this.state,
        redirect: "/",
      });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />;
    }
    return (
      <div id="" className="container">
        <div
          className="Card-login"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <div
            class="card"
            style={{
              width: "22rem",
              marginBottom: "20px",
              boxShadow: "10px 10px 5px grey",
            }}
          >
            <h1 style={{ textAlign: "center", marginTop: "20px" }}>Login</h1>

            <span
              style={{ color: "red", textAlign: "center", display: "block" }}
            >
              {this.state.error}
            </span>
            <div className="row justify-content-md-center">
              <form className="" onSubmit={this.handleSubmit}>
                <div class="col-md-12">
                  <label for="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    class="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    name="email"
                    placeholder="Enter email"
                    onChange={this.handleChange}
                  />
                  <small id="emailHelp" class="form-text text-muted">
                    We'll never share your email with anyone else.
                  </small>
                </div>
                <div class="col-md-12 ">
                  <label for="exampleInputPassword1">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    id="exampleInputPassword1"
                    placeholder="Password"
                    name="password"
                    value={this.state.inputEmail}
                    onChange={this.handleChange}
                  />
                </div>
                <div style={{ marginTop: "10px" }} class="form-check">
                  <small id="emailHelp" class="form-text text-muted">
                    <span>
                      You don't have an account?<a href="./Signup"> Signup</a>
                    </span>
                  </small>
                </div>
                <div class="col-md-12">
                  <button
                    style={{ width: "100%", marginTop: "10px" }}
                    type="submit"
                    class="btn btn-info"
                  >
                    Login
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
