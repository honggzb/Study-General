angular.module('app').component('userDetails', {
  templateUrl: '/userDetails.html',
  bindings: {
    allUsers: '='
  },
  controller: function($routeParams) {

    this.user = this.allUsers.find(function(user) {
      return user.id === parseInt($routeParams.id);
    })
  }
})