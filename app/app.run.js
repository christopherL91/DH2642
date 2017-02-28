(function() {
    'use strict';

    angular
        .module('app')
        .run(runBlock);

        runBlock.$inject = ['$rootScope'];

        // Do something when route changes here
        function runBlock($rootScope) {}
})();
