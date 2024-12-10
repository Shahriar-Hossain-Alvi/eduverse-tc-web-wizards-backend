const User = require("../schema/user.schema");

module.exports = async (req, res, next) => {
	const { email, password, user_role = "student" } = req.body;

	try {
		if (!email || !password || !user_role) {
			return next(
				new ErrorResponse("Email, Password & Role are required!", 400)
			);
		}

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
