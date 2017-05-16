function getWeatherByCity(lang, fnOK, fnError, cityName) {
    $.getJSON(
        'http://api.openweathermap.org/data/2.5/forecast?q=' 
        + cityName + '&APPID=9649c92439ade00fa8117dec4613064b&units=metric' + '&lang=' + lang + '&callback=?',
        function (data) {
            fnOK.call(this, data);
        }
    );
}
