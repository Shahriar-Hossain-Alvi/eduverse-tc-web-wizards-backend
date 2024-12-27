const User = require("../../../services/users/schema/user.schema")

const verifyRole = (...allowedRoles) => async (req, res, next) => {
    const userId = req.decoded.id; // Extracted from JWT
    const userRole = req.decoded?.user_role;

    // If the role in the token is valid, skip querying the database
    if (userRole && allowedRoles.includes(userRole)) {
        return next();
    }


    try {
        // Fetch the user's role from the database
        const user = await User.findById(userId).select("user_role");

        if (!user || !allowedRoles.includes(user.user_role)) {
            return res.status(403).json({
                message: "Access forbidden: insufficient permissions",
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            message: "Server error while verifying user role",
        });
    }
};

module.exports = verifyRole;

