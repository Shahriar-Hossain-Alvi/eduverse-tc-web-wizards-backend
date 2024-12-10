const ErrorResponse = require('../../../utils/middleware/error/error.response');
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');


module.exports = async (req, res, next) => {
    try {
        // Fetch all course student enrollments with populated user and course details
        const enrollments = await CourseStudentEnrollment.find()
            .populate("users_id", "first_name last_name email") // Populate the user's first name, last name and email
            .populate("course_id", "title description"); // Populate the course title and description

        // If no enrollments found
        if (enrollments.length === 0) {
            return next(new ErrorResponse("No student enrollments found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Student enrollments fetched successfully.",
            data: enrollments,
        });

    } catch (error) {
        // send error response
        next(error)
    }
}