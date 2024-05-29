
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cecil.langosh8@ethereal.email', 
        pass: '	RWjj7QAz5ZYfM6SZTk',
    }
});

async function sendMail(to: string, subject: string, htmlContent: string) {
    const mailOptions = {
        from: 'cecil.langosh8@ethereal.email',
        to: 'shindechetan.cp@gmail.com',
        subject,
        html: htmlContent
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

export { sendMail };

