function showWeatherData() {
const apiKey = "e9e283f26df19db7acdbf7a884b4f460";

  const city = document.getElementById("cityInput").value.trim();

  if (!city) {
    alert("Введіть місто англійською мовою, наприклад: Kyiv");
    return;
  }

  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=metric&lang=ua`;

  const request = new XMLHttpRequest();
  request.open("GET", requestURL);
  request.responseType = "json";
  request.send();

  request.onload = function () {
    const weatherData = request.response;
    displayWeather(weatherData);
  };

  function displayWeather(data) {
    document.querySelector("main").innerHTML = ""; 

    if (data.cod !== 200) {
      const errorMsg = document.createElement("p");
      errorMsg.textContent = "Помилка: " + data.message;
      document.querySelector("main").append(errorMsg);
      return;
    }

    const cityName = document.createElement("h2");
    cityName.textContent = `Погода у ${data.name}, ${data.sys.country}`;
    document.querySelector("main").append(cityName);

    const temperature = document.createElement("p");
    temperature.textContent = `Температура: ${data.main.temp} °C`;
    document.querySelector("main").append(temperature);

    const description = document.createElement("p");
    description.textContent = `Опис: ${data.weather[0].description}`;
    document.querySelector("main").append(description);

    const humidity = document.createElement("p");
    humidity.textContent = `Вологість: ${data.main.humidity}%`;
    document.querySelector("main").append(humidity);

    const wind = document.createElement("p");
    wind.textContent = `Вітер: ${data.wind.speed} м/с`;
    document.querySelector("main").append(wind);
  }
}

