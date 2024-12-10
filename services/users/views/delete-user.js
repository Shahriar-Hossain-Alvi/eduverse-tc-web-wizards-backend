const mongoose  = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../schema/user.schema");



// delete a user data
module.exports = async (req, res, next) => {
	const { params: { id } } = req;

	// check if the id is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}

	try {
		const result = await User.findByIdAndDelete(id);

		// if user is not found
		if (!result) {
			return next(new ErrorResponse("User not found", 404));
		}

		// Send success response
		res.status(200).json({
			success: true,
			message: "User deleted successfully",
		});

	} catch (error) {
		// send error response
		next(error)
	}
};