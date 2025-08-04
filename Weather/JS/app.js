const input = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const cityName = document.getElementById("city-name");
const temp = document.getElementById("current-temp");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const weatherDescription = document.getElementById("weather-description");
const weatherIcon = document.getElementById("weather-icon");
const airQuality = document.getElementById("air-quality");
const currentDate = document.getElementById("current-date");

const getWeatherDetails = function (location) {
  const url = fetch(
    `http://api.weatherapi.com/v1/current.json?key=7305e901b7e84368bfe184928250208&q=${location}&aqi=yes`
  );
  fetch(`https://api.pexels.com/v1/search?query=${location}&per_page=1`, {
    headers: {
      Authorization: "QTtW869NwNUjNy4oOXjpSAxt4SKxlNeieDxMZYHg5lgg2CMmFcUCMkXW",
    },
  })
    .then((response) => {
      if(!response.ok){
        throw new Error (`City Image not Found ${response.status}`)
      }
      return response.json()
    })
    .then((data) => {
      console.log(data);
      const imageUrl = data.photos[0].src.original;
      document.body.style.backgroundImage = `url(${imageUrl})`;
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundRepeat = "no-repeat";
      document.body.style.backgroundPosition = "center";
      document.body.style.transition = "background-image 0.1s ease-in-out";
    })
    .catch((error) => {
      console.error("Error fetching Pexels image:", error);
    });

  url
    .then((name) => {
      if (!name.ok) {
        throw new Error(`City Name Not Found ${name.status}`);
      }
      return name.json();
    })
    .then((locationName) => {
      cityName.textContent = locationName.location.name;
      temp.textContent = `${locationName.current.temp_c}°C`;
      humidity.textContent = `${locationName.current.humidity}%`;
      windSpeed.textContent = `${locationName.current.wind_kph}km/h`;
      weatherDescription.textContent = `${locationName.current.condition.text}`;
      console.log(locationName);
    })
    .catch((err) => {
      console.error(err.message);
      alert(`Please Enter a Valid city name!`);
    });
};

searchButton.addEventListener("click", () => {
  const inputValue = input.value.trim();
  getWeatherDetails(inputValue);
  input.vale = "";
});
