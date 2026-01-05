console.log("Client side JavaScript");
// Units Selection
let selectedUnits = "metric";

const weatherForm = document.querySelector("#weather-form");
const userSearch = document.querySelector("#address-input");

const iconSpan = document.querySelector("#weather-icon");
const tempSpan = document.querySelector("#temperature");
const textSpan = document.querySelector("#weather-text");
const realFeelSpan = document.querySelector("#real-feel");
const locationSpan = document.querySelector("#location");
const daySpan = document.querySelector("#forecast-day");

// Units selection
document.querySelector("#metric-btn").addEventListener("click", () => {
  if (selectedUnits === "metric") return;
  selectedUnits = "metric";
  setActiveUnit("metric");
  fetchCities(); //Swith cities units when clicked
});

document.querySelector("#imperial-btn").addEventListener("click", () => {
  selectedUnits = "imperial";
  setActiveUnit("imperial");
  fetchCities(); // Swith cities units when clicked
});

function setActiveUnit(unit) {
  document
    .getElementById("metric-btn")
    .classList.toggle("active", unit === "metric");
  document
    .getElementById("imperial-btn")
    .classList.toggle("active", unit === "imperial");
}

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const location = userSearch.value;

  // Displaying Empty while fetching
  iconSpan.innerHTML = "";
  tempSpan.textContent = "";
  textSpan.textContent = "";
  realFeelSpan.textContent = "";
  locationSpan.textContent = "";

  // Search
  fetch(
    `/weather?address=${encodeURIComponent(location)}&units=${selectedUnits}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        locationSpan.textContent = data.location;

        // Show results + weather icon
        iconSpan.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.forecast.icon}@2x.png" alt="${data.forecast.description}">`;

        tempSpan.textContent = `${data.forecast.temperature}${data.forecast.unit}`;

        textSpan.textContent = data.forecast.description;

        realFeelSpan.textContent = `Feels like: ${data.forecast.feels_like}${data.forecast.unit}`;
      }
    });
});

// Setting all cities
const cities = [
  "Atlanta",
  "Austin",
  "Boston",
  "Brooklyn",
  "Chicago",
  "Dallas",
  "Denver",
  "Houston",
  "Los Angeles",
  "Manhattan",
];

// Loop each city in the list
function fetchCities() {
  cities.forEach((city) => {
    const cityId = city.replace(/\s/g, "");

    fetch(`/weather?address=${encodeURIComponent(city)}&units=${selectedUnits}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          // Set icon
          document.getElementById(`icon-${cityId}`).innerHTML = `
          <img src="https://openweathermap.org/img/wn/${data.forecast.icon}@2x.png" 
               alt="${data.forecast.description}" width="30" height="30">
        `;

          // Set temperature
          document.getElementById(
            `temp-${cityId}`
          ).textContent = `${data.forecast.temperature}${data.forecast.unit}`;
        }
      });
  });
}

//Allow me to see the actual cities info after page load
setActiveUnit(selectedUnits);
fetchCities();
