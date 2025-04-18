const bcrypt = require("bcryptjs");
const User = require("../../users/schema/user.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
	const { email, newPassword } = req.body;

	if (!email || !newPassword) {
		return next(new ErrorResponse("Email and new password are required", 400));
	}


	try {
		const user = await User.findOne({email});

		if (!user) {
			return next(new ErrorResponse("User not found!", 404));
		}
 

		// Hash the new password
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(newPassword, salt);


		// Update the user's password and mark as no longer requiring an update
		user.password_hashed = hashedPass;
		user.password_update_required = false;
		await user.save();

		res.status(200).json({
			success: true,
			message: "Password updated successfully",
		});
	} catch (error) {
		next(error);
	}
};
