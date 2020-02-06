// empty array for cities; cities will be pushed into array upon search
var cityList = [];

// dates for current weather and forcast
var a = moment();
var b = a.clone().add(1, 'day');
var c = a.clone().add(2, 'day');
var d = a.clone().add(3, 'day');
var e = a.clone().add(4, 'day');
var f = a.clone().add(5, 'day');

var date = a.format('MM/DD/YYYY');
var day1 = b.format('MM/DD/YYYY');
var day2 = c.format('MM/DD/YYYY');
var day3 = d.format('MM/DD/YYYY');
var day4 = e.format('MM/DD/YYYY');
var day5 = f.format('MM/DD/YYYY');

// enter button triggers search click
$('#cityInput').keypress(function (e) {
    var key = e.which;
    if (key == 13) {
        $('#search').click();
        return false;
    }
});

// renderCitiesSearched();

// ajax call for current weather
function displayWeather() {

    var cityName = $(this).attr('data-name');
    console.log(this)
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=a06d53a4d8132cb2c57dac5818e92924"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        // converts temp to F and rounds temp to nearest #; adds weather icon
        var tempF = Math.round(((response.main.temp - 273.15) * 9 / 5 + 32));
        var iconURL = "https://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png";
        var icon = $('<img>').attr('src', iconURL);

        // pulling info from response and setting text in divs
        $(".city").html("<h4>" + response.name + ", " + response.sys.country + " (" + date + ")" + "</h4>");
        $('.iconBox').empty();
        $('.iconBox').append(icon);
        icon.addClass('img1')
        $(".temp").text("Temperature: " + tempF + " F");
        $(".humidity").text("Humidity: " + response.main.humidity + "%");
        $(".windSpeed").text("Wind Speed: " + response.wind.speed + " MPH");

        // uv ajax pull using coordinates from above respnse
        function displayUV() {

            var lat = response.coord.lat;
            var lon = response.coord.lat;
            var uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=a06d53a4d8132cb2c57dac5818e92924&lat=" + lat + "&lon=" + lon

            $.ajax({
                url: uvURL,
                method: "GET"
            }).then(function (response) {
                var uv = response.value;
                var uvBox = $(".uvBox");

                $(".uvIndex").text("UV Index: ");
                uvBox.text(uv)

                // sets color of uvBox based on uv #
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

                else if (uv > 5.999 && uv < 8) {
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

        // 5-day forcast ajax call
        function displayForcast() {
            var country = response.sys.country;
            var forcastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "," + country + "&appid=a06d53a4d8132cb2c57dac5818e92924";

            $.ajax({
                url: forcastURL,
                method: "GET"
            }).then(function (response) {
                console.log(response);
                // converting temps to F and rounding; pulling from each temp, humidity, icon from same time each day
                var temp1 = Math.round(((response.list[2].main.temp - 273.15) * 9 / 5 + 32));
                var temp2 = Math.round(((response.list[10].main.temp - 273.15) * 9 / 5 + 32));
                var temp3 = Math.round(((response.list[18].main.temp - 273.15) * 9 / 5 + 32));
                var temp4 = Math.round(((response.list[26].main.temp - 273.15) * 9 / 5 + 32));
                var temp5 = Math.round(((response.list[34].main.temp - 273.15) * 9 / 5 + 32));
                var icon1URL = "https://openweathermap.org/img/wn/" + response.list[2].weather[0].icon + "@2x.png";
                var icon2URL = "https://openweathermap.org/img/wn/" + response.list[10].weather[0].icon + "@2x.png";
                var icon3URL = "https://openweathermap.org/img/wn/" + response.list[18].weather[0].icon + "@2x.png";
                var icon4URL = "https://openweathermap.org/img/wn/" + response.list[26].weather[0].icon + "@2x.png";
                var icon5URL = "https://openweathermap.org/img/wn/" + response.list[34].weather[0].icon + "@2x.png";

                // empty day1 div first, then setting text info for day1
                $('#day1').empty();
                var date1 = $('<h6>').text(day1);
                var icon1 = $('<img>').attr('src', icon1URL);
                icon1.addClass('img1');
                $('#day1').addClass('rounded');
                $('#day1').attr('style', 'background-color: red');
                var temp1Div = $('<p>').text("Temp: " + temp1 + " F");
                var humid1 = $('<p>').text("Humidity: " + response.list[2].main.humidity + "%");

                $('#day1').append(date1);
                $('#day1').append(icon1);
                $('#day1').append(temp1Div);
                $('#day1').append(humid1);

                // Day2
                $('#day2').empty();
                var date2 = $('<h6>').text(day2);
                var icon2 = $('<img>').attr('src', icon2URL)
                icon2.addClass('img1');
                $('#day2').addClass('rounded');
                $('#day2').attr('style', 'background-color: #037EFC');
                var temp2Div = $('<p>').text("Temp: " + temp2 + " F");
                var humid2 = $('<p>').text("Humidity: " + response.list[10].main.humidity + "%");

                $('#day2').append(date2);
                $('#day2').append(icon2);
                $('#day2').append(temp2Div);
                $('#day2').append(humid2);

                // Day3
                $('#day3').empty();
                var date3 = $('<h6>').text(day3);
                var icon3 = $('<img>').attr('src', icon3URL)
                icon3.addClass('img1');
                $('#day3').addClass('rounded');
                $('#day3').attr('style', 'background-color: #037EFC');
                var temp3Div = $('<p>').text("Temp: " + temp3 + " F");
                var humid3 = $('<p>').text("Humidity: " + response.list[18].main.humidity + "%");

                $('#day3').append(date3);
                $('#day3').append(icon3);
                $('#day3').append(temp3Div);
                $('#day3').append(humid3);

                // Day4
                $('#day4').empty();
                var date4 = $('<h6>').text(day4);
                var icon4 = $('<img>').attr('src', icon4URL)
                icon4.addClass('img1');
                $('#day4').addClass('rounded');
                $('#day4').attr('style', 'background-color: #037EFC');
                var temp4Div = $('<p>').text("Temp: " + temp4 + " F");
                var humid4 = $('<p>').text("Humidity: " + response.list[26].main.humidity + "%");

                $('#day4').append(date4);
                $('#day4').append(icon4);
                $('#day4').append(temp4Div);
                $('#day4').append(humid4);

                // Day5
                $('#day5').empty();
                var date5 = $('<h6>').text(day5);
                var icon5 = $('<img>').attr('src', icon5URL)
                icon5.addClass('img1');
                $('#day5').addClass('rounded');
                $('#day5').attr('style', 'background-color: #037EFC');
                var temp5Div = $('<p>').text("Temp: " + temp5 + " F");
                var humid5 = $('<p>').text("Humidity: " + response.list[34].main.humidity + "%");

                $('#day5').append(date5);
                $('#day5').append(icon5);
                $('#day5').append(temp5Div);
                $('#day5').append(humid5);

            });
        };
        // calling functions
        displayUV();
        displayForcast();
    });
};

// creates city buttons
function renderButtons() {

    $('#cities').empty();

    for (var i = 0; i < cityList.length; i++) {
        var a = $('<button>');
        a.addClass('cityBtn')
        a.attr('data-name', cityList[i]);
        a.text(cityList[i].toUpperCase());
        $("#cities").prepend(a);
    // adds attr dat-name to search, allowing weather to pop-up on search command
        var search = $('#search');
        search.attr('data-name', cityList[i]);
        
    // sets cities into local storage
        localStorage.setItem('city', cityList[i]);
        localStorage.setItem('citiesSearched', cityList);
    };

    // clears cityList array and list of displayed cities
    $('.clear').removeClass('hide');
    $('.clear').on('click', function () {
        $('#cities').empty();
        cityList = [];
        $('.clear').addClass('hide');

    });
};

// upon clicking search btn, city pushed to array and renderButtons function called
$("#search").on("click", function (event) {
    event.preventDefault();

    var city = $("#cityInput").val().trim();
    cityList.push(city);
    console.log(cityList);
    renderButtons();
});

// function to display buttons when page refreshed
function renderCitiesSearched() {
    var newCityList = localStorage.getItem('citiesSearched')
    // turns newCityList into array
    var newList = newCityList.split(",");

    for (var i = 0; i < newList.length; i++) {
        
        var a = $('<button>');
        a.addClass('cityBtn')
        a.attr('data-name', newList[i]);
        a.text(newList[i].toUpperCase());
        $("#cities").prepend(a);
    };
};
renderCitiesSearched();



// upon click of any btn w cityBtn class, displayWeather function called
$(document).on('click', '.cityBtn', displayWeather);
$(document).on('click', '#search', displayWeather);