angular.module('Wabby.Config', []).constant('config', {
    forecast: {
        endpoint: 'https://api.forecast.io/',
        api_key: 'Your API Key'
    },
    unsplash: {
        endpoint: 'https://api.unsplash.com/',
        api_key: 'Your API Key'
    }
});
