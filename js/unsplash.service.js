// Service
app.service('UnsplashService', ['$http', '$q', 'CacheFactory', 'config', function ($http, $q, CacheFactory, config) {

    CacheFactory('unsplash', {
        maxAge: 2 * 24 * 60 * 60 * 1000, // Items added to this cache expire after 2 days
        cacheFlushInterval: 2 * 24 * 60 * 60 * 1000, // This cache will clear itself every 2 days
        deleteOnExpire: 'aggressive', // Items will be deleted from this cache when they expire
        storageMode: 'localStorage' // This cache will use `localStorage`.
    });

    return {
        getRandomPhoto: function (collection_id) {
            var deferred  = $q.defer(),
                cache     = CacheFactory.get('unsplash'),
                cache_key = collection_id + '_' + moment().format('YYYY-MM-DD');

            if (cache.get(cache_key)) {
                deferred.resolve(cache.get(cache_key));
            } else {
                $http({
                    method: 'GET',
                    url: config.unsplash.endpoint + 'photos/random',
                    params: {
                        collections: collection_id,
                        client_id: config.unsplash.api_key
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
