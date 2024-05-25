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
const express_1 = __importDefault(require("express"));
const weatherService_1 = require("./weatherService");
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.post('/api/SaveWeatherMapping', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cities = req.body;
    for (const cityData of cities) {
        const { city, country } = cityData;
        const { latitude, longitude } = yield (0, weatherService_1.fetchCoordinates)(city, country);
        const weather = yield (0, weatherService_1.fetchWeather)(latitude, longitude);
        yield (0, weatherService_1.saveWeatherData)(city, country, weather.condition.text, longitude, latitude);
    }
    res.send('Weather data saved successfully.');
}));
app.get('/api/weatherDashboard', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { city } = req.query;
    const data = yield (0, weatherService_1.getWeatherData)(city);
    res.json(data);
}));
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
