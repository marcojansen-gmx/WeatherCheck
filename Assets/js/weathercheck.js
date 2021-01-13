const key = '2YG8gYCt8OGBLka1i2lyjA80yj9Z5g2p';

// function to get id for city - set city as paramater  - to obtain weather data 
const getCity = async (city) => {
    const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
    // build query to get city id using API key and city input
    const query = `?apikey=${key}&q=${city}`;
    // fetch resource (city id) and combine base and query together
    const response = await fetch(base + query);
    const data = await response.json();

    return data[0];
}

getCity('Manchester')
    .then(data => console.log(data))
    .catch(err =>  console.log(err));
    