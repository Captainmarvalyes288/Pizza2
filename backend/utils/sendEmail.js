const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'davon.trantow@ethereal.email',
                pass: 'x4Zb565HZYNmFJzVfY'
            }
        });

        const mailOptions = {
            from: 'ias.tejasnavale10@gmail.com',
            to: email,
            subject: subject,
            text: text
        };

        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = sendEmail;
