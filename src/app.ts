import nodemailer from 'nodemailer';
import express, { Request, Response } from 'express';
import { fetchCoordinates, fetchWeather, saveWeatherData, getWeatherData } from './weatherService';
import bodyParser from 'body-parser';
import { Weather } from './weatherModel';

const app = express();
const port = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/api/SaveWeatherMapping', async (req: Request, res: Response) => {
    const cities = req.body;
    for (const cityData of cities) {
        const { city, country } = cityData;
        const { latitude, longitude } = await fetchCoordinates(city, country);
        const weather = await fetchWeather(latitude, longitude);
        await saveWeatherData(city, country, weather.condition.text, longitude, latitude);
    }
    res.send(res);
});



app.get('/api/weatherDashboard', async (req: Request, res: Response) => {
  const { city } = req.query;
  try {
    const data = await getWeatherData(city as string);
    res.json(data);
  } catch (error) {
    res.status(500).send(`Error fetching weather dashboard data: ${error}`);
  }
});



app.post('/api/sendWeatherReport', async (req: Request, res: Response) => {
  const cities = req.body;

  try {
    const weatherData = await Weather.findAll({
      where: { city: cities.map((c: any) => c.city) }
    });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'shindechetan3408@gmail.com',
        pass: 'shinde@225',
      },
    });

    const mailOptions = {
      from: 'shindechetan3408@gmail.com',
      to: 'shindechetan.cp@gmail.com',
      subject: 'Weather Report',
      html: `<table>${weatherData.map(data => `<tr><td>${data.city}</td><td>${data.country}</td><td>${data.weather}</td><td>${data.time}</td><td>${data.longitude}</td><td>${data.latitude}</td></tr>`).join('')}</table>`,
    };

    await transporter.sendMail(mailOptions);
    res.status(200).send('Weather report sent successfully');
  } catch (error) {
    res.status(500).send(`Error sending weather report: ${error}`);
  }
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


// // app.ts
// import express, { Request, Response } from 'express';
// import axios from 'axios';
// import { Weather } from './weatherModel';
// import sequelize from './pgConfig';

// const app = express();
// app.use(express.json());

// const geocodingAPI = 'https://api-ninjas.com/api/geocoding';
// const weatherAPI = 'https://rapidapi.com/weatherapi/api/weatherapi-com/';

// app.post('/api/SaveWeatherMapping', async (req: Request, res: Response) => {
//   const cities = req.body;
  
//   try {
//     const weatherDataPromises = cities.map(async (city: { city: string, country: string }) => {
//       const geoResponse = await axios.get(geocodingAPI, { params: { city: city.city, country: city.country } });
//       const { latitude, longitude } = geoResponse.data[0];
      
//       const weatherResponse = await axios.get(weatherAPI, { params: { lat: latitude, lon: longitude } });
//       const weather = weatherResponse.data.current.weather;

//       return Weather.create({
//         city: city.city,
//         country: city.country,
//         weather: weather[0].description,
//         time: new Date(),
//         longitude,
//         latitude,
//       });
//     });

//     await Promise.all(weatherDataPromises);
//     res.status(201).send('Weather data saved successfully');
//   } catch (error) {
//     res.status(500).send(`Error fetching weather data: ${error}`);
//   }
// });

// const port = 8000;
// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
