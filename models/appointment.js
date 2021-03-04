// Require necessary NPM packages
const mongoose = require("mongoose");

// Define appointment Schema
const AppointmentSchema = new mongoose.Schema(
  {
    date: { type: Date, required: true },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    clinicId: { type: mongoose.Schema.Types.ObjectId, ref: "clinics" },
  },
  {
    timestamps: true,
  }
);

// Compile our Model based on the Schema
const Appointment = mongoose.model("Appointment", AppointmentSchema);

// Export our Model for use
module.exports = Appointment;
