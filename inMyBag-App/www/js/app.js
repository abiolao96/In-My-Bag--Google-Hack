'use strict';

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('IN-MY-BAG', [
    'ionic',
    'ui.router',
    'ionic.native'
]);

app.run(function($ionicPlatform) {

 $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});


app.controller('navCtrl', function($scope, $http, $location, $cordovaCamera,  $ionicPlatform) {
    //Changes the view/page
    $scope.changeview = function(path) {
        $location.path(path).replace();
    }
    
    $scope.DATA = "Upload a Picture"
    $scope.license;

    // wait for ondeviceready, or use $ionicPlatform.ready() if you're using Ionic Framework 1
    $scope.takePicture = function() {
      // now we can call any of the functionality as documented in Native docs
      $cordovaCamera.getPicture().then(
        function(res) {
          console.log("We have taken a picture!", res);
          $scope.DATA = "PICTURE UPLOADED!!"
          $scope.license = res;
        },
        function(err){
          console.error("Error taking a picture", err);
          $scope.DATA = "Error!"
        }
      );
    }
    
});


//Switches between pages/views
app.config(function($stateProvider, $urlRouterProvider) {
    // Use $urlRouterProvider to configure any redirects (when) and invalid urls (otherwise).
    $urlRouterProvider

    // If the url is ever invalid, e.g. '/asdf', then redirect to '/' aka the home state
    .otherwise('/');
    
    $stateProvider
    .state('main', {
        url: "/",
        templateUrl: "views/nav.html",
        controller: "navCtrl",
    })

});


app.config(['$locationProvider', function ($locationProvider) {
			$locationProvider.html5Mode({
              enabled: true,
              requireBase: false
            });
		}
]);

exports = app;

