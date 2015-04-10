'use strict';

angular.module('exportsHomeApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('logins', {
        url: '/logins',
        templateUrl: 'app/login/login.html',
        controller: 'LoginCtrl'
      });
  });
