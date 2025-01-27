const User = require("../schema/user.schema");

module.exports = async (req, res, next) => {

    try {
        const result = await User.find({ user_role: "faculty" }).select("first_name last_name _id email");

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