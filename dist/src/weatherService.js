"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeatherData = exports.saveWeatherData = exports.fetchWeather = exports.fetchCoordinates = void 0;
const weatherModel_1 = require("./weatherModel");
const axios_1 = __importDefault(require("axios"));
const geoCodingAPI = "https://api.api-ninjas.com/v1/geocoding";
const weatherAPI = "https://weatherapi-com.p.rapidapi.com/current.json";
const weatherAPIKey = "5efbbcb3096b4eb0b6871703242505";
const geoCodingAPIKey = "QnhWr4/WoFL2Cv8XyzmaYg==qicNcKK9PEOANJl3";
function fetchCoordinates(city, country) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(geoCodingAPI, {
            params: { city, country },
            headers: { "X-Api-Key": geoCodingAPIKey }
        });
        return response.data[0];
    });
}
exports.fetchCoordinates = fetchCoordinates;
function fetchWeather(latitude, longitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(weatherAPI, {
            params: { q: `${latitude},${longitude}` },
            headers: { "QnhWr4/WoFL2Cv8XyzmaYg==qicNcKK9PEOANJl3": weatherAPIKey }
        });
        return response.data.current;
    });
}
exports.fetchWeather = fetchWeather;
function saveWeatherData(city, country, weather, longitude, latitude) {
    return __awaiter(this, void 0, void 0, function* () {
        const weatherData = yield weatherModel_1.Weather.create({
            city,
            country,
            weather,
            time: new Date(),
            longitude,
            latitude
        });
        return weatherData;
    });
}
exports.saveWeatherData = saveWeatherData;
function getWeatherData(city) {
    return __awaiter(this, void 0, void 0, function* () {
        if (city) {
            return yield weatherModel_1.Weather.findAll({ where: { city } });
        }
        const latestWeather = yield weatherModel_1.Weather.findAll({
            group: ["city"],
            order: [["time", "DESC"]]
        });
        return latestWeather;
    });
}
exports.getWeatherData = getWeatherData;
