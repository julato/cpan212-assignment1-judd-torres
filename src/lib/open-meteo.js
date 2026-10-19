import { config } from '../config.js';
import { HttpError } from './http-error.js';

// This is the only file that calls fetch or knows Open-Meteo's URLs.
// The exact requests are on the assignment page.

async function getData(url) {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(config.upstreamTimeoutMs) //   - Pass signal: AbortSignal.timeout(config.upstreamTimeoutMs) to fetch.
    })
//   - fetch resolves for every HTTP status, so check res.ok yourself.
    if (!response.ok) {
      //throw new Error(`Response status: ${response.status}`);
      throw new HttpError(502, "Weather API request has failed");
    }

    const result = await response.json();

    return result;


  } catch(error) {
    if (error instanceof HttpError){
      throw error;
    }
  //   - Turn every failure into an HttpError: 504 when the timeout fired
    if (error.name === "TimeoutError") {throw new HttpError(504, "Weather API has timed out") }

    throw new HttpError(502, "Weather API network has failed"); // 502 for a network failure
  }
}


export async function geocodeCity(name) {
  const url = new URL(`${config.geocodingUrl}/search`);

  url.searchParams.set('name', name)
  url.searchParams.set('count', '1')
  url.searchParams.set('language', 'en')
  url.searchParams.set('format', 'json')

  const body = await getData(url);

  if (!body.results === 0) {
    throw new HttpError(404, "No results"); // Throw a 404 HttpError when there are no results.
  }

  const city = body.results[0];

  /// { name, region, country, latitude, longitude, timezone } for the first result.
  return {
    name: city.name,
    region: city.admin1 ?? null,
    country: city.country ?? null,
    latitude: city.latitude,
    longitude: city.longitude,
    timezone: city.timezone
  };


}

// TODO (you): get the current weather and a 3-day daily forecast from the
// forecast API and return the parsed response.
export async function getForecast(latitude, longitude) {
  throw new Error('getForecast is not written yet');
}
