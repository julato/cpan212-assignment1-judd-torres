import { Router } from 'express';

//import needed functions parseCity, getCityWeather
import { parseCity, parseCities } from '../validators/weather-query.js';
import { getCityWeather } from '../lib/weather.js';
import { HttpError } from '../lib/http-error.js';

export const weatherRouter = Router();

//GET /api/weather?city=Toronto
// Validate with parseCity, get the summary with getCityWeather, and respond
// with { data, attribution }. Routes never call fetch themselves.
weatherRouter.get('/weather', async (req, res) => {
  
  const city = parseCity(req.query.city)

  const data = await getCityWeather(city)

  res.status(200).json({
    data: data,
    attribution : "Weather data by Open-Meteo.com (https://open-meteo.com/)"
  })

});

// TODO (you): GET /api/compare?cities=Toronto,Vancouver,Halifax
// then build the cities array and the summary described on the assignment page.
weatherRouter.get('/compare',async (req, res) => {
  
  const names = parseCities(req.query.cities);

  const requests = names.map((city) => getCityWeather(city));
// Validate with parseCities, start every lookup at once with Promise.allSettled,
  const results = await Promise.allSettled(requests)

  const cityResults = [];

  let warmest = null;
  let coldest = null;
  let highestTemp = -Infinity
  let lowestTemp = Infinity;
  let succeed = 0;
  let fail = 0;

  //for loop to iterate each city
  for (let i = 0; i < results.length;i++) {

    const result = results[i];
    const city = names[i]

    if (result.status === 'fulfilled') {

      const weather = result.value
      cityResults.push({
        city: city, ok: true, weather: weather
      })

      succeed++

      const temperature = weather.current.temperatureC

      if(temperature > highestTemp) {
        highestTemp = temperature
        warmest = weather.location.name;
      }

      if(temperature < lowestTemp) {
        lowestTemp = temperature
        coldest = weather.location.name;
      }
    }
    else {  //fail
      const error = result.reason

      let status = 500
      let message = 'Internal server error'

      if (error instanceof HttpError) {
        if ([404, 502, 504].includes(error.status)) {
          status = error.status;
          message = error.message;
        }
      }
      else {
        console.error(error)
      }

      cityResults.push({
        city: city, ok: false, error: {
          status: status, message: message
        }
      })

      fail++;
    }
  }

  res.json({
    cities: cityResults,
    summary: {
      succeeded: succeed,
      failed: fail,
      warmest: warmest,
      coldest: coldest
    }
  })
});
