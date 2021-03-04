import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";
import Nav from "./components/Nav";
import Clinics from "./components/Clinics";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import Appointment from "./components/Appointment";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="mainDiv">
          <Nav />
      
        </div>
      </Router>
    );
  }
}
