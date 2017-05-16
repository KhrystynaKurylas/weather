
(function() {
	getWeatherData();
function getWeatherData(lang, fnOK, fnError) {
    navigator.geolocation.getCurrentPosition(locSuccess, locError);

    function locSuccess(position) {
        // Check cache
        var cache = localStorage.weatherCache && JSON.parse(localStorage.weatherCache);
        var currDate = new Date();
        // If the cache is newer than 30 minutes, use the cache
        if(cache && cache.timestamp && cache.timestamp > currDate.getTime() - 30*60*1000){
            fnOK.call(this, cache.data);
        } else {
            $.getJSON(
               'http://api.openweathermap.org/data/2.5/forecast?lat=' +position.coords.latitude+ '&lon=' +position.coords.longitude+ '&cnt=16&units=metric&lang=uk&callback=?&appid=9649c92439ade00fa8117dec4613064b',
                function (response) {
                    // Store the cache
                    localStorage.weatherCache = JSON.stringify({
                        timestamp: (new Date()).getTime(),	// getTime() returns milliseconds
                        data: response
                    });
                    // Call the function again
                    locSuccess(position);
                }
            );
        }
    }
		function locError() {
			var defCity = "Lviv";
			getWeatherByCity16('ua', defCity);
		}
		function getWeatherByCity16(lang, city) {
		$.getJSON('http://api.openweathermap.org/data/2.5/forecast/daily?q=' + city +
			'&units=metric&cnt=7&appid=9649c92439ade00fa8117dec4613064b&lang=' + lang + '&callback=?',

			);
    
}
}
}
);



	
