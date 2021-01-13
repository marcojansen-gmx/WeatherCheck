// Dom Manipulation and other code go here 
const cityForm = document.querySelector('.enter-location');
//elements to update main card
const card = document.querySelector('.card');
const details = document.querySelector('.details')

//func to update  UI
const updateUI = (data) => {
    const cityDetails = data.cityDetails;
    const weatherDetails = data.weatherDetails;

    // update the details on the card 
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weatherDetails.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weatherDetails.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;
    // remove the class of d-none if it is present
    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
};

const updateCity = async (city) => {
    
    const cityDetails = await getCity(city);
    const weatherDetails = await getWeather(cityDetails.Key);

    return { cityDetails, weatherDetails, };
};

cityForm.addEventListener('submit', e => {
    // prevent detault action so it doesn't refresh page
    e.preventDefault();
    // getting city value
    const city =  cityForm.city.value.trim();
    // clear form
    cityForm.reset();
    
    //update the User Interface with the new City
    updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));
});