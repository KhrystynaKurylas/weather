function getWeatherData(lang, fnOK) {
  function locSuccess(lang,city) {
        // Check cache
        var cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
        var currDate = new Date();
        // If the cache is newer than 30 minutes, use the cache
        if(cache && cache.timestamp && cache.timestamp > currDate.getTime() - 30*60*1000){
            fnOK.call(this, cache.data);
        } else {
            $.getJSON(
               'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=metric&city.name&city.country&lang='+lang+'uk&callback=?&appid=9649c92439ade00fa8117dec4613064b',
                function (response) {
                    // Store the cache
                    localStorage.weatherCache = JSON.stringify({
                        timestamp: (new Date()).getTime(),	// getTime() returns milliseconds
                        data: response
                    });
                    // Call the function again
                    locSuccess(lang,city);
                }
            );
        }
    }
 
}
