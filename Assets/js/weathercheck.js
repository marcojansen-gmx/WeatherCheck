const key = '2YG8gYCt8OGBLka1i2lyjA80yj9Z5g2p';

// function to get current weather information for city
const getWeather = async (id) => {
const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
const query = `${id}?apikey=${key}`;

const response = await fetch(base + query);
const data = await response.json();

return data[0];

};

// function to get id for city - set city as paramater  - to obtain weather data 
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    // build query to get city id using API key and city input
    const query = `?apikey=${key}&q=${city}`;
    // fetch resource (city id) and combine base and query together
    const response = await fetch(base + query);
    const data = await response.json();
    console.log(data[0]);
    return data[0];
};

// kan uitvee
// getCity('Manchester').then(data => {
//      return getWeather(data.Key)   
//     }).then(data => {
//         console.log(data);
//     }).catch(err =>  console.log(err));