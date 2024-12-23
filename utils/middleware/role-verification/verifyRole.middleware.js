const User = require("../../../services/users/schema/user.schema")

const verifyRole = (requiredRole) => async (req, res, next) => {
    try {
        const userId = req.decoded.id; // Extracted from JWT
        const user = await User.findById(userId).select("user_role");
        
        if (!user || user.user_role !== requiredRole) {
            return next(new ErrorResponse("Forbidden: You do not have access to this resource", 403));
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = verifyRole;
