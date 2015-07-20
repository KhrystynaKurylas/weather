$(".button-collapse").sideNav();
$(function(){
    getWeatherDataDaily('ua', dataReceivedDaily, showErrorDaily);

    function dataReceivedDaily(data) {
        var offsetDaily= (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC  в мілісекундах
        var cityDaily = data.city.name;
        var countryDaily = data.city.country;

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offsetDaily); // конвертуємо час з UTC у локальний
            addWeatherDaily(
                this.weather[0].icon,
                moment(localTime).locale("uk").format('MMMM Do YYYY'),
                	// Використовуємо moment.js для представлення дати
                this.weather[0].description, Math.round(this.temp.day) + '&deg;C',Math.round(this.temp.night) +'&deg;C' ,this.speed + ' m/c', this.humidity + '%'
            );
        });
        $('#location').html(cityDaily + ', <b>' + countryDaily + '</b>'); // Додаємо локацію на сторінку
    }

    function addWeatherDaily(icon, day, condition, tempday,tempnight,speed, humidity){

        var markupDaily = '<tr>'+
                '<td>' + day + '</td>' +
                '<td>' + '<img src="assets/img/iconsDaily/'+ icon +'.png" />' + '</td>' +
                '<td>' + tempday + '</td>' +
                 '<td>' + tempnight + '</td>' +
                '<td>' + condition + '</td>'+
                '<td>' + speed + '</td>'+
                '<td>' + humidity + '</td>'
        + '</tr>';
        weatherTable.insertRow(-1).innerHTML = markupDaily; // Додаємо рядок до таблиці

    }

    function showErrorDaily(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
    $("tr").addClass("odd");
});
