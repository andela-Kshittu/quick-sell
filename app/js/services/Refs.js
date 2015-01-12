angular.module('sellit.services').factory('Refs', ['$firebase', '$cookies', function($firebase, $cookies) {
    var rootRef = new Firebase($cookies.rootRef);
    return {
        rootRef: rootRef,
        usersRef: rootRef.child('users')
    }
}]);
