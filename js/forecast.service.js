// Service
app.service('ForecastService', ['$http', '$q', 'CacheFactory', 'config', function ($http, $q, CacheFactory, config) {

    CacheFactory('forecast', {
        maxAge: 30 * 60 * 1000, // Items added to this cache expire after 30 minutes
        cacheFlushInterval: 60 * 60 * 1000, // This cache will clear itself every hour
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.
    });

    return {
        getForecast: function (latitude, longitude) {
            var deferred  = $q.defer(),
                cache     = CacheFactory.get('forecast'),
                cache_key = latitude + '_' + longitude;

            if (cache.get(cache_key)) {
                deferred.resolve(cache.get(cache_key));
            } else {
                $http({
                    method: 'JSONP',
                    url: config.forecast.endpoint + 'forecast/' + config.forecast.api_key + '/' + latitude + ',' + longitude,
                    params: {
                        callback: 'JSON_CALLBACK',
                        units: 'si',
                        exclude: 'flags'
                    }
                }).success(function (data) {
                    cache.put(cache_key, data);
                    deferred.resolve(data);
                });
            }

            return deferred.promise;
        }
    };

}]);
