const mongoose = require('mongoose');
const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Course Material ID.", 400));
    }

    try {
        // Fetch the specific course material by ID with populated course and creator details
        const material = await CourseMaterial.findById(id)
            .populate("course_id", "title description") // Populate course details
            .populate("created_by", "first_name last_name email"); // Populate creator details (user)

        // If no material is found
        if (!material) {
            return next(new ErrorResponse("Course material not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Course material fetched successfully.",
            data: material,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};