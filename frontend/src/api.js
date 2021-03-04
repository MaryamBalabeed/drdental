import API_URL from "./apiConfig";
// const API_URL=require('./apiConfig')
import axios from "axios";

// INDEX, SHOW, CREATE, UPDATE, DESTROY

// Get All Clinics
const getAllClinics = () => {
  return axios.get(`/api/clinic/clinic`);
};

// Add new Clinic
const AddNewClinic = (newClinic) => {
  return axios.post(`/api/clinic/clinic`, newClinic);
};
// Delete Clinic by ID
const deleteClinicByID = (id) => {
  return axios.delete(`/api/clinic/clinic/${id}`);
};

//add new appointment
const AddNewAppointment = (newAppointment) => {
  return axios.post(`/api/userAppointment/Reserve`, newAppointment);
};

// Edit Clinic by ID
const editClinicByID = (id, editedClinic) => {
  console.log("eidt", editedClinic);
  return axios.put(`/api/clinic/clinic/${id}`, editedClinic);
};

// Get user data
const getUserProfile = (id) => {
  return axios.get(`/api/user/Profile/${id}`);
};

// Edit user by ID
const editUser = (id, editedUser) => {
  console.log("eidt", editedUser);
  return axios.put(`/api/user/Profile/${id}`, editedUser);
};

// Get user appointment
const getUserAppointment = (userId) => {
  return axios.post(`/api/userAppointment/Appointment`, userId);
};

// Delete appointment by ID
const deleteAppointmentByID = (id) => {
  return axios.delete(`/api/userAppointment/Appointment/${id}`);
};

// User Login
const userLogin = (loginData) => {
  return axios.post(`/api/user/login`, loginData);
};

// User Sign Up
const userSignUp = (SignUpData) => {
  return axios.post(`/api/user/signup`, SignUpData);
};
export {
  getAllClinics,
  AddNewClinic,
  deleteClinicByID,
  editClinicByID,
  AddNewAppointment,
  getUserProfile,
  editUser,
  getUserAppointment,
  deleteAppointmentByID,
  userSignUp,
  userLogin,
};
