var getUser = (id, callback) => {
  var user = {
    id: id,
    name: 'Vikram'
  };
  setTimeout(function() {
    callback(user);
  }, 300);
  callback(user);

};

getUser(31, (userObject) => {
  console.log(userObject);
});