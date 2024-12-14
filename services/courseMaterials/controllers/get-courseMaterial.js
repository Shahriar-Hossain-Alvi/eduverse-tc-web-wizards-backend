const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    try {
        // Fetch all course materials with populated course and creator details
        const materials = await CourseMaterial.find()
            .populate("course_id", "title description") // Populate course details
            .populate("created_by", "first_name last_name email"); // Populate creator details (user)

        // If no materials are found
        if (materials.length === 0) {
            return next(new ErrorResponse("No course materials found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Course materials fetched successfully.",
            data: materials,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};