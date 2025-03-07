// config the .env file
require("dotenv").config();

exports.PORT = process.env.PORT || 5000;
exports.DB = {
	uri: process.env.DB_URI,
};
exports.ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
exports.OTP_SENDER_EMAIL = process.env.OTP_SENDER_EMAIL
exports.OTP_SENDER_PASS = process.env.OTP_SENDER_PASS
exports.CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME
exports.CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY
exports.CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET