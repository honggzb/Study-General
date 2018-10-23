var app = angular.module('myApp', ['pascalprecht.translate']);

app.run(['$rootScope', function($rootScope) {
    $rootScope.lang = 'en';
}]);

app.config(function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'locales/lang-',
        suffix: '.json'
    }) 
    // remove the warning from console log by putting the sanitize strategy
    .useSanitizeValueStrategy('sanitizeParameters')    
    .preferredLanguage('en');
});

app.controller('Ctrl', function ($scope, $rootScope, $translate) {
    $scope.changeLanguage = function (key) {
        $rootScope.lang = key;
        $translate.use(key);
    };
});
