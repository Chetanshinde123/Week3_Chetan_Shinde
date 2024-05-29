"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = exports.saveWeatherData = exports.fetchWeather = exports.fetchCoordinates = void 0;
const axios_1 = __importDefault(require("axios"));
const weatherModel_1 = require("./weatherModel");
const pgConfig_1 = __importDefault(require("./pgConfig"));
const geoCodingAPI = "https://api.api-ninjas.com/v1/geocoding";
const weatherAPI = "https://weatherapi-com.p.rapidapi.com/current.json";
const weatherAPIKey = "52c5a9e588msh35885c36070b2cep19ae1bjsn82a6c98dc23e";
const geoCodingAPIKey = "QnhWr4/WoFL2Cv8XyzmaYg==qicNcKK9PEOANJl3";
// Fetching Coordinates Function
async function fetchCoordinates(city, country) {
    const response = await axios_1.default.get(geoCodingAPI, {
        params: { city, country },
        headers: { "X-Api-Key": geoCodingAPIKey }
    });
    return response.data[0];
}
exports.fetchCoordinates = fetchCoordinates;
// WeaterApi Function
async function fetchWeather(latitude, longitude) {
    const response = await axios_1.default.get(weatherAPI, {
        params: { q: `${latitude},${longitude}` },
        headers: {
            "X-RapidAPI-Key": weatherAPIKey,
            "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
        }
    });
    return response.data.current;
}
exports.fetchWeather = fetchWeather;
// Creating Database
async function saveWeatherData(city, country, weather, longitude, latitude) {
    const weatherData = await weatherModel_1.Weather.create({
        city,
        country,
        weather,
        time: new Date(),
        longitude,
        latitude
    });
    return weatherData;
}
exports.saveWeatherData = saveWeatherData;
async function getWeatherData(city) {
    if (city) {
        return await weatherModel_1.Weather.findAll({ where: { city } });
    }
    const latestWeather = await weatherModel_1.Weather.findAll({
        attributes: [
            "city",
            "country",
            [pgConfig_1.default.fn("MAX", pgConfig_1.default.col("time")), "time"],
            "weather",
            "longitude",
            "latitude"
        ],
        group: ["city", "country", "weather", "longitude", "latitude"]
    });
    return latestWeather;
}
exports.getWeatherData = getWeatherData;
