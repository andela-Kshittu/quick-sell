window.quicksell = angular.module('quicksell',['ui.router']);

quicksell.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider,$rootScope){
	$locationProvider.html5Mode(true);
	$stateProvider
			.state('home',{
				url:'/',
				templateUrl:'index.html',
				controller:''
			});
}]);