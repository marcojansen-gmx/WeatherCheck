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
    <div class="card">
    <h5 style="padding: 20px"> 5 Day Forecast </h5>
                    <h5 class="card-header">
                        Card title 1
                    </h5>
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
                    <h5 class="card-header">
                        Card title 2
                    </h5>
                    <div class="card-body">
                        <p class="card-text">
                        MAX ${forecastDetails.DailyForecasts[1].Temperature.Maximum.Value} &deg;C
                        </p>
                    </div>
                    <div class="card-footer">
                        Card footer
                    </div>
                </div>
                <div class="card">
                    <h5 class="card-header">
                        Card title 3
                    </h5>
                    <div class="card-body">
                        <p class="card-text">
                        MAX ${forecastDetails.DailyForecasts[2].Temperature.Maximum.Value} &deg;C
                        </p>
                    </div>
                    <div class="card-footer">
                        Card footer
                    </div>
                </div>
                <div class="card">
                    <h5 class="card-header">
                        Card title 4
                    </h5>
                    <div class="card-body">
                        <p class="card-text">
                        MAX ${forecastDetails.DailyForecasts[3].Temperature.Maximum.Value} &deg;C
                        </p>
                    </div>
                    <div class="card-footer">
                        Card footer
                    </div>
                </div>
                <div class="card">
                    <h5 class="card-header">
                        Card title 5
                    </h5>
                    <div class="card-body">
                        <p class="card-text">
                        MAX ${forecastDetails.DailyForecasts[4].Temperature.Maximum.Value} &deg;C
                        </p>
                    </div>
                    <div class="card-footer">
                        Card footer
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