$(document).ready(function () {
    var grad = ["Belgrade", "Subotica", "Leskovac"];

    for (var i = 0; i < 3; i++) {
        (function (i) {
            $.ajax({
                url: "https://api.weatherapi.com/v1/forecast.json",
                method: "GET",
                data: {
                    key: "be1112578887462eab623739240607",
                    q: grad[i],
                    days: 1,
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

                    $(".img" + i).append('<img src= " ' + slika + ' " />');
                    $(".city" + i).append(response.location.name + "/ " + response.location.country + "<br>");
                    $(".currentTempForCity" + i).append(Math.round(response.current.temp_c) + " ℃" + "<br>");
                    $(".descriptionForCity" + i).append(response.current.condition.text + "<br>");
                    $(".tMinForCity" + i).append("min: " + Math.round(response.forecast.forecastday[0].day.mintemp_c) + "℃");
                    $(".tMaxForCity" + i).append("max: " + Math.round(response.forecast.forecastday[0].day.maxtemp_c) + "℃");
                    // }
                }
            });
        })(i);
    }
});