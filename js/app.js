var app = angular.module('Wabby', [
    'angularMoment',
    'ngAnimate',
    'ngAria',
    'ngRoute',
    'ngMaterial',
    'angular-cache',

    // Wabby
    'Wabby.Config'
]);

app.config(['$compileProvider', function ($compileProvider) {

    // Allow "chrome-extension" protocol
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|chrome-extension|blob:chrome-extension|file|blob):/);
    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|chrome-extension|file|blob):|data:image\//);

}]);
