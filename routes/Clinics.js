// Require necessary NPM packages
const express = require("express");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

// import the models
const clinic = require("../models/clinics");
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /
 * Description: Get all the clinics
 */
router.get("/clinic", (req, res) => {
  clinic.find({}, (error, allClinics) => {
    if (error) {
      res.json(error);
    } else {
      res.json(allClinics);
    }
  });
});

/**
 * Action:      INDEX
 * Method:      POST
 * URI:         /
 * Description: create new clinic
 */
router.post("/clinic", (req, res) => {
  clinic.create(req.body, (error, newClinic) => {
    if (error) {
      res.json(error);
    } else {
      res.json(newClinic);
    }
  });
});

/**
 * Action:      INDEX
 * Method:      PUT
 * URI:         /
 * Description: update existing clinic
 */
router.put("/clinic/:id", (req, res) => {
  clinic.findByIdAndUpdate(req.params.id, req.body, (error, updatedClinic) => {
    if (error) {
      res.json(error);
    } else {
      res.json(updatedClinic);
    }
  });
});

/**
 * Action:      INDEX
 * Method:      DELETE
 * URI:         /
 * Description: delete existing clinic
 */
router.delete("/clinic/:id", (req, res) => {
  clinic.findByIdAndRemove(req.params.id, (error, updatedClinic) => {
    if (error) {
      res.json(error);
    } else {
      res.json(updatedClinic);
    }
  });
});

// Export the Router so we can use it in the server.js file
module.exports = router;
