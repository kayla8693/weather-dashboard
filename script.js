var cityName = "Dallas" //$("#city").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=a06d53a4d8132cb2c57dac5818e92924"



displayWeather();
// displayUV();

function displayWeather() {


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);


        var tempF = Math.round(((response.main.temp - 273.15) * 9/5 + 32));

        $(".city").html("<h2>" + response.name + ", " + response.sys.country + "</h2>");
        $(".temp").text("Temperature: " + tempF + " F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");



        function displayUV() {

            var lat = response.coord.lat;
            var lon = response.coord.lat;
            var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=a06d53a4d8132cb2c57dac5818e92924&lat=" + lat + "&lon=" + lon

            console.log(lat)

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                var uv = response.value;
                var uvBox = $(".uvBox");

                $(".uvIndex").text("UV Index: ");
                uvBox.text(uv)

                if (uv < 3) {
                    $(".uvBox").attr(
                        'style', 
                        'background-color: green'
                    )
                }

                else if (uv > 2.999 & uv < 6) {
                    uvBox.attr({
                        style: 'background-color: yellow; color: black'
                    })
                }

                else if ( uv > 5.999 && uv < 8) {
                    uvBox.attr(
                        'style',
                        'background-color: orange'
                    )
                }

                else if (uv > 7.999 && uv < 11) {
                    uvBox.attr(
                        'style',
                        'background-color: red'
                    )
                }

                else if (uv > 10.999) {
                    uvBox.attr(
                        'style',
                        'background-color: purple'
                    )
                };
            });
        };

        displayUV();

    });
}

