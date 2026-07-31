const apiKey = "6c16f6080461446f9bc64341262807";


const searchBox = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weather = document.getElementById("weather");
const error = document.getElementById("error");

const city = document.getElementById("city");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const description = document.getElementById("description");
const weatherIcon = document.getElementById("weatherIcon");


weather.style.display = "none";
error.style.display = "none";

async function checkWeather(cityName) {
    try {
        const response = await fetch(
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`
        );
        const data = await response.json();
        console.log(data);
      
        if (data.error) {
            weather.style.display = "none";
            error.style.display = "block";
            error.innerHTML = `<p>${data.error.message}</p>`;
            return;
        }
       
        city.innerHTML = `${data.location.name}, ${data.location.country}`;
        temp.innerHTML = `${Math.round(data.current.temp_c)}°C`;
        humidity.innerHTML = `${data.current.humidity}%`;
        wind.innerHTML = `${data.current.wind_kph} km/h`;
        description.innerHTML = data.current.condition.text;

        weatherIcon.src = "https:" + data.current.condition.icon;

        weather.style.display = "block";
        error.style.display = "none";

    } catch (err) {
        console.error(err);
        weather.style.display = "none";
        error.style.display = "block";
        error.innerHTML = "<p>Something went wrong!</p>";
    }
}


searchBtn.addEventListener("click", () => {
    const cityName = searchBox.value.trim();
    if (cityName !== "") {
        checkWeather(cityName);
    }
});


searchBox.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        const cityName = searchBox.value.trim();
        if (cityName !== "") {
            checkWeather(cityName);
        }
    }

});

checkWeather("Tokyo");