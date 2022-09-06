var fetchButton = document.getElementById("fetch-button");
var placesearch = document.getElementById("place-input");
var citydataArray = [];
var day = new Date().toLocaleDateString();
var cityList = document.querySelector("#list-for-cities");

apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

fetchButton.addEventListener("click", getcityApi);

function getcityApi(city) {
  var placesearchValue = document.getElementById("place-input").value || city;

  var requestUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    placesearchValue +
    "&limit=1&appid=d91f911bcf2c0f925fb6535547a5ddc9";

  console.log(requestUrl);

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      for (var i = 0; i < data.length; i++) {
        var lat = data[i].lat;
        var lon = data[i].lon;

        console.log(lat);
        console.log(lon);

        var urlforcityData =
          "https://api.openweathermap.org/data/2.5/onecall?lat=" +
          lat +
          "&lon=" +
          lon +
          "&exclude=minutely,hourly,&units=metric&appid=d91f911bcf2c0f925fb6535547a5ddc9";

        fetch(urlforcityData)
          .then(function (response) {
            return response.json();
          })

          .then(function (data) {
            console.log(data);
            var day = new Date().toLocaleDateString();
            var cityandDate = document.querySelector("#city-and-date");
            cityandDate.innerHTML = `${placesearchValue} (${day})`;
            console.log(placesearchValue);
            // localStorage.setItem('city', placesearchValue);
            var temp = document.querySelector("#temp");
            temp.innerHTML = `Temp: ${data.current.temp}C`;

            var windSpeed = document.querySelector("#wind");
            windSpeed.innerHTML = `Wind Speed: ${data.current.wind_speed}mph`;

            var humidity = document.querySelector("#humidity");
            humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
            var uvi = data.current.uvi;
            var uv = document.querySelector("#uv");
            if (uvi < 3) {
              uv.style.color = "green";
            } else if (uvi < 7) {
              uv.style.color = "yellow";
            } else {
              uv.style.color = "red";
            }

            uv.innerHTML = `UV: ${data.current.uvi}`;

            var city = placesearch.value;
            historyButton(city);