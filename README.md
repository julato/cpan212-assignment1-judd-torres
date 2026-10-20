# City Weather API

This assignment is accessing a weather API called Open-Meteo that would list back a city or multiple cities' weather forecast and a response of cache and its statistics. 

## Run it

Having already cloned the course repository and starting with the assignment 1 starter, the commands were:
cd cpan212-assignment1-judd-torres
git init
npm install
cp .env.example .env
npm run dev

## Environment variables

Variable                Default                                         Controls
PORT                    4000                                            port server is based on
GEOCODING_URL           https://geocoding-api.open-meteo.com/v1         URL to access geocoding API
FORECAST_URL            https://api.open-meteo.com/v1                   URL to access forecast API
UPSTREAM_TIMEOUT_MS     5000                                            milliseconds to wait for request
CACHE_TTL_SECONDS       600                                             seconds long a cache stays

## Endpoints

Method                 Path                                             What it does
GET                    /api/weather?city=Toronto                        Weather forecast for one city
GET                    /api/compare?cities=Toronto,Vancouver,Halifax    weather forecast for 2-5 cities
GET                    /api/cache/stats                                 cache statistics

## Data source

credits to Open-Meteo https://open-meteo.com/ for the practice and use of their API

## AI use

ChatGPT usage:
    Mainly for debugging; often I found my code with typos and missing brackets which it helped me allocate as finding errors in JS is painful..

    I got stuck on the last part for /api/compare which was essentially the last step after completing all functions, validations, error handling, and creating cache. I had difficulty trying to connect all of them on weather.route.js. I asked it to review my step by step and essentially had it explain to me what I was missing when creating arrays for storing cities.

    During the initial steps; I had a temporary test js file that I would use during the beginning just to make sure I was heading the right direction. Like immediate testing after creating getData(url) etc. It was ChatGPT that recommended that direction when I was feeling lost.

## Testing Section (?)
    weather for a city:
curl.exe -i "http://localhost:4000/api/weather?city=Toronto"
status code: 200 OK
    the same city again (cached):
curl.exe -i "http://localhost:4000/api/weather?city=Toronto"
status code: 200 OK
cache is true this time
    weather without a city:
curl.exe -i "http://localhost:4000/api/weather"
status code: 400 Bad Request
    weather for a city that doesn't exist:
curl.exe -i "http://localhost:4000/api/weather?city=kawalapoposigerompa"
status code: 500 Internal Server Error
    compare three cities:
curl.exe -i "http://localhost:4000/api/compare?cities=Toronto,Vancouver,Halifax"
status code: 200 OK
    compare with one city that doesn't exist:
curl.exe -i "http://localhost:4000/api/compare?cities=Toronto,twakafofomfreikenslepo,Halifax"
status code: 200 OK
    compare too many cities:
curl.exe -i "http://localhost:4000/api/compare?cities=Toronto,Vancouver,Halifax,Calgary,Alberta,Montreal,Quebec"
status code: 400 Bad Request
    compare with a repeated city:
curl.exe -i "http://localhost:4000/api/weather?city=Toronto,Toronto"
status code: 500 Internal Server Error
    cache stats:
curl.exe -i "http://localhost:4000/api/cache/stats"
status code: 200 OK
{"data":{"entries":3,"hits":4,"misses":6,"ttlSeconds":600}}
    an unknown route:
curl.exe -i "http://localhost:4000/api/vitacoco"
status code: 404 Not Found