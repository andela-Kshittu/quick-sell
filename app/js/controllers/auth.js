angular.module('sellit.controllers').controller('authCtrl', ['$firebase', '$rootScope', '$scope','$cookies','Refs', '$state', function($firebase, $rootScope, $scope, $cookies, Refs, $state) {

    $scope.login = function(user) {
    	console.log('logging in ');
        Refs.rootRef.authWithPassword({
            email: user.email,
            password: user.password
        }, function(error, authData) {
            if (error) {
                console.log("Login Failed!", error);
            } else {
                console.log("Authenticated successfully with payload:",
                    authData);
            }
        }, {
            remember: "sessionOnly"
        });
    };

    $scope.logout = function(){
    	Refs.rootRef.unauth();
    	$state.go('login');
    };

    $scope.createUser = function(user) {
        Refs.rootRef.createUser({
            email: user.email,
            password: user.password
        }, function(error) {
            if (error === null) {
                console.log("user created successfully");
                $scope.login(user);
            } else {
                console.log("Error creating user:", error);
            }
        });
    };

}]);
