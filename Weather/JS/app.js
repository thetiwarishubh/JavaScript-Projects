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

// Function to map AQI index to descriptive label and color
const getAqiDescription = (aqiIndex) => {
  const aqiLevels = {
    1: { label: "Good", color: "text-green-400" },
    2: { label: "Moderate", color: "text-yellow-400" },
    3: { label: "Unhealthy for Sensitive Groups", color: "text-orange-400" },
    4: { label: "Unhealthy", color: "text-red-400" },
    5: { label: "Very Unhealthy", color: "text-purple-400" },
    6: { label: "Hazardous", color: "text-red-600" },
  };
  return aqiLevels[aqiIndex] || { label: "Unknown", color: "text-gray-400" };
};

const dateTime = function () {
  const dates = new Date();
  const dayIndex = dates.getDay();
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayName = days[dayIndex];
  const date = dates.getDate();
  const monthIndex = dates.getMonth();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[monthIndex];
  const hour = dates.getHours() || 12;
  const minute = dates.getMinutes().toString().padStart(2, "0");
  const seconds = dates.getSeconds().toString().padStart(2, "0");
  const ampm = dates.getHours() >= 12 ? "PM" : "AM";
  currentDate.textContent = `${dayName}, ${date} ${monthName} [${hour}:${minute}:${seconds} ${ampm} IST]`;
};
setInterval(() => {
  dateTime();
}, 1000); // Changed to 1000ms (1 second) for smoother updates
dateTime();

const getWeatherDetails = function (location) {
  const weatherUrl = fetch(
    `http://api.weatherapi.com/v1/current.json?key=7305e901b7e84368bfe184928250208&q=${location}&aqi=yes`
  );
  fetch(`https://api.pexels.com/v1/search?query=${location}&per_page=1`, {
    headers: {
      Authorization: "QTtW869NwNUjNy4oOXjpSAxt4SKxlNeieDxMZYHg5lgg2CMmFcUCMkXW",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`City Image not Found ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      const imageUrl = data.photos[0]?.src.original;
      if (imageUrl) {
        document.body.style.backgroundImage = `url(${imageUrl})`;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundPosition = "center";
        document.body.style.transition = "background-image 0.1s ease-in-out";
      }
    })
    .catch((error) => {
      console.error("Error fetching Pexels image:", error);
    });

  weatherUrl
    .then((response) => {
      if (!response.ok) {
        throw new Error(`City Name Not Found ${response.status}`);
      }
      return response.json();
    })
    .then((locationName) => {
      cityName.textContent = locationName.location.name;
      temp.textContent = `${locationName.current.temp_c}°C`;
      humidity.textContent = `${locationName.current.humidity}%`;
      windSpeed.textContent = `${locationName.current.wind_kph} km/h`;
      weatherDescription.textContent = `${locationName.current.condition.text}`;

      const aqiIndex = locationName.current.air_quality["us-epa-index"];
      const aqiInfo = getAqiDescription(aqiIndex);
      airQuality.textContent = aqiInfo.label;
      airQuality.className = `font-bold text-lg ${aqiInfo.color}`; // Apply color class
      console.log(locationName);
    })
    .catch((err) => {
      console.error(err.message);
      alert(`Please Enter a Valid city name!`);
    });
};

searchButton.addEventListener("click", () => {
  const inputValue = input.value.trim();
  if (inputValue) {
    getWeatherDetails(inputValue);
    input.value = "";
  } else {
    alert("Please enter a city name!");
  }
});
