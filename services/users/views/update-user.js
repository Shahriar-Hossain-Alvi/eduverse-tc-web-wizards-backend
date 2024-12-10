const User = require("../schema/user.schema");

module.exports = async (req, res, next) => {
	const {
		params: { id },
		body: { first_name, last_name, contact, address, is_active },
	} = req;

	try {
		const user = await User.findOne({ _id: id });

		if (!user) return next(new ErrorResponse("No user found!", 404));

		// Update the user data with the provided information
		user.first_name = first_name;
		user.last_name = last_name;
		user.contact = contact;
		user.address = address;
		user.is_active = is_active;

		// save the updated user data
		const result = await user.save();

		res.status(200).json({
			success: true,
			message: "User updated successfully",
			data: result,
		});
		// On Error
	} catch (error) {
		// Send Error Response
		next(error);
	}
};
