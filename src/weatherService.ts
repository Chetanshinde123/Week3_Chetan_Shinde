import axios from "axios";
import { Weather } from "./weatherModel";
import sequelize from "./pgConfig";

const geoCodingAPI = "https://api.api-ninjas.com/v1/geocoding";
const weatherAPI = "https://weatherapi-com.p.rapidapi.com/current.json";
const weatherAPIKey = "52c5a9e588msh35885c36070b2cep19ae1bjsn82a6c98dc23e";
const geoCodingAPIKey = "QnhWr4/WoFL2Cv8XyzmaYg==qicNcKK9PEOANJl3";

// Fetching Coordinates Function
async function fetchCoordinates(city: string, country: string) {
  const response = await axios.get(geoCodingAPI, {
    params: { city, country },
    headers: { "X-Api-Key": geoCodingAPIKey }
  });
  return response.data[0];
}

// WeaterApi Function
async function fetchWeather(latitude: number, longitude: number) {
  const response = await axios.get(weatherAPI, {
    params: { q: `${latitude},${longitude}` },
    headers: {
      "X-RapidAPI-Key": weatherAPIKey,
      "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com"
    }
  });
  return response.data.current;
}

// Creating Database
async function saveWeatherData(
  city: string,
  country: string,
  weather: string,
  longitude: number,
  latitude: number
) {
  const weatherData = await Weather.create({
    city,
    country,
    weather,
    time: new Date(),
    longitude,
    latitude
  });
  return weatherData;
}

async function getWeatherData(city?: string) {
  if (city) {
    return await Weather.findAll({ where: { city } });
  }
  const latestWeather = await Weather.findAll({
    attributes: [
      "city",
      "country",
      [sequelize.fn("MAX", sequelize.col("time")), "time"],
      "weather",
      "longitude",
      "latitude"
    ],
    group: ["city", "country", "weather", "longitude", "latitude"]
  });
  return latestWeather;
}
export { fetchCoordinates, fetchWeather, saveWeatherData, getWeatherData };
