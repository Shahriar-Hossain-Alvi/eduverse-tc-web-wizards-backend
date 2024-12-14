const User = require("../schema/user.schema");

module.exports = async (req, res, next) => {

    try {
        const result = await User.find({ user_role: "faculty" }).select("-password_hashed -__v");

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