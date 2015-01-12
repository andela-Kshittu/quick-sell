angular.module('sellit.controllers', []);
angular.module('sellit.services', []);
angular.module('sellit.directives', []);

window.sellit = angular.module('sellit', [
    'ui.router',
    'firebase',
    'ngCookies',
    'angular-md5',
    'sellit.controllers',
    'sellit.services',
    'sellit.directives'
]);

sellit.run(['Refs', '$rootScope', 'md5', '$state', function(Refs, $rootScope, md5, $state) {
    $rootScope._ = window._;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        console.log('currentUser from state change', $rootScope.currentUser);
        if ($rootScope.currentUser === null && toState.name !== 'login' && toState.name !== 'home') {
            event.preventDefault();
            $state.go('login');
        }
        if ($rootScope.currentUser !== null && toState.name === 'login') {
            event.preventDefault();
            $state.go('settings');
        }
    });

    Refs.rootRef.onAuth(function(authData) {
        if (authData) {
            console.log('this is authData', authData);
            var hasedUid = md5.createHash('jjkbk+++)_/.,///jjkkjj]' + authData.uid + '[*@##$$$54623344$#^&*');
            authData.uid = hasedUid;
            var user = {
                email: authData.password.email,
                uid: authData.uid
            };
            console.log('this is hashed uid', hasedUid);
            Refs.usersRef.child(user.uid).on('value', function(snap) {
                if (!snap.val()) {
                    console.log('data to send', user);
                    Refs.usersRef.child(user.uid).set(user);
                } else {
                    $rootScope.currentUser = snap.val();
                    $state.go('settings');
                    console.log('logged in currentUser is', $rootScope.currentUser)
                }
            });

        } else {
            console.log('no authData', authData);
            $rootScope.currentUser = null;
        }
    });
}]);

sellit.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: 'views/public/home.html'
        })
        .state('settings', {
            url: '/settings',
            templateUrl: 'views/public/settings.html',
            controller: 'authCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'views/public/login.html',
            controller: 'authCtrl'
        });
}]);


// $stateProvider.state("contacts", {
//   template: '<h1>{{title}}</h1>',
//   resolve: { title: 'My Contacts' },
//   controller: function($scope, title){
//     $scope.title = 'My Contacts';
//   },
//   onEnter: function(title){
//     if(title){ ... do something ... }
//   },
//   onExit: function(title){
//     if(title){ ... do something ... }
//   }
// })
