import { HttpError } from '../lib/http-error.js';


export function parseCity(value) {
  
  //when > 1 city is listed
  if (typeof value !== "string") {
    throw new HttpError(400, "Invalid query", {
      city: "City is listed more than once"
    });
  }
  /*return the trimmed city name.
    to check error for breaking character limit
  */
  const city = value.trim();

  if (city.length < 2 || city.length > 60) {
    throw new HttpError(400, "Invalid query", {
      city: "city must be 2 to 60 characters "
    })
  }

  return city;

}

// TODO (you): check ?cities= and return an array of trimmed city names. Throw a
// 400 HttpError with details.cities when it breaks a rule from the assignment page.
export function parseCities(value) {
  throw new Error('parseCities is not written yet');
}
