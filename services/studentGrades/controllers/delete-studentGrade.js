const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const { id } = req.params; // Get the student grade ID from the request parameters

    // Check if ID is provided
    if (!id) {
        return next(new ErrorResponse("Student grade ID is required", 400));
    }

    // Validate if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ID!", 400));
    }

    try {
        // Attempt to find and delete the grade by ID
        const deletedGrade = await StudentGrade.findByIdAndDelete(id);

        // If grade not found
        if (!deletedGrade) {
            return next(new ErrorResponse("Student grade not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: `Student grade for ID: ${id} deleted successfully.`,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
