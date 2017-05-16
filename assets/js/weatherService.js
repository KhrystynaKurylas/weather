function getWeatherData() {
  function locSuccess(lang,city) {
                    $.getJSON(
               'http://api.openweathermap.org/data/2.5/forecast?q='+city+'&units=metric&city.name&city.country&lang='+lang+'uk&callback=?&appid=9649c92439ade00fa8117dec4613064b',
           
                    
               
            );
        }
    }
 

