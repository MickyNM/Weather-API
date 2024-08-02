$(document).ready(function () {

    $("#city").change(function () {

        var grad = $(this).val();
        $.ajax({
            url: "http://api.weatherapi.com/v1/forecast.json",
            method: "GET",
            data: {
                key: "be1112578887462eab623739240607",
                q: grad,
                days: 3,
                aqi: "yes",
                alerts: "yes",
                lang: "sr",
            },

            success: function (response) {
                var dan = response.current.is_day;
                var code = response.current.condition.code;

                if (dan == 0) {
                    switch (code) {
                        case 1000:
                            var slika = "/images/night/clear_night.png";//clear/sunny
                            break;
                        case 1003:
                            var slika = "/images/night/partly_cloudy_night.png";//partly cloudy
                            break;
                        case 1006:
                            var slika = "/images/night/cloudy_night.png";// cloudy
                            break;
                        case 1009:
                            var slika = "/images/night/cloudy_night.png";// cloudy
                            break;
                        case 1030:
                            var slika = "/images/night/mist.png";// mist
                            break;
                        case 1063:
                            var slika = "/images/night/rainy_night.png";//Patchy rain nearby
                            break;
                        case 1087:
                            var slika = "/images/night/storm_night.png";// Thundery outbreaks possible
                            break;
                        case 1135:
                            var slika = "/images/fog.png";// fog
                            break;
                        case 1180:
                            var slika = "/images/night/lite_rain.png";// light rain
                            break;
                        case 1240:
                            var slika = "/images/night/lite_rain.png";//Light rain shower
                            break;
                    }
                } else {
                    switch (code) {
                        case 1000:
                            var slika = "/images/day/sunny.png";//clear/sunny
                            break;
                        case 1003:
                            var slika = "/images/day/patchy_cloudy.png";//partly cloudy
                            break;
                        case 1006:
                            var slika = "/images/day/patchy_rain_nearby.png";// cloudy
                            break;
                        case 1009:
                            var slika = "/images/day/patchy_rain_nearby.png";// cloudy
                            break;
                        case 1063:
                            var slika = "/images/day/partly_rainy.png";//Patchy rain nearby
                            break;
                        case 1135:
                            var slika = "/images/fog.png";// fog
                            break;
                        case 1240:
                            var slika = "/images/day/lite_rain.png";//Light rain shower
                            break;
                        case 1243:
                            var slika = "/images/day/stormy.png";//Moderate or heavy rain shower
                            break;
                        case 1273:
                            var slika = "/images/day/storm.png";//Patchy light rain with thunder
                            break;
                        case 1276:
                            var slika = "/images/day/heavy_rain.png";//Moderate or heavy rain with thunder
                            break;
                    }
                }


                $(".currentTemp, .description, .tMax, .tMin, .date, #now_0, #now_1, #now_2, #now_3, #now_4, .image").empty();

                $(".date").append(response.location.localtime + " h");
                $(".currentTemp").append(Math.round(response.current.temp_c) + " ℃");
                $(".description").append(response.current.condition.text); // '<img src=" ' + response.current.condition.icon + ' "/>');
                $(".tMin").append("min: " + Math.round(response.forecast.forecastday[0].day.mintemp_c) + " ℃");
                $(".tMax").append("max: " + Math.round(response.forecast.forecastday[0].day.maxtemp_c) + " ℃");
                $(".image").append('<img src= " ' + slika + ' " />');


                $("#now_0, #now_1, #now_2, #now_3, #now_4").empty();
                var currentTime = parseInt(response.location.localtime.slice(10, 13));

                for (var i = 0; i < 5; i++) {
                    var time = (currentTime + i) % 24;

                    // $("#now_" + i).append(time + ":00h" + "<br>");

                    if (time == 12) {
                        $("#now_" + i).append(time + " PM" + '<br/>')
                    } else if (time > 12) {
                        $("#now_" + i).append(time - 12 + " PM" + '<br/>')
                    } else {
                        $("#now_" + i).append(time + " AM" + '<br/>')
                    }

                    $("#now_" + i).append('<img src= " ' + slika + ' " />'+ '<br/>');
                    // $("#now_" + i).append('<img src=" ' + response.forecast.forecastday[0].hour[time].condition.icon + ' "/>');
                    // $("#now_" + i).append(response.forecast.forecastday[0].hour[time].humidity + " %" + "<br>");
                    $("#now_" + i).append(Math.round(response.forecast.forecastday[0].hour[time].temp_c) + " ℃");

                }

                $(".weekly").click(function () {
                    $("#now_0, #now_1, #now_2, #now_3, #now_4").empty();
                    this.style.color = '#ffffff';
                    this.style.fontSize = '18px';

                    for (var i = 0; i < 3; i++) {
                        var code = response.forecast.forecastday[i].day.condition.code;

                        switch (code) {
                            case 1000:
                                var slika = "/images/day/sunny.png";//clear/sunny
                                break;
                            case 1003:
                                var slika = "/images/day/patchy_cloudy.png";//partly cloudy
                                break;
                            case 1006:
                                var slika = "/images/day/patchy_rain_nearby.png";// cloudy
                                break;
                            case 1063:
                                var slika = "/images/day/partly_rainy.png";//Patchy rain nearby
                                break;
                            case 1135:
                                var slika = "/images/fog.png";// fog
                                break;
                            case 1189:
                                var slika = "/images/day/lite_rain.png";
                                break;
                            case 1240:
                                var slika = "/images/day/lite_rain.png";//Light rain shower
                                break;
                            case 1243:
                                var slika = "/images/day/stormy.png";//Moderate or heavy rain shower
                                break;
                            case 1273:
                                var slika = "/images/day/storm.png";//Patchy light rain with thunder
                                break;
                            case 1276:
                                var slika = "/images/day/heavy_rain.png";//Moderate or heavy rain with thunder
                                break;
                        }

                        $("#now_" + i).append(response.forecast.forecastday[i].date.slice(5, 10)+ '<br/>')
                        $("#now_" + i).append('<img src= " ' + slika + ' " />'+ '<br/>');
                        $("#now_" + i).append("˅ " + Math.round(response.forecast.forecastday[i].day.mintemp_c) + "℃" + '<br/>');
                        $("#now_" + i).append("˄ " + Math.round(response.forecast.forecastday[i].day.maxtemp_c) + "℃");
                    }
                });


                $(".hourly").click(function () {
                    // var code = response.current.condition.code;
                    $("#now_0, #now_1, #now_2, #now_3, #now_4").empty();
                    this.style.color = '#ffffff';
                    this.style.fontSize = '18px';

                    for (var i = 0; i < 5; i++) {
                        var time = (currentTime + i) % 24;

                        if (time == 12) {
                            $("#now_" + i).append(time + " PM" + '<br/>')
                        } else if (time > 12) {
                            $("#now_" + i).append(time - 12 + " PM" + '<br/>')
                        } else {
                            $("#now_" + i).append(time + " AM" + '<br/>')
                        }

                        $("#now_" + i).append('<img src= " ' + slika + ' " />');
                        $("#now_" + i).append(Math.round(response.forecast.forecastday[0].hour[time].temp_c) + " ℃");
                    }
                });
            }
        });
    });

    $(".hour").click(function () {
        window.location.href = "http://localhost:63342/%2316%20Domaci/page_2/index2.html?_ijt=3v0u5qgm99jefcbkvh6p1pk7sj&_ij_reload=RELOAD_ON_SAVE";
    })

});