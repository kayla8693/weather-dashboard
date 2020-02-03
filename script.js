var cityName = "Dallas" //$("#city").val();
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=a06d53a4d8132cb2c57dac5818e92924"

displayWeather();

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


    });
}
