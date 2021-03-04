// Require necessary NPM packages
const mongoose = require("mongoose");
// Define users Schema
const UsersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: Number },
  email: { type: String, required: true },
  userImage: { type: String,default:"https://www.searchpng.com/wp-content/uploads/2019/02/Deafult-Profile-Pitcher.png" },
  isAdmin: { type: Boolean, default: false},
  password: { type: String, required: true },
});
// Compile our Model based on the Schema
const Users = mongoose.model("users", UsersSchema);
// Export our Model for use
module.exports = Users;
