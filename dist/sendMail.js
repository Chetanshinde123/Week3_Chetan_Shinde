"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Create a transporter object using the default SMTP transport
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'cecil.langosh8@ethereal.email', //snehasinghrajput0206@gmail.com
        pass: '	RWjj7QAz5ZYfM6SZTk',
    }
});
async function sendMail(to, subject, htmlContent) {
    const mailOptions = {
        from: 'cecil.langosh8@ethereal.email',
        to: 'shindechetan.cp@gmail.com',
        subject,
        html: htmlContent
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    }
    catch (error) {
        console.error('Error sending email:', error);
    }
}
exports.sendMail = sendMail;
// import nodemailer from 'nodemailer';
// import { Request, Response } from 'express';
// import { Weather } from './weatherModel'; // Make sure this path is correct
// export const sendMail = async (req: Request, res: Response) => {
//   const cities = req.body;
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
//       const weatherData = await Weather.findAll({ where: { city }, order: [['time', 'DESC']], limit: 1 });
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
//         user: 'shindechetan3408@gmail.com', //snehasinghrajput0206@gmail.com
//         pass: 'Shinde@225',
//       },
//     });
//     const mailOptions = {
//         from: 'shindechetan3408@gmail.com',
//         to: 'shindechetan.cp@gmail.com',
//       subject: 'Weather Data',
//       html: emailContent,
//     };
//     await transporter.sendMail(mailOptions);
//     res.status(200).send('Weather data emailed successfully.');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('An error occurred while sending weather data.');
//   }
// };
