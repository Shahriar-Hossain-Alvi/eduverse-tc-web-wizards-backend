const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');


module.exports = async (req, res, next) => {
    const course_id = req.params.id;


    // Check if the ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid Course ID", 400));
    }

    try {
        // fetch list of all enrolled student in a course
        const enrolledStudentList = await CourseStudentEnrollment.find({ course_id })
            .populate("users_id", "first_name last_name email").select("users_id");

        // If no enrollment is found
        if (!enrolledStudentList) {
            return next(new ErrorResponse("No student enrolled in this course yet!", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Student enrollment fetched successfully.",
            data: enrolledStudentList,
        });

    } catch (error) {
        // Handle errors
        next(error);
    }
};