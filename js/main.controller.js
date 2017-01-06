app.controller('MainController', ['$scope', '$http', '$mdDialog', '$mdMedia', '$timeout', '$q', 'CacheFactory', 'ForecastService', 'moment', 'preloader', 'UnsplashService', function ($scope, $http, $mdDialog, $mdMedia, $timeout, $q, CacheFactory, ForecastService, moment, preloader, UnsplashService) {

    $scope.moment = moment;
    $scope.image  = null;

    /*** Greetings ***/
    if (moment().hour() >= 6 && moment().hour() < 13) {
        $scope.greetings = 'Good morning';
    } else if (moment().hour() >= 13 && moment().hour() < 18) {
        $scope.greetings = 'Good afternoon';
    } else if (moment().hour() >= 18 && moment().hour() < 22) {
        $scope.greetings = 'Good evening';
    } else {
        $scope.greetings = 'Good night';
    }

    /*** Geo-location ***/
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var latitude  = position.coords.latitude,
                longitude = position.coords.longitude;

            ForecastService.getForecast(latitude, longitude).then(function (data) {
                $scope.buildForecast(data);
            });
        });
    }

    /*** Forecast & Image ***/
    $scope.buildForecast = function (data) {
        $scope.color     = 'black';
        $scope.currently = data.currently;
        $scope.forecast  = data.daily;

        var unsplash_collection_id = 346754;

        switch ($scope.currently.icon) {
            case 'clear-day':
            case 'clear-night':
                $scope.color           = 'orange';
                unsplash_collection_id = 346754;
                break;
            case 'cloudy':
            case 'fog':
            case 'partly-cloudy-day':
            case 'partly-cloudy-night':
            case 'rain':
            case 'wind':
                $scope.color           = 'blue';
                unsplash_collection_id = 346744;
                break;
            case 'snow':
            case 'sleet':
                $scope.color           = 'light-blue';
                unsplash_collection_id = 346747;
                break;
        }

        UnsplashService.getRandomPhoto(unsplash_collection_id).then(function (response) {
            var urls = response.urls;

            preloader.preloadImages([urls.small]).then(function () {
                if ($scope.image === null) {
                    $scope.image = urls.small;
                }
            });

            preloader.preloadImages([urls.full]).then(function () {
                $scope.image = urls.full;
            });
        });
    };

}]);
