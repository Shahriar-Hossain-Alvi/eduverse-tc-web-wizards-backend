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
        subject: 'Your OTP for account verification',
        text: `Your OTP is: ${otp}` // Message body with OTP
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('OTP sent:', info.response);
        }
    });
};

module.exports = sendOtpEmail;