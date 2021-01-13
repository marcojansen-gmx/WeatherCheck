// Dom Manipulation and other code go here 
const cityForm = document.querySelector('.enter-location');

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
    .then(data => console.log(data))
    .catch(err => console.log(err));
});