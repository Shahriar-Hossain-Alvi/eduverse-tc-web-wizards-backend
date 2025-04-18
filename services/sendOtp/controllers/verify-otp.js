const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Otp = require("../schema/otp.schema");


module.exports = async (req, res, next) => {
    const { otp, email } = req.body;

    if (!email || !otp) {
        return next(new ErrorResponse("Email and OTP are required", 400));
      }
    

    try {
        const getValidOtp = await Otp.findOne({email, otp});

        if(!getValidOtp) return next(new ErrorResponse("Invalid or expired OTP", 400));



        res.status(200).json({
            success: true,
            message: "OTP verified successfully"
        });

    } catch (error) {
        next(error);
    }
}