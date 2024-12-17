const mongoose = require('mongoose');
const ClassMaterial = require('../schema/classMaterials.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Class Material ID.", 400));
    }

    try {
        // Find and delete the course material by ID
        const material = await ClassMaterial.findByIdAndDelete(id);

        // If the material doesn't exist
        if (!material) {
            return next(new ErrorResponse("Class material not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Class material deleted successfully.",
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};