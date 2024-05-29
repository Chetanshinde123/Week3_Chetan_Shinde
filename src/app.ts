// import nodemailer from "nodemailer";
import express, { Request, Response } from "express";
import {
  fetchCoordinates,
  fetchWeather,
  saveWeatherData,
  getWeatherData
} from "./weatherService";
import bodyParser from "body-parser";
import { Weather } from "./weatherModel";
import { sendMail } from "./sendMail";


const app = express();
const port = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Route for weather fetching and storing api using sequelize 
app.post("/api/SaveWeatherMapping", async (req: Request, res: Response) => {
  const cities = req.body;
  for (const cityData of cities) {
    const { city, country } = cityData;
    const { latitude, longitude } = await fetchCoordinates(city, country);
    const weather = await fetchWeather(latitude, longitude);
    await saveWeatherData(
      city,
      country,
      weather.condition.text,
      longitude,
      latitude
    );
  }
  res.send(res);
});

//----------- Dashboard API that will be fetching the weather information from the database
app.get("/api/weatherDashboard", async (req: Request, res: Response) => {
  const { city } = req.query;
  try {
    const data = await getWeatherData(city as string);
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error fetching weather dashboard data: ${error}`);
  }
});


// Mailing the Weather Data Route 
app.post('/api/sendWeatherEmail', async (req: Request, res: Response) => {
  const { email, cities } = req.body;

  // Fetch weather data for the specified cities
  let weatherDataHtml = '<h1>Weather Data</h1><table border="1"><tr><th>City</th><th>Country</th><th>Weather</th><th>Time</th><th>Longitude</th><th>Latitude</th></tr>';

  for (const cityData of cities) {
      const { city, country } = cityData;
      const weatherRecords = await getWeatherData(city);

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

  weatherDataHtml += '</table>';

  // Send the email
  await sendMail(email, 'Weather Data Report', weatherDataHtml);

  res.send('Weather data email sent successfully.');
});




app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
