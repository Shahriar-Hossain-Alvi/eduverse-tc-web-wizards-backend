const bcrypt = require("bcryptjs");
const User = require("../schema/user.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require("mongoose");

module.exports = async (req, res, next) => {
	const { id } = req.params;
	const { old_password, new_password } = req.body;

	if (!old_password || !new_password) {
		return next(new ErrorResponse("Old and new passwords are required", 400));
	}

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}

	try {
		const user = await User.findById(id);

		if (!user) {
			return next(new ErrorResponse("User not found!", 404));
		}

		const isMatch = await bcrypt.compare(old_password, user.password_hashed);

		if (!isMatch) {
			return next(new ErrorResponse("Old password is incorrect", 401));
		}

		// Hash the new password
		const salt = await bcrypt.genSalt(10);
		const hashedPass = await bcrypt.hash(new_password, salt);

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
