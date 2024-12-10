const mongoose  = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../schema/user.schema");


module.exports = async (req, res, next) => {

	const { params: { id } } = req;

	if(!id){
		return next(new ErrorResponse("User id is required", 400));
	}

	if(!mongoose.Schema.Types.ObjectId(id)){
		return next(new ErrorResponse("Invalid user id", 400));
	}

	try {
		// check existing user
		const isUserExist = await User.findOne({ email });
		if (isUserExist) {
			return next(new ErrorResponse("User exist with the email!", 400));
		}

		// create a new user
		const newUser = new User({ email, password_hashed: password, user_role });
		// save the new user in the DB
		const result = await newUser.save();

		res.status(201).json({
			success: true,
			message: `Account with ${result.email} email created successfully`,
		});
	} catch (error) {
		// Send Error Response
		next(error);
	}
};
