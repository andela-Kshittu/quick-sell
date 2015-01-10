window.sellit = angular.module('quicksell', ['ui.router']);

sellit.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider, $rootScope) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/public/home.html'
        })
        .state('login', {
        		url: '/settings',
        		templateUrl: 'views/public/settings.html'
        });
}]);
