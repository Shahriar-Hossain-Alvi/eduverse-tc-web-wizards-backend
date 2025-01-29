const User = require("../schema/user.schema");


module.exports = async (req, res, next) => {

	const { role } = req.query;

	try {
		const filter = role && role !== "all" ? { user_role: role } : {}

		const result = await User.find(filter).select("-password_hashed -__v");

		res.status(201).json({
			success: true,
			message: `Data fetched successfully`,
			data: result
		});
	} catch (error) {
		// Send Error Response
		next(error);
	}
};