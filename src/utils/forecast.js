const request = require("request");

const forecast = (latitude, longitude, units, callback) => {
  const apiKey = "af05fc88d2afdc6656d063c4bf241a67";

  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      return callback("Unable to connect to weather service!", undefined);
    }
    if (response.body.cod !== "200") {
      return callback("Unable to find location", undefined);
    }

    const forecastData = response.body.list[0]; // next 3-hour forecast

    const description = forecastData.weather[0].description;
    const temperature = forecastData.main.temp;
    const feels_like = forecastData.main.feels_like;
    const icon = forecastData.weather[0].icon;
    const rain = forecastData.rain ? forecastData.rain["3h"] : 0;

    if (units === "metric") {
      callback(undefined, {
        description,
        temperature,
        feels_like,
        icon,
        rain,
        unit: "°C",
      });
    } else if (units === "imperial") {
      callback(undefined, {
        description,
        temperature,
        feels_like,
        icon,
        rain,
        unit: "°F",
      });
    }
  });
};

module.exports = forecast;
