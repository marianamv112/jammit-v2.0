 const User = require('../models/user');
 const LocalStrategy = require('passport-local').Strategy;
 const bcrypt = require('bcryptjs'); 
 const passport = require('passport');

 passport.serializeUser((loggedInUser, cb) => {
   cb(null, loggedInUser._id);
 });

 passport.deserializeUser((userIdFromSession, cb) => {
   User.findById(userIdFromSession, (err, userDocument) => {
     if (err) {
       cb(err);
       return;
     }
     cb(null, userDocument);
   });
 });

 passport.use(new LocalStrategy({
  usernameField: 'email',
}, (email, password, next) => {

   User.findOne({ email }, (err, foundUser) => {

     if (err) {
       next(err);
       return;
     }

     if (!foundUser) {
       next(null, false, { message: 'Incorrect email.' });
       return;
     }

     if (!bcrypt.compareSync(password, foundUser.password)) {
       next(null, false, { message: 'Incorrect password.' });
       return;
     }

     next(null, foundUser);
   });
 }));