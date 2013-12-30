angular.module('app')
  .factory('auth', function($http) {
    return {
      session: function(cb) {
        $http.get('/_api/session').then(function(res) {
          if (res.status === 500) { return cb(res.data); }
          if (res.status !== 200) { return cb(); }
          cb(null, res.data);
        });
      },
      login: function(cb) {
        navigator.id.get(function(assertion) {
          if (assertion) {
            $http.put('/_api/session', { assertion: assertion})
              .then(function(res) {
                if (res.status !== 200 ) { return cb(new Error("Login Failed!")); }
                cb(null, res.data);
              });
          } else {
            cb(new Error("Invalid Login"));
          }
        });
      },
      logout: function(cb) {
        $http.delete('/_api/session').then(function(res) {
          cb(null, res.data);
        });
      }
    };
  });
