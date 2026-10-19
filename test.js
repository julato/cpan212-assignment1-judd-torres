import { geocodeCity, getForecast } from './src/lib/open-meteo.js';
import { getCityWeather } from './src/lib/weather.js';
import { parseCity } from './src/validators/weather-query.js';
try {
    // const city = await geocodeCity("Toronto");
    // const weather = await getCityWeather("Toronto")
    console.log(parseCity("Toronto"))
    console.log(parseCity("Vancouver      "))
    console.log(parseCity("J"))


    // // console.log("City information:");
    // // console.log(city);
    // console.log(JSON.stringify(weather, null, 2));

    // const weather = await getForecast(
    //     city.latitude, city.longitude
    // )

    // console.log(weather.current)
    // console.log(weather.daily)

} catch (error) {
    // console.log("Error:", error.message);
    console.log("status:", error.status);
    console.log("details:", error.details);
    console.log("msg:", error.message);


}