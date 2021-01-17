// Dom Manipulation and other code go here 
const cityForm = document.querySelector('.enter-city');
//elements to update main card and Forecasts Cards
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const forecasts = document.querySelector('.forecasts');

//graphic elements to be updated
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');
const iconUv = document.querySelector('.iconUv img')

//func to update  UI
const updateUI = (data) => {
    // const cityDetails = data.cityDetails;
    // const weatherDetails = data.weatherDetails;
    
    // destructure properties
    const { cityDetails, weatherDetails, forecastDetails } = data;
    
    // update the details on the main card
    details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weatherDetails.WeatherText}</div>
    <div class="display-4 my-4">
    <span>${weatherDetails.Temperature.Metric.Value}</span>
    <span>&deg;C</span>
    </div>
    <div class="my-3">HUMIDITY ${weatherDetails.RelativeHumidity}%</div>
    <div class="my-3">WIND SPEED ${weatherDetails.Wind.Speed.Metric.Value}km/h</div>
    `;
    
    //icon for weather conditions
    const iconSrc = `Assets/graphics/icons/${weatherDetails.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    //icon for UV Index
    const iconUvSrc = `Assets/graphics/icons/UV/${weatherDetails.UVIndex}.svg`;
    iconUv.setAttribute('src', iconUvSrc);  
    // update the day  or night display  
    let timeSrc = weatherDetails.IsDayTime ? 'Assets/graphics/images/day.svg' : 'Assets/graphics/images/night.svg';
    time.setAttribute('src', timeSrc);
    
    console.log(cityDetails, weatherDetails, forecastDetails, forecastDetails.DailyForecasts[0].Temperature.Maximum.Value, forecastDetails.DailyForecasts[0].Day.Icon, forecastDetails.DailyForecasts[0].Day.Wind.Speed.Value );
    
    forecasts.innerHTML = `
    <div class="col">
        <div class="forecastsCard h-100">
            <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Date </h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>        
    <div class="col">
        <div class="forecastsCard h-100">
            <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Date </h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    <div class="col">
        <div class="forecastsCard h-100">
            <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Date </h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    <div class="col">
        <div class="forecastsCard h-100">
            <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Date </h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    <div class="col">
        <div class="forecastsCard h-100">
            <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="...">
        </div>
        <div class="card-body">
            <h5 class="card-title">Date </h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        </div>
        <div class="card-footer">
            <small class="text-muted">Last updated 3 mins ago</small>
        </div>
    </div>
    `
                            

            
        // remove the class of d-none if it is present
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }
};
        
        const updateCity = async (city) => {
            
            const cityDetails = await getCity(city);
            const weatherDetails = await getWeather(cityDetails.Key);
            const forecastDetails = await getForecast(cityDetails.Key);
            return { cityDetails, weatherDetails, forecastDetails };
            
        };
        
        cityForm.addEventListener('submit', e => {
            // prevent detault action so it doesn't refresh page
            e.preventDefault();
            
            // getting city value
            const city = cityForm.city.value.trim();
            // clear form
            cityForm.reset();
            
            //update the User Interface with the new City
            updateCity(city)
            .then(data => updateUI(data))
            // console.log(data[0])
            .catch(err => console.log(err));
        });