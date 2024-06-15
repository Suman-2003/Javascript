const container = document.querySelector(".container")
const place = document.querySelector(".search-box input");
let searchBtn = document.getElementById("btn");
const error404 = document.querySelector(".not-found");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details")



const apiKey = "fa57bdc3cccc52c19e391c4ca58919a4"
const apiUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&q=`;

async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    var data = await response.json();

   if(data.cod === '404'){
    container.style.height = '480px';
    weatherBox.style.display = 'none';
    weatherDetails.style.display = 'none';
    error404.style.display = 'block';
    error404.classList.add('fadeIn');
    error404.style.opacity = 1;
    error404.style.scale = 1;
    return;
   }

   error404.style.display = 'none';
   error404.classList.remove('fadeIn');
   
    
   const image = document.querySelector(".weather-box img")
   switch(data.weather[0].main){
    case 'Clear':
        image.src = 'clear.png';
        break;
        
    case 'Clouds':
        image.src = 'cloud.png';
        break;

    case 'Haze':
        image.src = 'haze.png'; 
        break; 

    case 'Mist':
        image.src = 'mist.png'; 
        break;   
     
    case 'Snow':
        image.src = 'snow.png'; 
        break;         

    case 'Rain':
        image.src = 'rain.png'    

   }
   console.log(data);

   
    document.querySelector(".weather-box .temperature").innerHTML = data.main.temp + "°C"
    document.querySelector(".weather-box .description").innerHTML = data.weather[0].main
    document.querySelector(".weather-details .humidty span").innerHTML = data.main.humidity + "%"
    document.querySelector(".weather-details .wind span").innerHTML = data.wind.speed + "km/h"


    weatherBox.style.display = '';
    weatherDetails.style.display = '';
    weatherBox.classList.add('fadeIn');
    weatherDetails.classList.add('fadeIn');
    container.style.height = '590px';
    error404.style.opacity = 1;
    error404.style.scale = 1;
    weatherBox.style.opacity = 1;
    weatherBox.style.scale = 1;
    weatherDetails.style.scale=1;
    weatherDetails.style.opacity=1;
   
}
place.innerHTML=""

searchBtn.addEventListener("click",()=>{
    checkWeather(place.value);

})

document.addEventListener('keypress',(e)=>{
    if(e.key==='Enter'){
        checkWeather(place.value)
    }

})



