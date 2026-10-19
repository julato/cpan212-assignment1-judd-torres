import { geocodeCity, getForecast } from './src/lib/open-meteo.js';

try {
    const city = await geocodeCity("Toronto");

    console.log("City information:");
    console.log(city);


    const weather = await getForecast(
        city.latitude, city.longitude
    )

    console.log(weather.current)
    console.log(weather.daily)

} catch (error) {
    console.log("Error:", error.message);
}