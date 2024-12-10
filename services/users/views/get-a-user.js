const mongoose = require("mongoose");
const User = require("../schema/user.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

// Get a user by ID
module.exports = async (req, res, next) => {
	const {
		params: { id },
	} = req;

	// check if the id is a valid mongodb id
	if (!mongoose.Types.ObjectId.isValid(id)) {
		return next(new ErrorResponse("Invalid user ID", 400));
	}

	try {
		// find user id by excluding password and version field
		const result = await User.findById(id).select("-password_hashed -__v");


		// throw error if user is not found
		if (!result) {
			return next(
				new ErrorResponse("User not found", 404)
			)
		}

		// success response
		res.status(200).json({
			success: true,
			message: "Data fetched successfully",
			data: result,
		});
	} catch (error) {
		// send error response
		next(error)
	}
};