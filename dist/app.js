"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import nodemailer from "nodemailer";
const express_1 = __importDefault(require("express"));
const weatherService_1 = require("./weatherService");
const body_parser_1 = __importDefault(require("body-parser"));
const sendMail_1 = require("./sendMail");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// Route for weather fetching and storing api using sequelize
app.post("/api/SaveWeatherMapping", async (req, res) => {
    const cities = req.body;
    for (const cityData of cities) {
        const { city, country } = cityData;
        const { latitude, longitude } = await (0, weatherService_1.fetchCoordinates)(city, country);
        const weather = await (0, weatherService_1.fetchWeather)(latitude, longitude);
        await (0, weatherService_1.saveWeatherData)(city, country, weather.condition.text, longitude, latitude);
    }
    res.send(res);
});
//----------- Dashboard API that will be fetching the weather information from the database
app.get("/api/weatherDashboard", async (req, res) => {
    const { city } = req.query;
    try {
        const data = await (0, weatherService_1.getWeatherData)(city);
        res.json(data);
    }
    catch (error) {
        res.status(500).send(`Error fetching weather dashboard data: ${error}`);
    }
});
// Mailing the Weather Data Route
app.post("/api/sendWeatherEmail", async (req, res) => {
    const cities = req.body;
    let weatherDataHtml = '<h1>Weather Data</h1><table border="1"><tr><th>City</th><th>Country</th><th>Weather</th><th>Time</th><th>Longitude</th><th>Latitude</th></tr>';
    for (const cityData of cities) {
        const { city } = cityData;
        const weatherRecords = await (0, weatherService_1.getWeatherData)(city);
        for (const record of weatherRecords) {
            weatherDataHtml += `<tr>
              <td>${record.city}</td>
              <td>${record.country}</td>
              <td>${record.weather}</td>
              <td>${record.time}</td>
              <td>${record.longitude}</td>
              <td>${record.latitude}</td>
          </tr>`;
        }
    }
    weatherDataHtml += "</table>";
    // Send the email
    await (0, sendMail_1.sendMail)("Weather Data Report", weatherDataHtml);
    res.send("Weather data email sent successfully.");
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
