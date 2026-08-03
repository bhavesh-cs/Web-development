const clock = document.getElementById("clock");
const greeting = document.getElementById("greeting");
const date = document.getElementById("date");
const formatBtn = document.getElementById("format-btn");
const stopwatch = document.getElementById("stopwatch");
const themeToggle = document.getElementById("theme-toggle");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const minutesInput = document.getElementById("minutes");
const timerStartBtn = document.getElementById("timer-start");
const timerDisplay = document.getElementById("timer-display");
const quote = document.getElementById("quote");
const city = document.getElementById("city");
const temperature = document.getElementById("temperature");
const weatherCondition = document.getElementById("weather-condition");
const calendarHeader = document.getElementById("calendar-header");
const calendarDates = document.getElementById("calendar-dates");


let is24Hour = true;
let startTime = 0;
let elapsedTime = 0;
let stopwatchInterval;
let isRunning = false;
let timeLeft = 0;
let timerInterval;


startBtn.addEventListener("click", function(){
    if (isRunning) return;
    isRunning = true;
    startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(updateStopwatch, 100);
})

pauseBtn.addEventListener("click", function(){
    if (!isRunning) return;
    isRunning = false;
    clearInterval(stopwatchInterval);
});

resetBtn.addEventListener("click", function(){
    clearInterval(stopwatchInterval);
    isRunning = false;
    startTime = 0;
    elapsedTime = 0;
    stopwatch.textContent = "00:00:0";
});

formatBtn.addEventListener("click", function() {
    is24Hour = !is24Hour;

    if(is24Hour){
        formatBtn.textContent = "24H";
    } else {
        formatBtn.textContent = "12H";
    }

    updateClock()

});

themeToggle.addEventListener("click", function(){
    document.body.classList.toggle("light-mode");
})

timerStartBtn.addEventListener("click", function() {
    timeLeft = parseInt(minutesInput.value) * 60;
        
    if(isNaN(timeLeft) || timeLeft<= 0){
        alert("Please enter a valid number of minutes");
        return;
    }

    clearInterval(timerInterval);
    updateTimer();
    timerInterval = setInterval(updateTimer, 1000);
});

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

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
    "December"
];



function updateClock() {
    const now = new Date();
    const day = now.getDay();
    const month = now.getMonth();
    const year = now.getFullYear();
    const today = now.getDate();


    let hours = now.getHours();
    let period = "";
    if (!is24Hour){
        if (hours >= 12) {
            period = "PM";
        } else {
            period = "AM";
        }
        
        if (hours === 0) {
            hours = 12;
        }

        else if (hours > 12) {
            hours = hours - 12
        }
    }
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
  
    if (is24Hour) {
       clock.textContent =
           `${String(hours).padStart(2, "0")}:${minutes}:${seconds}`;
    } else {
        clock.textContent =
            `${String(hours).padStart(2, "0")}:${minutes}:${seconds} ${period}`;
    }

    if(now.getHours() < 12){
        greeting.textContent = "Good Morning";
    }

    else if(now.getHours() < 18){
        greeting.textContent = "Good Afternoon";
    }

    else{
        greeting.textContent = "Good Evening";
    }

    date.textContent = `${days[day]}, ${today} ${months[month]} ${year}`;

}

function updateStopwatch(){
    elapsedTime = Date.now() - startTime;
    const minutes = Math.floor(elapsedTime / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    const milliseconds = Math.floor((elapsedTime % 1000) / 100);

    stopwatch.textContent = 
        `${String(minutes).padStart(2, "0")}:` +
        `${String(seconds).padStart(2, "0")}:` +
        `${milliseconds}`;
}

function updateTimer(){
    timeLeft--;

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    timerDisplay.textContent =
         `${String(minutes).padStart(2, "0")}:` +
         `${String(seconds).padStart(2, "0")}`;

    if(timeLeft <= 0){
        clearInterval(timerInterval);
        timerDisplay.textContent = "00:00";
    }
}

async function getQuote(){
  try {
    const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: {
            "X-Api-Key": "G5gszmBBou3gqqhg2oYWxpKn6MkEuI3fFHJOCiD9"
        }
    });
    const data = await response.json();
    console.log(data);

    quote.textContent = `"${data[0].quote}" - ${data[0].author}`;
  } catch(error) {
    quote.textContent = "Failed to load quote.";
  }
}

async function getWeather(){
    const response = await fetch(
         "https://api.weatherapi.com/v1/current.json?key=6c16f6080461446f9bc64341262807&q=Indore&aqi=no"
    )

    const data = await response.json();
    city.textContent = data.location.name;
    temperature.textContent = data.current.temp_c + "°C";
    weatherCondition.textContent = data.current.condition.text;
    console.log(data);
}

const monthNames = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
];

function createCalendar(){
    const now = new Date();

    const month = now.getMonth();
    const year = now.getFullYear();
    const today = now.getDate();

    calendarHeader.textContent =
        `${months[month]} ${year}`;

    calendarDates.innerHTML = "";
    const firstDay =
        new Date(year,month,1).getDay();

    const daysInMonth =
        new Date(year,month+1,0).getDate();
   
    for(let i=0;i<firstDay;i++){
        const empty=document.createElement("div");
        calendarDates.appendChild(empty);
    }
    for(let day=1;day<=daysInMonth;day++){
        const date=document.createElement("div");
        date.textContent=day;

        if(day===today){
            date.classList.add("today");
        }
        calendarDates.appendChild(date);
    }
}

updateClock();
setInterval(updateClock, 1000);

getQuote();
getWeather();
createCalendar();

particlesJS("particles-js", {
    particles: {
        number: {
            value: 70
        },

        color: {
            value: "#4c8dff"
        },

        shape: {
            type: "circle"
        },

        opacity: {
            value: 0.4
        },

        size: {
            value: 3
        },

        line_linked: {
            enable: true,
            distance: 160,
            color: "#4c8dff",
            opacity: 0.2,
            width: 1
        },
        move: {
            enable: true,
            speed: 1
        }
    },
    interactivity: {
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            }
        },
        modes: {
            grab: {
                distance: 180,
                line_linked: {
                    opacity: 0.7
                }
            }
        }
    }
});


