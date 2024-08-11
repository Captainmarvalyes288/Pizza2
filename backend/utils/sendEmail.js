const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text, html) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'concepcion21@ethereal.email',
                pass: 'QPeSuuYNgzF7KfnCaf'
            }
        });
        const mailOptions = {
            from: 'ias.tejasnavale10@gmail.com',
            to: email,
            subject: subject,
            text: text,
            html: html 
        };
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;