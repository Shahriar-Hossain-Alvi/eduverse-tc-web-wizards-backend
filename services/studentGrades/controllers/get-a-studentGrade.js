const StudentGrade = require('../schema/studentGrade.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const mongoose = require('mongoose');

module.exports = async (req, res, next) => {
    const { id } = req.params; // Get the student grade ID from the request parameters

    if (!id) {
        return next(
            new ErrorResponse("student grade id is required", 400)
        );
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ID!", 400));
    }

    try {
        // Fetch the student grade by ID with populated course and user details
        const grade = await StudentGrade.findById(id)
            .populate('course_id', 'title description') // Populate course details
            .populate('course_student_enrollment_id', 'first_name last_name email') // Populate student details
            .populate('course_faculty_assignment_id', 'first_name last_name email'); // Populate faculty details

        // If grade not found
        if (!grade) {
            return next(new ErrorResponse("Student grade not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Student grade fetched successfully.",
            data: grade,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
