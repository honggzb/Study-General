angular.module('app').component('createUsers', {
  templateUrl: './createUsers.html',
  bindings: {
  },
  controller: function(nameParser, users, toastr) {

    this.import = function() {
      var people = nameParser.parse(this.namesblob);
      people.forEach(person => {
        users.createNewUser({
          email: person.email,
          password: "pass",
          firstName: person.firstName,
          lastName: person.lastName
        }).catch((error) => {
          toastr.error("User already exists: " + person.email)
        })
      });

      toastr.success("Users Created!")
    }
  }
})