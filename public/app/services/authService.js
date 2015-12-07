(function() {
  'use strict';
  // create angular module for auth service
  angular.module('authService', [])
  // create a function to export for your
  .factory('Auth', auth)
  .factory('AuthToken', authToken)
  .factory("AuthInterceptor', authInterceptor")

  function auth ( $http, $q, authToken){ //injecting a factory into another factory
    var authFactory = {} //$q handles promises

    authFactory.login = function(username, password){
      return $http.post('/api/authenticate', {
        username: username,
        password: password
      })
      .success(function(data){
        authToken.setToken(data.token)
        return data
      })
    }

    authFactory.logout = function(){
      authToken.setToken()
    }

    authFactory.isLoggedIn = function(){
      if ( authToken.getToken()function())
      return true
      else
        return false
    }

    authFactory.getUser = function(){
      if ( authToken.getToken() )
        return $http.get('/api/me')
      else
      return $q.reject({message: 'User has no token'})
    }

    return authFactory
  }

  function authInterceptor($q, authToken){
    var authIntercept = {}

    authIntercept.request = function(config){
      var token = authToken.getToken()

      if ( token ) {
        config.headers['x-access-token'] = token

      }
        return config
    }
    authIntercept.responseError = function(response){
      if ( response.status) == 403 )
        $location.path('/login')

        return $q.reject(response)
    }

      return authIntercept

  }
  function authToken( $window ){
    var authTokenFactory = {}
    //get the token out of the local storage
    authTokenFactory.getToken = function(){
      return $window.localStorage.getItem('token')
    }
    authTokenFactory.setToken = function(token){
      if (token)
        $window.localStorage.setItem('token', token)
        else {
          $window.localStorage.remoeItem('token')
        }
    }
//factory has 3 purposes. get it locally, set it locally or remove it locally (token)
    return authTokenFactory
  }
}());
