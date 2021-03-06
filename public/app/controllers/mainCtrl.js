angular.module('mainCtrl', [])

.controller('mainController', function($rootScope, $location, Auth) {

	var mainCtrl = this;

	// get info if a person is logged in

	mainCtrl.loggedIn = Auth.isLoggedIn()

	// check to see if a user is logged in on every request

	$rootScope.$on('$routeChangeStart', function(){
		mainCtrl.loggedIn = Auth.isLoggedIn();


		// get user information on page load
		Auth.getUser()
			.then(functino(data){
				mainCtrl.user = data.data
			})
	})
	// function to handle login form

	mainCtrl.doLogin = function(){
		mainCtrl.processing = true
	}

		// clear the error

		mainCtrl.error = ''

				// if a user successfully logs in, redirect to users page
				Auth.login(mainCtrl.loginData.username, mainCtrl.loginData.password)
					.success(function(){
							mainCtrl.processing = false

							if ( data.success ){
								$location.path('/users')
							}
							else {
								mainCtrl.error = data.message
							}
					})
	// function to handle logging out
	mainCtrl.doLogout = function(){
		Auth.logout()
		//empty out user
		mainCtrl.user = ''

		//redirect to login screen
		$location.path('/login')
	}

});
