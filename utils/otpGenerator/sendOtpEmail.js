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
const sendOtpEmail = async (to, otp) => {
    const mailOptions = {
        from: OTP_SENDER_EMAIL, // Replace with your email
        to: to,  // Recipient's email address
        subject: 'Your OTP for password reset',
        text: `Your OTP is: ${otp}` // Message body with OTP
    };

    const otpResponse = await transporter.sendMail(mailOptions); // throws if fails
    
    return otpResponse;
};

module.exports = sendOtpEmail;