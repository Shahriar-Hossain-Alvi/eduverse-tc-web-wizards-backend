const mongoose = require('mongoose');
const ClassMaterials = require('../schema/classMaterials.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Class Material ID.", 400));
    }

    try {
        // Fetch the specific class material by ID with populated class and creator details
        const material = await ClassMaterials.findById(id)
            .populate("class_id", "title description scheduled_time").populate("created_by", "first_name last_name email");

        // If no material is found
        if (!material) {
            return next(new ErrorResponse("Class material not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Class material fetched successfully.",
            data: material,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};