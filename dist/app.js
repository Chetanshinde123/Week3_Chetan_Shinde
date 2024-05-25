"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_1 = __importDefault(require("express"));
const weatherService_1 = require("./weatherService");
const body_parser_1 = __importDefault(require("body-parser"));
// import sendMail from "./sendMail"?
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
app.get('/api', async (req, res) => {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'shindechetan3408@gmail.com',
            pass: '3408'
        }
    });
    async function main() {
        try {
            // send mail with defined transport object
            const info = await transporter.sendMail({
                from: '"shindechetan3408@gmail.com" <Shinde@225>',
                to: 'shindechetan.cp@gmail.com',
                subject: 'Hello ✔', // Subject line
                text: 'Hello world?', // plain text body
                html: '<b>Hello world?</b>' // html body
            });
            console.log('Message sent: %s', info.messageId);
            res.status(200).send('Email sent successfully');
        }
        catch (error) {
            console.error('Error sending email: %s', error);
            res.status(500).send('Error sending email');
        }
    }
    await main();
});
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
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
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
