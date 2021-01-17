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


// working with the date
const today = new Date();
// Getting required values
const year = today.getFullYear();
const month = today.getMonth() +1;
const day = today.getDate();
const day1 = today.getDate() +1;
const day2 = today.getDate() +2;
const day3 = today.getDate() +3;
const day4 = today.getDate() +4;
const day5 = today.getDate() +5;

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
    
    // setting forecast items     
    forecasts.innerHTML = `
    <div class="card">
        <h3 class="card-header"> 5 Day Forecast </h3>
        <h5 class="card-header"> Forecast: ${year} / ${month} / ${day1} </h5>
        <div class="card-body">
            <p class="card-text">
                MAX ${forecastDetails.DailyForecasts[0].Temperature.Maximum.Value} &deg;C
                <br>
                <div><img src="Assets/graphics/icons/${forecastDetails.DailyForecasts[0].Day.Icon}.svg"></div>
                <br>
                ${forecastDetails.DailyForecasts[0].Day.ShortPhrase}
            </p>
        </div>
        <div class="card-footer">
            <div><img src="Assets/graphics/icons/UV/${forecastDetails.DailyForecasts[0].AirAndPollen[5].CategoryValue}.svg" class="smallIcon"></div>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header"> Forecast: ${year} / ${month} / ${day2} </h5>
        <div class="card-body">
            <p class="card-text">
                MAX ${forecastDetails.DailyForecasts[1].Temperature.Maximum.Value} &deg;C
                <br>
                <div><img src="Assets/graphics/icons/${forecastDetails.DailyForecasts[1].Day.Icon}.svg"></div>
                <br>
                ${forecastDetails.DailyForecasts[1].Day.ShortPhrase}
            </p>
        </div>
        <div class="card-footer">
            <div><img src="Assets/graphics/icons/UV/${forecastDetails.DailyForecasts[1].AirAndPollen[5].CategoryValue}.svg" class="smallIcon"></div>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header"> Forecast: ${year} / ${month} / ${day3} </h5>
        <div class="card-body">
            <p class="card-text">
                MAX ${forecastDetails.DailyForecasts[2].Temperature.Maximum.Value} &deg;C
                <br>
                <div><img src="Assets/graphics/icons/${forecastDetails.DailyForecasts[2].Day.Icon}.svg"></div>
                <br>
                ${forecastDetails.DailyForecasts[2].Day.ShortPhrase}
            </p>
        </div>
        <div class="card-footer">
            <div><img src="Assets/graphics/icons/UV/${forecastDetails.DailyForecasts[2].AirAndPollen[5].CategoryValue}.svg" class="smallIcon"></div>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header"> Forecast: ${year} / ${month} / ${day4} </h5>
        <div class="card-body">
            <p class="card-text">
                MAX ${forecastDetails.DailyForecasts[3].Temperature.Maximum.Value} &deg;C
                <br>
                <div><img src="Assets/graphics/icons/${forecastDetails.DailyForecasts[3].Day.Icon}.svg"></div>
                <br>
                ${forecastDetails.DailyForecasts[3].Day.ShortPhrase}
            </p>
        </div>
        <div class="card-footer">
            <div><img src="Assets/graphics/icons/UV/${forecastDetails.DailyForecasts[3].AirAndPollen[5].CategoryValue}.svg" class="smallIcon"></div>
        </div>
    </div>
    <div class="card">
        <h5 class="card-header"> Forecast: ${year} / ${month} / ${day5} </h5>
        <div class="card-body">
            <p class="card-text">
                MAX ${forecastDetails.DailyForecasts[4].Temperature.Maximum.Value} &deg;C
                <br>
                <div><img src="Assets/graphics/icons/${forecastDetails.DailyForecasts[4].Day.Icon}.svg"></div>
                <br>
                ${forecastDetails.DailyForecasts[4].Day.ShortPhrase}
            </p>
        </div>
        <div class="card-footer">
        <div><img src="Assets/graphics/icons/UV/${forecastDetails.DailyForecasts[4].AirAndPollen[5].CategoryValue}.svg" class="smallIcon"></div>
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