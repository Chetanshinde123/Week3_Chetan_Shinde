
import nodemailer from 'nodemailer';


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shindechetan3408@gmail.com', 
        pass: 'your password',
    }
});

async function sendMail( subject: string, htmlContent: string) {
    const mailOptions = {
        from: 'shindechetan3408@gmail.com',
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



