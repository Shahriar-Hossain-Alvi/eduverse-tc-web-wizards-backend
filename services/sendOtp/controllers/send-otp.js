const ErrorResponse = require("../../../utils/middleware/error/error.response");
const generateOtp = require("../../../utils/otpGenerator/otpGenerator");
const sendOtpEmail = require("../../../utils/otpGenerator/sendOtpEmail");
const Otp = require("../schema/otp.schema");


module.exports = async (req, res, next) => {
    const { email } = req.body;

    if (!email) return next(new ErrorResponse("Email is needed for password reset", 400));

    try {
        const otp = generateOtp();
        await sendOtpEmail(email, otp);

        // Remove old OTPs for the same email
        await Otp.deleteMany({ email });


        // create a new otp doc
        const newOtp = new Otp({ email, otp});
        // save the new user in the DB
        await newOtp.save();


        res.status(200).json({
            success: true,
            message: "OTP sent successfully"
        });

    } catch (error) {
        next(error);
    }
}