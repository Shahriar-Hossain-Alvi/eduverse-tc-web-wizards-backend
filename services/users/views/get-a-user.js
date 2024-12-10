const User = require("../schema/user.schema");

// Get a user by ID
module.exports = async (req, res, next) => {
	const {
		params: { id },
	} = req;

	const result = await User.findById(id);

	res.status(200).json({
		success: true,
		message: "Data fetched successfully",
		data: result,
	});
};
