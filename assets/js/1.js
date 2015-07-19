function addWeather( icon , day, condition){
    var markup;
    markup = '<li>' +
    function swichIcons (icon){
        var text;
        switch(icon) {
            case '01d' : text='<div class="animated rotateInSun"><img src="assets/img/icons/sun.png" alt="sun"></div>';
                break;
            case '01n': text='<div class="animated rotateInMoon"><figure><img src="assets/img/icons/moon.png" alt="moon"></figure></div>';
                break;
            case '02d': text='<div><div class="animated rotateInSun"><img  src="assets/img/icons/sun.png" alt="sun"></div><img id="cloudmini" src="assets/img/icons/cloudmini.png" alt="cloud"></div>';
                break;
            case '02n':text='<div><img id="moon" src="assets/img/icons/moon.png" alt="moon"><figure class="animated fadeInLeft"><img src="assets/img/icons/cloudmini.png" alt="cloud"></figure></div>';
                break;
            case '03d'||'03n':text='<div class="animated fadeInLeft"><figure><img src="assets/img/icons/cloudmini.png" alt="sun"></figure></div>';
                break;
            case '04d'||'04n':text='<div class="animated fadeInLeft"><figure><img src="assets/img/icons/clouds.png" alt="sun"></figure></div>';
                break;
            case'09d'||'09n':text='<div><img id="clouddrizzle" src="assets/img/icons/clouds.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/drizzle.png" alt="drizzle"></figure></div>';
                break;
            case'10d'||'10n':text='<div><img id="rain" src="assets/img/icons/cloudmax.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/rain.png" alt="rain"></figure></div>';
                break;
            case'11d'||'11n':text='<div><img id="thunderstorm" src="assets/img/icons/thunderstorm.png" alt="thunderstorm"><figure class="animated fadeInDown"><img src="assets/img/icons/flash.png" alt="flash"></figure></div>';
                break;
            case'13d'||'13n':text='<div><img id="snow" src="assets/img/icons/clouds.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/snow.png" alt="snow"></figure></div>';
                break;
            case'50d'||'50n':text='<div><img id="fog" src="assets/img/icons/clouds.png" alt="cloud"><figure class="animated fadeInLeft"><img src="assets/img/icons/fog.png" alt="fog"> </figure></div>';
                break;
        }
    }+
    ' <p class="day">'+ day +'</p> <p class="cond">'+ condition +
    '</p></li>';

    scroller.append(markup);
}
if( icon ='01d' ) { text='<div class="animated rotateInSun"><img src="assets/img/icons/sun.png" alt="sun"></div>';};