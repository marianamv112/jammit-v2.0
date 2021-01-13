// routes/auth-routes.js

const express = require("express");
const authRoutes = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const sign = require("jwt-encode");
const nodemailer = require("../config/nodemailer");

// require the user model !!!!
const User = require("../models/user");

authRoutes.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const confirmationCode = sign({ username, email }, process.env.SESS_SECRET);

  if (!username || !email || !password) {
    res.status(404).json({ message: "Provide username, email and password" });
    return;
  }

  User.findOne({ username }, (err, foundUser) => {
    if (err) {
      res.status(500).json({ message: "Something went wrong" });
      return;
    }

    if (foundUser) {
      res.status(400).json({ message: "Username taken. Choose another one." });
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);

    const aNewUser = new User({
      username: username,
      email: email,
      password: hashPass,
      confirmationCode: confirmationCode,
    });

    aNewUser.save((err) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res
            .status(422)
            .json({ message: "Email taken. Choose another one." });
        }
        res
          .status(400)
          .json({ message: "Saving user to database went wrong." });
        return;
      }

      res.status(200).json({
        message:
          "You are successfully signed up. Please check your email to activate your account",
      });
      nodemailer.sendConfirmationMail(
        aNewUser.username,
        aNewUser.email,
        aNewUser.confirmationCode
      );
    });
  });
});

authRoutes.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, theUser, failureDetails) => {
    
    if (err) {
      res
        .status(500)
        .json({ message: "Something went wrong authenticating user" });
      return;
    }

    if (!theUser) {
      // "failureDetails" contains the error messages
      // from our logic in "LocalStrategy" { message: '...' }.
      res.status(401).json(failureDetails);
      return;
    }

    if (theUser.status !== "Active") {
      res
        .status(403)
        .json({ message: "Must activate account. Please check your mailbox." });
      return;
    }

    // save user in session
    req.login(theUser, (err) => {
      if (err) {
        res.status(500).json({ message: "Session save went bad." });
        return;
      }

      // We are now logged in (that's why we can also send req.user)
      res.status(200).json(theUser);
    });
  })(req, res, next);
});

authRoutes.post("/logout", (req, res, next) => {
  req.session.destroy();
  req.logout();
  res.status(200).json({ message: "Log out success!" });
});

authRoutes.get("/loggedin", (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

authRoutes.get("/confirm/:confirmationCode", (req, res, next) => {
  User.findOne(
    { confirmationCode: req.params.confirmationCode },
    (err, foundUser) => {
      if (err) {
        res.status(500).json({ message: "Something went wrong" });
        return;
      }

      if (!foundUser) {
        res
          .status(404)
          .json({ message: "Unknown user. Cannot activate account." });
        return;
      }

      if (foundUser) {
        foundUser.status = "Active";

        foundUser.save((err) => {
          if (err) {
            res.status(500).json({ message: "Something went wrong" });
            return;
          }
          res.status(200).json({ message: "Success" });
          return;
        });
      }
    }
  );
});

module.exports = authRoutes;
