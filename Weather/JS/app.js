const input = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("current-temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const airQuality = document.getElementById("air-quality");

const getWeatherDetails = function (location) {
  const url = fetch(
    `http://api.weatherapi.com/v1/current.json?key=7305e901b7e84368bfe184928250208&q=${location}&aqi=yes`
  );
  url
    .then((name) => {
        if(!name.ok){
            throw new Error(`City Name Not Found ${name.status}`)
        }
        return name.json()
    })
    .then((locationName) => {
        cityName.textContent = locationName.location.name;
        temp.textContent = `${locationName.current.temp_c}°C`;
        humidity.textContent = `${locationName.current.humidity}%`;
        windSpeed.textContent = `${locationName.current.wind_kph}km/h`;
        weatherDescription.textContent = `${locationName.current.condition.text}`;
        console.log(locationName);  
    })
    .catch(err => {
        console.error(err.message)
        alert(`Please Enter a Valid city name!`);
    })
};

searchButton.addEventListener("click", () => {
  const inputValue = input.value.trim();
  getWeatherDetails(inputValue);
  input.vale = "";
});
