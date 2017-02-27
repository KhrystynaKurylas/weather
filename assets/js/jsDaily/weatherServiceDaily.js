function getWeatherDataDaily(lang, fnOK, fnError) {
    navigator.geolocation.getCurrentPosition(locSuccessDaily, locErrorDaily);

    function locSuccessDaily(position) {
        // Check cache
        var cacheDaily = localStorage.weatherCacheDaily && JSON.parse(localStorage.weatherCacheDaily);
        var currDateDaily = new Date();
        // If the cache is newer than 30 minutes, use the cache
        if(cacheDaily && cacheDaily.timestamp && cacheDaily.timestamp > currDateDaily.getTime() - 30*60*1000){
            fnOK.call(this, cacheDaily.data);
        } else {
            $.getJSON(
                'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + position.coords.latitude + '&lon=' +
                position.coords.longitude + '&cnt=16&units=metric' + '&lang=' + lang + '&callback=?&appid=9649c92439ade00fa8117dec4613064b'
                function (response) {
                    // Store the cache
                    localStorage.weatherCacheDaily = JSON.stringify({
                        timestamp: (new Date()).getTime(),	// getTime() returns milliseconds
                        data: response
                    });
                    // Call the function again
                    locSuccessDaily(position);
                }
            );
        }
    }

    function locErrorDaily(error) {
        var message = 'Location error. ';
        switch(error.code) {
            case error.TIMEOUT:
                message += 'A timeout occured! Please try again!';
                break;
            case error.POSITION_UNAVAILABLE:
                message += 'We can\'t detect your location. Sorry!';
                break;
            case error.PERMISSION_DENIED:
                message += 'Please allow geolocation access for this to work.';
                break;
            case error.UNKNOWN_ERROR:
                message += 'An unknown error occured!';
                break;
        }
        fnError.call(this, message);
    }
}
