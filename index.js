const apiKey = "ea3e85077430acd1cb86dfbcddc62d0e";

const weatherDataElement = document.querySelector(".weather-data");
const cityNameElement = document.querySelector("#city-name");
const formElement = document.querySelector("form");
const iconElement = document.querySelector(".icon");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    // console.log(cityNameElement.value)

    const cityValue = cityNameElement.value;
    getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`
        );
        if (!response.ok) {
            throw new Error("Network response is not ok");
        }

        const data = await response.json();
        // console.log(data);
        // get data from the api
        const temperature = Math.floor(data.main.temp);
        const description = data.weather[0].description;
        const Icon = data.weather[0].icon;

        const details = [
            `Feels Like: ${Math.floor(data.main.feels_like)}°C`,
            `Humidity: ${data.main.humidity}%`,
            `Wind Speed: ${data.wind.speed} m/s`
        ];

        weatherDataElement.querySelector(".temp").textContent = `${temperature}°C`;
        weatherDataElement.querySelector(".desc").textContent = `${description}`;
        iconElement.innerHTML = `<img src="https://openweathermap.org/img/wn/${Icon}.png" alt="">`;

        weatherDataElement.querySelector(".details").innerHTML = details.map((detail) => 
            `<div>${detail}</div>`
        ).join("");
    } catch (error) {
        console.error("Error fetching the weather data: ", error);
    }
}
