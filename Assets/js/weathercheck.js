const key = 'q5Xsdy5sqmdb4MwpDtDT9cpWPAMSRoAy';

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
    // console.log(data[0]);
    return data[0];
  };

// kan uitvee
// getCity('Manchester').then(data => {
//      return getWeather(data.Key)   
//     }).then(data => {
//         console.log(data);
//     }).catch(err =>  console.log(err));


// Resource URL for UV query
// http://dataservice.accuweather.com/indices/v1/daily/1day/{locationKey}/groups/{ID}

// {
//     "Name": "UV Index",
//     "ID": -15,
//     "Ascending": true,
//     "Description": "The AccuWeather.com UV Index forecasts localized ultraviolet radiation conditions. It is updated every hour and indicates how much sun protection you need for your outdoor activities."
//   },