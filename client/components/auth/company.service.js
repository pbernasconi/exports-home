'use strict';

angular.module('exportsHomeApp')
  .factory('AuthCompany', AuthCompany);


function AuthCompany($location, $rootScope, $http, User, $cookieStore, $q) {
  var currentUser = {};
  if ($cookieStore.get('token')) {
    currentUser = User.get();
  }

  return {

    login: function (user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email: user.email,
        password: user.password
      }).
        success(function (data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        }).
        error(function (err) {
          this.logout();
          deferred.reject(err);
          return cb(err);
        }.bind(this));

      return deferred.promise;
    },

    logout: function () {
      $cookieStore.remove('token');
      currentUser = {};
    },

    createUser: function (user, callback) {
      var cb = callback || angular.noop;

      return User.save(user,
        function (data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return cb(user);
        },
        function (err) {
          this.logout();
          return cb(err);
        }.bind(this)).$promise;
    },

    getCurrentUser: function () {
      return currentUser;
    },

    /**
     * Check if a user is logged in
     *
     * @return {Boolean}
     */
    isLoggedIn: function () {
      return currentUser.hasOwnProperty('role');
    },

    /**
     * Waits for currentUser to resolve before checking if user is logged in
     */
    isLoggedInAsync: function (cb) {
      if (currentUser.hasOwnProperty('$promise')) {
        currentUser.$promise.then(function () {
          cb(true);
        }).catch(function () {
          cb(false);
        });
      } else if (currentUser.hasOwnProperty('role')) {
        cb(true);
      } else {
        cb(false);
      }
    },

    isAdmin: function () {
      return currentUser.role === 'admin';
    },

    getToken: function () {
      return $cookieStore.get('token');
    }
  };
}
