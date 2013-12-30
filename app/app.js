angular.module('app', ['ngRoute', 'ngTouch', 'ngAnimate', 'angular-growl'])
  .config(function($routeProvider, $locationProvider, growlProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeCtrl',
        templateUrl: '/templates/index.html'
      })
      ;
      $locationProvider.html5Mode(true);
      growlProvider.globalTimeToLive(3000);
  })
  .constant('dbName', 'foobar')
  .run(function($rootScope, growl, auth) {
    $rootScope.authorized = false;
    var loadSession = function(err, user) {
      if (err) { return growl.addErrorMessage(err.message); }
      if (user) {
        $rootScope.user = user;
        $rootScope.authorized = true;
      }
    };

    auth.session(loadSession);
    $rootScope.login = function() { auth.login(loadSession); };
    $rootScope.logout = function() { 
      auth.logout(function(err, data) {
        if (err) { return growl.addErrorMessage(err.message); }
        $rootScope.user = null;
        $rootScope.authorized = false;
      });
    };
  });
