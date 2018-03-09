var db = require('./db');

module.exports.handleSignup = (email, password) => {
  //check if email already exists
  //save the user to database
  db.saveUser({
    email,
    password
  });
  //send the weclome email
};
