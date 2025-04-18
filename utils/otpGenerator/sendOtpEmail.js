const nodemailer = require('nodemailer');
const { OTP_SENDER_EMAIL } = require("../../configuration");
const { OTP_SENDER_PASS } = require("../../configuration");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: OTP_SENDER_EMAIL,
        pass: OTP_SENDER_PASS
    }
});

// Send email function
const sendOtpEmail = (to, otp) => {
    const mailOptions = {
        from: OTP_SENDER_EMAIL, // Replace with your email
        to: to,  // Recipient's email address
        subject: 'Your OTP for password reset',
        text: `Your OTP is: ${otp}` // Message body with OTP
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                reject(error);
            } else {
                console.log('OTP sent:', info.response);
                resolve(info);
            }
        });
    });
};

module.exports = sendOtpEmail;