const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../schema/user.schema");
const bcrypt = require('bcryptjs');
const logActivity = require("../../../utils/LogActivity/logActivity");
const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = require("../../../configuration");

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
		const newUser = new User({ email, password_hashed: hashedPass, user_role, first_name, last_name, user_name, password_update_required: true });
		// save the new user in the DB
		const result = await newUser.save();


		// send login credentials to the user by email (nodemailer)		
		sgMail.setApiKey(SENDGRID_API_KEY);
		const msg = {
			to: email,
			from: 'shahriarhossainalvi@gmail.com',
			subject: 'Eduverse login credentials',
			html: `
			<div style="font-family: inherit; text-align: center"><strong>EDUVERSE ACCOUNT CREATION</strong></div>

			<div style="font-family: inherit; text-align: inherit"><br></div>

			<div style="font-family: inherit; text-align: inherit">Your account has been created by the admin(s).&nbsp;</div>

			<div style="font-family: inherit; text-align: inherit"><strong>Login email: </strong>${email}</div>

			<div style="font-family: inherit; text-align: inherit"><strong>Password: </strong>${password}</div>

			<div style="font-family: inherit; text-align: inherit"><br></div>

			<div style="font-family: inherit; text-align: inherit"><strong>NOTE:</strong> Change the password after logging into your account.</div>`,
		}
		await sgMail.send(msg);

		// save new activity
		await logActivity(
			`New ${user_role}: ${email} created`,
			`User ${first_name} ${last_name} (${email}) created successfully`
		)

		res.status(201).json({
			success: true,
			message: `Account with ${result.email} email created successfully`,
		});
	} catch (error) {
		// Send Error Response
		next(error);
	}
};