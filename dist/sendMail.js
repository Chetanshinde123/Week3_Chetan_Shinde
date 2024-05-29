"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: 'shindechetan3408@gmail.com',
        pass: 'your password',
    }
});
async function sendMail(subject, htmlContent) {
    const mailOptions = {
        from: 'shindechetan3408@gmail.com',
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
