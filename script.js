const search = document.querySelector('.search-icon-wraper');
let data;
fetch(
  'https://api.openweathermap.org/data/2.5/weather?q=delhi&appid=c14da68727310578ee9d40d96ca3124c',
)
  .then((res) => res.json())
  .then((Data) => {
    data = Data;
    changeData();
  });

search.addEventListener('click', () => {});

const wetherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('#temperature');
const cityName = document.querySelector('#city-name');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
function changeData() {
  console.log(data);
  wetherIcon.src = `./images/${data.weather[0].main}.png`;
  temperature.innerHTML = `<span>${(data.main.temp - 273.15).toFixed(2)}</span><sup>o</sup>c`;
  cityName.textContent = `${data.name}`;
  humidity.innerHTML = `
    <h3>${data.main.humidity}%</h3>
    <span>Humidity</span>`;
    wind.innerHTML=`
        <h3>${data.wind.speed} km/h</h3>
        <span>Wind Speed</span>
    `
}
