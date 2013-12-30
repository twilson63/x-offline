describe('HomeCtrl', function() {
  var scope;//we'll use this scope in our tests
  //mock Application to allow us to inject our own dependencies
  beforeEach(angular.mock.module('app'));
  //mock the controller for the same reason and include $rootScope and $controller
  beforeEach(angular.mock.inject(function($rootScope, $controller){
    //create an empty scope
    scope = $rootScope.$new();
    //declare the controller and inject our empty scope
    $controller('HomeCtrl', {$scope: scope });
  }));
  // tests start here
  it('subject should be Hello World', function() {
    expect(scope).toBeDefined();
    expect(scope.subject).toBe('Hello World');
  });
});