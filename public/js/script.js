const weatherForm = document.querySelector("form");
const addressInput = document.querySelector("input");
const forecastMessage = document.getElementById("forecast");
const errorMessage = document.getElementById("error");
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  forecastMessage.textContent = "Loading...";
  fetch(`/weather?address=${addressInput.value}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        forecastMessage.textContent = "";
        return (errorMessage.textContent = data.error);
      }
      errorMessage.textContent = "";
      forecastMessage.textContent = `${data.locationName}, ${data.locationRegion}, ${data.locationCountry}:
        ${data.weatherDescription}. It is currently ${data.weatherTemp} degrees but it feels like ${data.weatherFeelsLike}. There is a ${data.weatherPrecipitation}% chance of precipitation. The wind speed is ${data.weatherWindSpeed}km/h (As of ${data.observationTime})`;
      console.log(data);
    });
  });
});
