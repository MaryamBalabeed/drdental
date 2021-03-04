import React, { Component } from "react";
import { getUserAppointment, deleteAppointmentByID } from "../api";

export default class Appointment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // will have all the user appointment
      userAppointment: [],
    };
  }
  componentDidMount() {
    // get all user appointment from database and save it in the state (userAppointment)
    console.log(this.props.userId);
    let userId = {};
    userId["patientId"] = this.props.userId;
    if (this.props.isLogged === true) {
      getUserAppointment(userId)
        .then((response) => {
          console.log("RESPONSE: ", response);
          console.log("DATA: ", response.data);
          this.setState({ userAppointment: response.data });
          console.log(response.data);
        })
        .catch((err) => {
          console.log("ERR: ", err);
        });
    }
  }

  // canceling (delete) appointment from the database
  deleteAppointment = (event, id) => {
    event.preventDefault();
    console.log(id);
    deleteAppointmentByID(id)
      .then((response) => {
        console.log("RESPONSE: ", response);
        console.log("DATA: ", response.data);

        const newAppointmentList = this.state.userAppointment.filter(
          (Appointment) => {
            return Appointment._id !== id;
          }
        );
        this.setState({ userAppointment: newAppointmentList });
      })
      .catch((err) => {
        console.log("ERR: ", err);
      });
  };

  render() {
    const allAppointment = this.state.userAppointment.map(
      (appointment, index) => {
        return (
          <tr>
            <th scope="row">{index + 1}</th>

            <td>{appointment.clinicId.clincName}</td>
            <td>{appointment.date}</td>
            <td>
              <a
                href=""
                onClick={(e) => {
                  this.deleteAppointment(e, appointment._id);
                }}
              >
                Cancel
              </a>
            </td>
          </tr>
        );
      }
    );

    return (
      <div className="d-flex justify-content-center mt-5 table ml-4 table-hover table-borderless">
        <table class="table w-75 text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Clinic Name</th>
              <th scope="col">Date</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>{allAppointment}</tbody>
        </table>
      </div>
    );
  }
}
