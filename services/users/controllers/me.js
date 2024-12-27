const User = require("../schema/user.schema");


module.exports = async (req, res, next) => {
    try {
        const user = await User.findById(req?.decoded?.id).select("-password_hashed -__v");


        // success response
		res.status(200).json({
			success: true,
			data: user,
		});
    } catch (error) {
        next(error);
    }
};
