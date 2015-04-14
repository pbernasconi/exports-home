'use strict';

angular.module('exportsHomeApp')
  .controller('SignupCtrl', SignupCtrl);


function SignupCtrl(Auth, $location) {
  var self = this;
  self.user = {
    name: 'Paolo Ber',
    email: 'paolo.enrico.bernasconi@gmail.com',
    company: 'ex',
    subdomain: 'ex'
  };

  self.register = function (form) {
    self.submitted = true;

    console.log(form);


  };

}
