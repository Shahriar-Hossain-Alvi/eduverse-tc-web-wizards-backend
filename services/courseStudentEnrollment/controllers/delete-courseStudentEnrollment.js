const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');

module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Check if the ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Course Student Enrollment ID", 400));
    }

    try {
        // Find the course student enrollment by ID and delete it
        const result = await CourseStudentEnrollment.findByIdAndDelete(id);

        // If no enrollment is found
        if (!result) {
            return next(new ErrorResponse("No course student enrollment found with this ID", 404));
        }

        // Return success response
        res.status(200).json({
            success: true,
            message: "Course student enrollment deleted successfully.",
        });
    } catch (error) {
        next(error);
    }
};