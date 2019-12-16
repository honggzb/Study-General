angular.module('app').component('createNewSession', {

  templateUrl: '/createNewSession.html',
  bindings: {
    userSessions: '='
  },
  controller: function(toastr, currentIdentity, sessions, nameParser) {
    console.log(nameParser);
    this.create = function() {
      let newUserSession = {
        title: this.title,
        length: parseInt(this.length),
        abstract: this.abstract,
        userFirstName: currentIdentity.currentUser.firstName,
        userLastName: currentIdentity.currentUser.lastName,
        userId: currentIdentity.currentUser.id,
      }

      sessions.createNewSession(newUserSession).then(response =>  {
        console.log(response);
        this.userSessions.push(response);
      })

    }
  }
})
