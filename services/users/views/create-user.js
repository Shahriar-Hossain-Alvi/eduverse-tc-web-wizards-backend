const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../schema/user.schema");
const bcrypt = require('bcryptjs');


// Create a new User 
module.exports = async (req, res, next) => {
	const { email, password, user_role, first_name, last_name } = req.body;

	
	try {
		if (!email || !password || !user_role || !first_name || !last_name) {
			return next(
				new ErrorResponse("Email, Password, First name, Last name & Role are required!", 400)
			);
		}

		// check existing user
		const isUserExist = await User.findOne({ email });
		if (isUserExist) {
			return next(new ErrorResponse("User exist with the email!", 400));
		}

		// Generate a unique username
		let user_name = `${first_name.toLowerCase()}_${last_name.toLowerCase()}`;
		let count = 0;
		while (await User.findOne({ user_name })) {
			count++;
			user_name = `${first_name.toLowerCase()}_${last_name.toLowerCase()}${count}`;
		}

		//Hash the password
		const salt = await bcrypt.genSaltSync(10);
		const hashedPass = await bcrypt.hashSync(password.toString(), salt);

		// create a new user
		const newUser = new User({ email, password_hashed: hashedPass, user_role, first_name, last_name, user_name });
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