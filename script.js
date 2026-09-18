const search = document.querySelector('.search-icon-wraper');
const searchInput = document.querySelector('#search-input');
const toastBox = document.querySelector('.toast-box');
function showToast(html,type){
  const toast = document.createElement('div');
  toast.classList.add('toast');
  toast.classList.add(type);
  toast.innerHTML = `${html}`;
  setTimeout(()=>toastBox.removeChild(toast),3000);
  toastBox.appendChild(toast);
}
navigator.geolocation.getCurrentPosition(
  (position) => {
    const { latitude, longitude } = position.coords;
    changeDataCoordinate(latitude, longitude);
  },
  (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    // alert(" Please enable it in your browser settings.");
    showToast('<p>Location access is blocked!</p>','errorToast');
    changeDataCity('Delhi');
  },
);
const wetherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('#temperature');
const cityName = document.querySelector('#city-name');
const humidity = document.querySelector('#humidity');
const wind = document.querySelector('#wind');
function changeDataCity(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c14da68727310578ee9d40d96ca3124c`,
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      wetherIcon.src = `./images/${data.weather[0].main}.png`;
      temperature.innerHTML = `<span>${(data.main.temp - 273.15).toFixed(2)}</span><sup>o</sup>c`;
      cityName.textContent = `${data.name}`;
      humidity.innerHTML = `
    <h3>${data.main.humidity}%</h3>
    <span>Humidity</span>`;
      wind.innerHTML = `
    <h3>${data.wind.speed} km/h</h3>
    <span>Wind Speed</span>
    `;
    showToast('<p>Fetched Successfully.</p>','successToast')
    })
    .catch((err) => {
      if(city!=="")
        showToast('<i class="fa-solid fa-circle-exclamation"></i> <p>City Not Found</p>','errorToast');
      else
        showToast('Enter a valid city name!','errorToast');
    });
}
function changeDataCoordinate(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=c14da68727310578ee9d40d96ca3124c`,
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      wetherIcon.src = `./images/${data.weather[0].main}.png`;
      temperature.innerHTML = `<span>${(data.main.temp - 273.15).toFixed(2)}</span><sup>o</sup>c`;
      cityName.textContent = `${data.name}`;
      humidity.innerHTML = `
    <h3>${data.main.humidity}%</h3>
    <span>Humidity</span>`;
      wind.innerHTML = `
    <h3>${data.wind.speed} km/h</h3>
    <span>Wind Speed</span>
    `;
    })
    .catch((err) => alert('Data not found'));
}
search.addEventListener('click', () => {
  changeDataCity(searchInput.value);
});
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') changeDataCity(searchInput.value);
});

const git = document.querySelector('.fa-github');
git.addEventListener('click', () => {
  window.open('https://github.com/rishabhjha05/weatherApp', '_blank');
});
