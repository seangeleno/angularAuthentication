angular.module('userApp', ['ngAnimate', 'app.routes', 'mainCtrl', 'userCtrl', 'userService', 'authService'])

// application configuration to integrate token into requests
.config(function() {

	// attach our auth interceptor to the http requests


});
