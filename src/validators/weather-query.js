import { HttpError } from '../lib/http-error.js';


export function parseCity(value) {
  
  //when > 1 city is listed
  if (typeof value !== "string") {
    throw new HttpError(400, "Invalid query", {
      city: "More than 1 city is listed"
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


export function parseCities(value) {
  
  if (typeof value !== "string") {
    throw new HttpError(400, "Invalid query", {
      cities: "Cities are listed more than once"
    })
  }

  const cities = value.split(",");

  if (cities.length < 2 || cities.length > 5) {

    throw new HttpError(400, "Invalid query", {
      cities: "List only 2 up to 5 cities"
    })
  }

  //array for trimmed city names
  const storedCities = [];

  for (let i =0; i < cities.length; i++) {  //loop to iterate over each stored city
    cities[i] = cities[i].trim()

    if (cities[i].length < 2 || cities[i].length > 60) {
      throw new HttpError(400, "Invalid query", {
        cities: "Each cities must be 2 to 60 characters "
      })
    }

    //checking for character requirement and duplicates
    const checkCity = cities[i].toLowerCase();

    if(storedCities.includes(checkCity)) {
      throw new HttpError(400,"Invalid query", {
        cities: "Duplicate cities"
      })

    }

    storedCities.push(checkCity);
  
  }
  return cities;
}
