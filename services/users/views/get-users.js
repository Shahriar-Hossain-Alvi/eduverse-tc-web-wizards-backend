const User = require("../schema/user.schema");

module.exports = async (req, res, next) => {
	const result = await User.find();
	res.status(200).json({ message: "User list", data: result });
};
