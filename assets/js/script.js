      $(document).ready(function () {
        var carousel = $("#carousel").waterwheelCarousel({
         /*  flankingItems: 3,
          movingToCenter: function ($item) {
            $('#callback-output').prepend('movingToCenter: ' + $item.attr('id') + '<br/>');
          },
          movedToCenter: function ($item) {
            $('#callback-output').prepend('movedToCenter: ' + $item.attr('id') + '<br/>');
          },
          movingFromCenter: function ($item) {
            $('#callback-output').prepend('movingFromCenter: ' + $item.attr('id') + '<br/>');
          },
          movedFromCenter: function ($item) {
            $('#callback-output').prepend('movedFromCenter: ' + $item.attr('id') + '<br/>');
          },
          clickedCenter: function ($item) {
            $('#callback-output').prepend('clickedCenter: ' + $item.attr('id') + '<br/>');
          } */
        });

       /*  $('#prev').bind('click', function () {
          carousel.prev();
          return false
        });

        $('#next').bind('click', function () {
          carousel.next();
          return false;
        });

        $('#reload').bind('click', function () {
          newOptions = eval("(" + $('#newoptions').val() + ")");
          carousel.reload(newOptions);
          return false;
        }); */

      });

$(function(){
	var locale = 'ua',
		weatherDiv = $('#weather'),
		scroller = $('#scroller'),
		location = $('#location');
	$('#btnGetWeather').click(function () {
        getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });
    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }
    });    
    
   

	function dataReceived(data) {
		// Get the offset from UTC (turn the offset minutes into ms)
		var offset = (new Date()).getTimezoneOffset()*60*1000;
		var city = data.city.name;
		var country = data.city.country;

		$.each(data.list, function(){
			// "this" holds a forecast object
			// Get the local time of this forecast (the api returns it in utc)
			var localTime = new Date(this.dt*1000 - offset);
			addWeather(
				this.weather[0].icon,
				moment(localTime).locale("uk").calendar(),	// We are using the moment.js library to format the date
				this.weather[0].description + ' <b>' + Math.round(this.main.temp) + '°C' + '</b>'
			);
		});
		// Add the location to the page
        document.getElementById('location').style.display = 'block';
		location.html(city+', <b>'+country+'</b>');
		weatherDiv.addClass('loaded');
		// Set the slider to the first slide
		showSlide(0);
	}

	function addWeather(icon, day, condition){

		var image;
		switch(icon) {
			case '01d' :image='<div><div class="animated rotateInSun"><img src="assets/img/icons/sun.png" alt="sun"></div></div>';
				break;
			case '01n': image='<div><div id="moonRotate" class="animated rotateInMoon"><figure><img src="assets/img/icons/moon.png" alt="moon"></figure></div></div>';
				break;
			case '02d': image='<div><div class="animated rotateInSun"><img  src="assets/img/icons/sun.png" alt="sun"></div><img id="cloudmini" src="assets/img/icons/cloudmini.png" alt="cloud"></div>';
				break;
			case '02n':image='<div><img id="moon" src="assets/img/icons/moon.png" alt="moon"><figure class="animated fadeInLeft"><img src="assets/img/icons/cloudmini.png" alt="cloud"></figure></div>';
				break;
			case '03d':image='<div class="animated fadeInLeft"><figure><img src="assets/img/icons/cloudmini.png" alt="sun"></figure></div>';
			break;
			case '03n':image='<div class="animated fadeInLeft"><figure><img src="assets/img/icons/cloudmini.png" alt="sun"></figure></div>';
				break;
			case '04d':image='<div class="animated fadeInLeft"><figure><img src="assets/img/icons/clouds.png" alt="sun"></figure></div>';
				break;
			case '04n':image='<div class="animated fadeInLeft"><figure><img src="assets/img/icons/clouds.png" alt="sun"></figure></div>';
				break;
			case '09d':image='<div><img id="clouddrizzle" src="assets/img/icons/clouds.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/drizzle.png" alt="drizzle"></figure></div>';
				break;
			case '09n':image='<div><img id="clouddrizzle" src="assets/img/icons/clouds.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/drizzle.png" alt="drizzle"></figure></div>';
				break;
			case '10d':image='<div><img id="rain" src="assets/img/icons/cloudmax.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/rain.png" alt="rain"></figure></div>';
				break;
			case'10n':image='<div><img id="rain" src="assets/img/icons/cloudmax.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/rain.png" alt="rain"></figure></div>';
				break;
			case'11d':image='<div><img id="thunderstorm" src="assets/img/icons/thunderstorm.png" alt="thunderstorm"><figure class="animated fadeInDown"><img src="assets/img/icons/flash.png" alt="flash"></figure></div>';
				break;
			case '11n':image='<div><img id="thunderstorm" src="assets/img/icons/thunderstorm.png" alt="thunderstorm"><figure class="animated fadeInDown"><img src="assets/img/icons/flash.png" alt="flash"></figure></div>';
				break;
			case '13d':image='<div><img id="snow" src="assets/img/icons/clouds.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/snow.png" alt="snow"></figure></div>';
				break;
			case '13n':image='<div><img id="snow" src="assets/img/icons/clouds.png" alt="clouds"><figure class="animated fadeInDown"><img src="assets/img/icons/snow.png" alt="snow"></figure></div>';
				break;
			case'50d':image='<div><img id="fog" src="assets/img/icons/clouds.png" alt="cloud"><figure class="animated fadeInLeft"><img src="assets/img/icons/fog.png" alt="fog"> </figure></div>';
				break;
			case'50n':image='<div><img id="fog" src="assets/img/icons/clouds.png" alt="cloud"><figure class="animated fadeInLeft"><img src="assets/img/icons/fog.png" alt="fog"> </figure></div>';
				break;
		}
		var markup =  '<li>' + image + '<p class="day">'+ day +'</p>'+ '<p class="cond">'+ condition +'</p></li>';
		scroller.append(markup);

	}

	/* Handling the previous / next arrows */
	var currentSlide = 0;
	weatherDiv.find('a.previous').click(function(e){
		e.preventDefault();
		showSlide(currentSlide-1);
	});

	weatherDiv.find('a.next').click(function(e){
		e.preventDefault();
		showSlide(currentSlide+1);
	});

	// listen for arrow keys
	$(document).keydown(function(e){
		switch(e.keyCode){
			case 37:
				weatherDiv.find('a.previous').click();
				break;
			case 39:
				weatherDiv.find('a.next').click();
				break;
		}
	});

	function showSlide(i){
		var items = scroller.find('li');

		if (i >= items.length || i < 0 || scroller.is(':animated')){
			return false;
		}

		weatherDiv.removeClass('first last');

		if(i == 0){
			weatherDiv.addClass('first');
		}
		else if (i == items.length-1){
			weatherDiv.addClass('last');
		}

		scroller.animate({left:(-i*100)+'%'}, function(){
			currentSlide = i;
		});
	}

	/* Error handling functions */
	function showError(msg){
		weatherDiv.addClass('error').html(msg);
	}
});
