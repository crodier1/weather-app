$(document).ready(function() {
    var lat;
    var long;
  
    navigator.geolocation.getCurrentPosition(success, error);
    function success(pos) {
      var crd = pos.coords;
  
      console.log("Your current position is:");
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);
  
      lat = pos.coords.latitude;
      long = pos.coords.longitude;
    }
  
    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
  
        var api =
          "http://api.openweathermap.org/data/2.5/weather?lat=" +
          lat +
          "&lon=" +
          long +
          "&appid=5da73b78d73f631d8a18d27035e182f7";
  
        $.getJSON(api, function(data) {
          var city = data.name;
          var country = data.sys.country;
          var temp1 = Math.floor(9 / 5 * (data.main.temp - 273) + 32);
          var mainWeather = data.weather[0].main;
          var weatherDes = data.weather[0].description;
  
          $("#cityCountry").html(city + ", " + country);
          $("#temp").html(temp1 + "°F");
          $("#weather").html(mainWeather);
  
          if (weatherDes === "clear sky") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/01d.png'>"
            );
          } else if (weatherDes === "few clouds") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/02d.png'>"
            );
          } else if (weatherDes === "scattered clouds") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/03d.png'>"
            );
          } else if (weatherDes === "broken clouds") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/04d.png'>"
            );
          } else if (weatherDes === "shower rain") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/09d.png'>"
            );
          } else if (weatherDes === "rain") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/10d.png'>"
            );
          } else if (weatherDes === "thunderstorm") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/11d.png'>"
            );
          } else if (weatherDes === "snow") {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/13d.png'>"
            );
          } else if (weatherDes === "mist" || weatherDes === "haze" ) {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/50d.png'>"
            );
          } else {
            $("#icon").html(
              "<img src='http://openweathermap.org/img/w/03d.png'>"
            );
          }
        });
      });
    }
  });
  