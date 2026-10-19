import { geocodeCity } from './src/lib/open-meteo.js';

try {
    const city = await geocodeCity("Toronto");

    console.log("City information:");
    console.log(city);

} catch (error) {
    console.log("Error:", error.message);
}