// Require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const PORT = process.env.PORT || 3001;

//Make sure to add to your whitelist any website or APIs that connect to your backend.
var whitelist = [
  `http://localhost:${PORT}`,
  "https://drdentalclinics.herokuapp.com",
];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      var message =
        "The CORS policy for this application does not allow access from origin " +
        origin;
      callback(new Error(message), false);
    }
  },
};

// const PORT = process.env.PORT || 3001;

// Clinics Router
const clinicRouter = require("./routes/Clinics");

// User Appointment Router
const userAppointmentRouter = require("./routes/Appointments");

// User Router
const userRouter = require("./routes/User");

// Require DB Configuration File
const db_url = require("./db");

// Establish Database Connection
mongoose.connect(process.env.mongoDBURL, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo");
});

// user Schema

// Instantiate Express Application Object
const app = express();

/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

const reactPort = 3000;
// Set CORS headers on response from this API using the `cors` NPM package.
app.use(cors(corsOptions));

/*** Routes ***/

// Mount imported Routers
app.use("/api/clinic", clinicRouter);
app.use("/api/userAppointment", userAppointmentRouter);
app.use("/api/user", userRouter);

// app.use('/',indexRouter);
// app.use('/articles',articlesRouter);

/*** Routes ***/
// Define PORT for the API to run on
// const PORT = process.env.PORT || 5000;

//must change your port to this for deployment else it wont work

//serves all our static files from the build directory.
app.use(express.static(path.join(__dirname, "/build")));

// After all routes
// This code essentially serves the index.html file on any unknown routes.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ PORT: ${PORT} 🌟`);
});
