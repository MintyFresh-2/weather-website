const request = require("request");

const forecast = function (longitude, latitude, callback) {
  const url = `http://api.weatherstack.com/current?access_key=ccfcecd526713570b9f93b5473d6eee5&query=${latitude},${longitude}&units=m`;
  request({ url, json: true }, (error, { body: weatherInfo }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (weatherInfo.error) {
      callback("Unable to find location for weather");
    } else {
      callback(undefined, {
        locationName: weatherInfo.location.name,
        locationRegion: weatherInfo.location.region,
        locationCountry: weatherInfo.location.country,
        weatherDescription: weatherInfo.current.weather_descriptions[0],
        weatherTemp: weatherInfo.current.temperature,
        weatherFeelsLike: weatherInfo.current.feelslike,
        weatherWindSpeed: weatherInfo.current.wind_speed,
        weatherWindDegree: weatherInfo.current.wind_degree,
        weatherHumidity: weatherInfo.current.humidity,
        weatherPrecipitation: weatherInfo.current.precip,
        observationTime: weatherInfo.current.observation_time,
      });
    }
  });
};

module.exports = forecast;
