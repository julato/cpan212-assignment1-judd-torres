import { config } from '../config.js';
import { geocodeCity, getForecast } from './open-meteo.js';
import { describeWeatherCode } from './weather-codes.js';

//import created cache funtion from cache.js
import { createCache } from './cache.js';

// create one cache for the whole app, with a time to live of
// config.cacheTtlSeconds.
const weatherCache = createCache(config.cacheTtlSeconds);

// the assignment page. Check the cache first. On a miss, geocode the city, get
// the forecast, build the summary, store it, and return it with cached: false.
// On a hit, return the stored summary with cached: true.
export async function getCityWeather(city) {

  //check cache
  const key = city.trim().toLowerCase()
  const cached = weatherCache.get(key)

  if (cached) {
    return {
      ...cached,
      cached: true
    }
  }


  const response = await geocodeCity(city); //return the weather summary for one city,

  const forecast = await getForecast(
    response.latitude, response.longitude
  )
  const current = forecast.current
  const daily = forecast.daily
  const weather = {
    location: response,
    current: {
      time: current.time,
      temperatureC: current.temperature_2m,
      feelslikeC: current.apparent_temperature,
      humidityPercent: current.relative_humidity_2m,
      windKmh: current.wind_speed_10m,
      weatherCode: current.weather_code,
      conditions: describeWeatherCode(current.weather_code)
    },

    daily: daily.time.map((date, i) => {
      return {
        date: date,
        minC: daily.temperature_2m_min[i],
        maxC: daily.temperature_2m_max[i],
        precipitationChancePercent: daily.precipitation_probability_max[i],
        weatherCode: daily.weather_code[i],
        conditions: describeWeatherCode(daily.weather_code[i])

      }

    }),

    fetchedAt: new Date().toISOString(), cached: false
  };
  weatherCache.set(key, weather);

  return weather;
}

// TODO (you): return the cache statistics for GET /api/cache/stats.
export function getCacheStats() {
  return weatherCache.getStats();
}
