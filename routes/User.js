// Require necessary NPM packages
const express = require("express");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

// import the models
const user = require("../models/users");

// Admin created here because Admin can't sign up
/* 
const Admin = new user({

  firstName: "NewUSer",
  lastName: "New",
  email: "New@hotmail.com",
  isAdmin: true,
  password: 1235,
});

 Admin.save();
 */

/*
 * Method:      POST
 * URI:         /signup
 * Description: create new user 
 */
router.post("/signup", (req, res) => {
  user.create(req.body, (error, newUser) => {
    if (error) {
      res.json(error);
    } else {
      res.json(newUser);
    }
  });
});

/*
 * Method:      POST
 * URI:         /login
 * Description: get user login details
 */
router.post("/login", (req, res) => {
    console.log("My body =>>>> ", req.body);
    // db.inventory.find( { $and: [ { price: { $ne: 1.99 } }, { price: { $exists: true } } ] } )
    user.find(
      { $and: [{ email: req.body.email }, { password: req.body.password }] },
      (error, foundUser) => {
        if (error) {
          console.log("NOT FOUND ", error);
          res.json(error);
        } else {
          console.log("FOUND ", foundUser);
          res.json(foundUser);
        }
      }
    );
  });


/**
 * Method:      GET
 * URI:         /Profile/:id
 * Description: Get user profile info
 */
router.get("/Profile/:id", (req, res) => {
    user.findById(req.params.id, (error, User) => {
      if (error) {
        res.json(error);
      } else {
        res.json(User);
      }
    });
  });
  
  /**
   * Method:      PUT
   * URI:         /Profile/:id
   * Description: update user profile
   */
  router.put("/Profile/:id", (req, res) => {
    user.findByIdAndUpdate(req.params.id, req.body, (error, updateUser) => {
      if (error) {
        res.json(error);
      } else {
        res.json(updateUser);
      }
    });
  });
module.exports = router;
