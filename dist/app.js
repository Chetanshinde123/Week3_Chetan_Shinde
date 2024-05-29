"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const weatherService_1 = require("./weatherService");
const body_parser_1 = __importDefault(require("body-parser"));
const sendMail_1 = require("./sendMail");
// import { sendMail } from "./sendMail";
const app = (0, express_1.default)();
const port = 8000;
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
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
// app.post('/api/send-mail', async (req: Request, res: Response) => {
//   const cities = req.body;
//   // Validate that the request body is an array
//   if (!Array.isArray(cities)) {
//     return res.status(400).send('Request body must be an array of city objects.');
//   }
//   try {
//     let emailContent = `<table>
//                           <tr>
//                             <th>ID</th>
//                             <th>City</th>
//                             <th>Country</th>
//                             <th>Weather</th>
//                             <th>Time</th>
//                             <th>Longitude</th>
//                             <th>Latitude</th>
//                           </tr>`;
//     for (const cityInfo of cities) {
//       const { city } = cityInfo;
//       const weatherData = await Weather.findAll({
//         where: { city },
//         order: [['time', 'DESC']],
//         limit: 1
//       });
//       weatherData.forEach((data) => {
//         emailContent += `<tr>
//                            <td>${data.id}</td>
//                            <td>${data.city}</td>
//                            <td>${data.country}</td>
//                            <td>${data.weather}</td>
//                            <td>${data.time}</td>
//                            <td>${data.longitude}</td>
//                            <td>${data.latitude}</td>
//                          </tr>`;
//       });
//     }
//     emailContent += '</table>';
//     const transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: 'shindechetan3408@gmail.com',
//         pass: 'Shinde@225'
//       }
//     });
//     const mailOptions = {
//       from: 'shindechetan3408@gmail.com',
//       to: 'shindechetan.cp@gmail.com',
//       subject: 'Weather Data',
//       html: emailContent
//     };
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Weather data emailed successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('An error occurred while sending weather data.');
//   }
// });
// const nodemailer = require("nodemailer");
//   const transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // Use `true` for port 465, `false` for all other ports
//     auth: {
//       user: "shindechetan3408@gmail.com",
//       pass: "	Shinde@225"
//     }
//   });
//   // async..await is not allowed in global scope, must use a wrapper
//   async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//       from: '"Maddison Foo Koch 👻" <shindechetan3408@gmail.com>', // sender address
//       to: "cesar43@ethereal.email, cesar43@ethereal.email", // list of receivers
//       subject: "Hello ✔", // Subject line
//       text: "Hello world?", // plain text body
//       html: "<b>Hello world?</b>" // html body
//     });
//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
//   }
//   main().catch(console.error);
// app.get('/api/mail', async (req, res) => {
//   const transporter = nodemailer.createTransport({
//     auth: {
//       user: '	malvina.johnson@ethereal.email',
//       pass: '	2RYQDwaMMN5EZuadMD'
//     }
//   });
//   async function main() {
//     try {
//       // send mail with defined transport object
//       const info = await transporter.sendMail({
//         from: '"malvina.johnson@ethereal.email" <2RYQDwaMMN5EZuadMD>',
//         to: 'shindechetan.cp@gmail.com',
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//       });
//       console.log('Message sent: %s', info.messageId);
//       res.status(200).send('Email sent successfully');
//     } catch (error) {
//       console.error('Error sending email: %s', error);
//       res.status(500).send('Error sending email');
//     }
//   }
//   await main();
// });
// const sendWeatherEmail = async (recipientEmail: string, weatherData: WeatherData[]) => {
//   const htmlTable = `
//     <table border="1" cellpadding="5" cellspacing="0">
//       <thead>
//         <tr>
//           <th>ID</th>
//           <th>City</th>
//           <th>Country</th>
//           <th>Time</th>
//           <th>Weather</th>
//           <th>Longitude</th>
//           <th>Latitude</th>
//         </tr>
//       </thead>
//       <tbody>
//         ${weatherData
//           .map(
//             (data) => `
//           <tr>
//             <td>${data.id}</td>
//             <td>${data.city}</td>
//             <td>${data.country}</td>
//             <td>${new Date(data.time).toLocaleString()}</td>
//             <td>${data.weather}</td>
//             <td>${data.longitude}</td>
//             <td>${data.latitude}</td>
//           </tr>
//         `
//           )
//           .join('')}
//       </tbody>
//     </table>
//   `;
//   const mailOptions = {
//     from: 'shindechetan3408@gmail.com',
//       to: 'shindechetan.cp@gmail.com',
//     subject: 'Weather Dashboard Report', // Subject line
//     html: htmlTable, // html body
//   };
//   try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Message sent: %s', info.messageId);
//   } catch (error) {
//     console.error('Error sending email: %s', error);
//   }
// };
// export { sendWeatherEmail };
app.post('/api/sendWeatherEmail', async (req, res) => {
    const { email, cities } = req.body;
    // Fetch weather data for the specified cities
    let weatherDataHtml = '<h1>Weather Data</h1><table border="1"><tr><th>City</th><th>Country</th><th>Weather</th><th>Time</th><th>Longitude</th><th>Latitude</th></tr>';
    for (const cityData of cities) {
        const { city, country } = cityData;
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
    weatherDataHtml += '</table>';
    // Send the email
    await (0, sendMail_1.sendMail)(email, 'Weather Data Report', weatherDataHtml);
    res.send('Weather data email sent successfully.');
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
