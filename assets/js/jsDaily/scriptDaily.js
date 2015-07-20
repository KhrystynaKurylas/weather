$(".button-collapse").sideNav();
$(function(){
    getWeatherDataDaily('ua', dataReceivedDaily, showErrorDaily);

    function dataReceivedDaily(data) {
        var offsetDaily= (new Date()).getTimezoneOffset()*60*1000; // ³�������� �� UTC  � ����������
        var cityDaily = data.city.name;
        var countryDaily = data.city.country;

        $.each(data.list, function(){
            // "this" ����� ��'��� �������� �����: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offsetDaily); // ���������� ��� � UTC � ���������
            addWeatherDaily(
                this.weather[0].icon,
                moment(localTime).locale("uk").format('MMMM Do YYYY'),
                	// ������������� moment.js ��� ������������� ����
                this.weather[0].description, Math.round(this.temp.day) + '&deg;C',Math.round(this.temp.night) +'&deg;C' ,this.speed + ' m/c', this.humidity + '%'
            );
        });
        $('#location').html(cityDaily + ', <b>' + countryDaily + '</b>'); // ������ ������� �� �������
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
        weatherTable.insertRow(-1).innerHTML = markupDaily; // ������ ����� �� �������

    }

    function showErrorDaily(msg){
        $('#error').html('������� �������: ' + msg);
    }
    $("tr").addClass("odd");
});
