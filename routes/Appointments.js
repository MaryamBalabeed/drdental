// Require necessary NPM packages
const express = require("express");
const { model } = require("mongoose");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

const Appointments = require("../models/appointment");


/**
 * Method:      POST
 * URI:         /
 * Description: Get all Appointment of user  
 */

router.post("/Appointment", (req, res) => {
  let appointment = Appointments.find(req.body)
    .populate({
      path: "clinicId",
      select: "-rating -clinicImag -serviceType",
      model: "clinics",
    })
    .then((allAppointment) => {
      res.json(allAppointment);
    })
    .catch((err)=>{
      res.json(err);
    })
  console.log(appointment);
});



/**
 * Method:      POST
 * URI:         /
 * Description: create new appointment 
 */

router.post("/Reserve", (req, res) => {
  console.log(req.body.date)
  Appointments.create(req.body, (error, newAppointment) => {
    if (error) {
      res.json(error);
    } else {
      res.json(newAppointment);
    }
  });
});


/**
 * Method:      DELETE
 * URI:         /
 * Description: delete an Appointment of user  
 */

router.delete("/Appointment/:id", (req, res) => {
  Appointments.findByIdAndRemove(req.params.id, (error, updatedAppointments) => {
    if (error) {
      res.json(error);
    } else {
      res.json(updatedAppointments);
    }
  });
});



// Export the Router so we can use it in the server.js file
module.exports = router;
