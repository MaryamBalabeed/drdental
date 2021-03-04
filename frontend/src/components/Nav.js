import React, { Component } from "react";
import "../index.css";
import Login from "./Login";
import Signup from "./Signup";
import Home from "./Home";
import Clinics from "./Clinics";
import Appointment from "./Appointment";
import Profile from "./Profile";
import Admin from "./Admin";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // get the data if the user is logged or not from local storage
      isLogged: JSON.parse(localStorage.getItem("loggedin")),
      // get the user ID from local storage
      userId: JSON.parse(localStorage.getItem("id")),
      // get the data if the user is Admin or not from local storage
      isAdmin: JSON.parse(localStorage.getItem("admin")),
    };
  }

  // will excute when the user is logged
  isLogged = () => {
    console.log(localStorage.getItem("id"));
    console.log(localStorage.getItem("loggedin"));
    console.log(this.state.isLogged, this.state.userId);
    this.setState({
      isLogged: JSON.parse(localStorage.getItem("loggedin")),
      userId: JSON.parse(localStorage.getItem("id")),
      isAdmin: JSON.parse(localStorage.getItem("admin")),
    });
  };

  // if the user clicked logout this function will clear the local storage
  LoggedOut = () => {
    console.log("Logout");
    localStorage.clear();
    this.setState({ isLogged: false });
  };

  render() {
    return (
      <Router>
        <div className="Nav">
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="">
              <img src="https://i.imgur.com/NF0AUHu.png" width="70%"></img>
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to="/">
                    <a className="nav-link" href="/">
                      Home <span className="sr-only"></span>
                    </a>
                  </Link>
                </li>

                <li className="nav-item active">
                  <Link to="/Clinics">
                    <a className="nav-link" href="">
                      Clinics <span className="sr-only"></span>
                    </a>
                  </Link>
                </li>
              </ul>

              {this.state.isLogged ? (
                <div className="btn-group dropleft">
                  <button
                    className="logedinIcon profileIcon"
                    type="button"
                    className="btn btn-info dropdown-toggle"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <span className={`material-icons`}>account_circle</span>
                  </button>

                  {this.state.isAdmin ? (
                    <div className="dropdown-menu">
                      <Link to="/Admin">
                        <a className="dropdown-item" href="">
                          Admin Panel
                        </a>
                      </Link>
                      <Link to="/">
                        <a
                          className="dropdown-item"
                          href=""
                          onClick={this.LoggedOut}
                        >
                          Logout <span className="sr-only"></span>
                        </a>
                      </Link>
                    </div>
                  ) : (
                    <div className="dropdown-menu ">
                      <Link to="/Profile">
                        <a className="dropdown-item" href="#">
                          Profile
                        </a>
                      </Link>
                      <Link to="/Appointment">
                        <a className="dropdown-item" href="#">
                          Appointment
                        </a>
                      </Link>
                      <Link to="/">
                        <a
                          className="dropdown-item"
                          href=""
                          onClick={this.LoggedOut}
                        >
                          Logout <span className="sr-only"></span>
                        </a>
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <form className="form-inline my-2 my-lg-0">
                  <Link to="/Login">
                    <a className="nav-link" href="">
                      Login <span className="sr-only"></span>
                    </a>
                  </Link>
                  <Link to="/SignUp">
                    <a className="nav-link" href="">
                      Sign Up <span className="sr-only"></span>
                    </a>
                  </Link>
                </form>
              )}
            </div>
          </nav>

          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/Login"
              render={() => <Login isLogged={this.isLogged} />}
            />
            <Route exact path="/SignUp" component={Signup} />

            <Route exact path="/Admin" component={Admin} />

            <Route
              exact
              path="/Clinics"
              component={() => (
                <Clinics
                  userId={this.state.userId}
                  isLogged={this.state.isLogged}
                />
              )}
            />
            <Route
              exact
              path="/Profile"
              component={() => (
                <Profile
                  userId={this.state.userId}
                  isLogged={this.state.isLogged}
                />
              )}
            />
            <Route
              exact
              path="/Appointment"
              component={() => (
                <Appointment
                  userId={this.state.userId}
                  isLogged={this.state.isLogged}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default Nav;
