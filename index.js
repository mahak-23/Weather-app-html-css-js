function refreshWeather() {
    let apiKey = "8261a1ff336765372a9466758d99d994";
    let cityName = document.getElementById('location').innerHTML; // Get current city name

    // Get a new city name from the user
    cityName = prompt("Enter a city name:");

    if (cityName) {
        let link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        var request = new XMLHttpRequest();
        request.open('GET', link, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var obj = JSON.parse(this.response);
                console.log(obj);

                document.getElementById('weather').innerHTML = obj.weather[0].description;
                document.getElementById('location').innerHTML = obj.name;
                document.getElementById('temp').innerHTML = Math.round(obj.main.temp - 273.15);
                document.getElementById('mintemp').innerHTML = Math.round(obj.main.temp_min - 273.15);
                document.getElementById('maxtemp').innerHTML = Math.round(obj.main.temp_max - 273.15);

                document.getElementById('icon').src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
            } else {
                console.log("The city data is not available");
            }
        }
        request.send();
    }
}

function getCurrentLocationWeather() {
    let apiKey = "8261a1ff336765372a9466758d99d994";

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }

    function successCallback(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        let link = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
        var request = new XMLHttpRequest();
        request.open('GET', link, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var obj= JSON.parse(this.response);
                console.log(obj);                    document.getElementById('weather').innerHTML = obj.weather[0].description;
                document.getElementById('location').innerHTML = obj.name;
                document.getElementById('temp').innerHTML = Math.round(obj.main.temp - 273.15);
                document.getElementById('mintemp').innerHTML = Math.round(obj.main.temp_min - 273.15);
                document.getElementById('maxtemp').innerHTML = Math.round(obj.main.temp_max - 273.15);
                document.getElementById('icon').src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
            } else {
                console.log("The city data is not available");
            }
        }
        request.send();
    }

    function errorCallback(error) {
        console.log("Error getting current position:", error);
        console.log("Defaulting to the weather for", cityName);

        let link = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
        var request = new XMLHttpRequest();
        request.open('GET', link, true);
        request.onload = function () {
            if (request.status >= 200 && request.status < 400) {
                var obj = JSON.parse(this.response);
                console.log(obj);

                document.getElementById('weather').innerHTML = obj.weather[0].description;
                document.getElementById('location').innerHTML = obj.name;
                document.getElementById('temp').innerHTML = Math.round(obj.main.temp - 273.15);
                document.getElementById('mintemp').innerHTML = Math.round(obj.main.temp_min - 273.15);
                document.getElementById('maxtemp').innerHTML = Math.round(obj.main.temp_max - 273.15);
                document.getElementById('icon').src = "https://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
            } else {
                console.log("The city data is not available");
            }
        }
        request.send();
    }

}

// Initial weather request on page load
getCurrentLocationWeather();