const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');


module.exports = async (req, res, next) => {
    const { student_id } = req.params;

    // Check if the ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(student_id)) {
        return next(new ErrorResponse("Invalid Course Student Enrollment ID", 400));
    }

    try {
        // Fetch the single course student enrollment by ID and populate the user and course details
        const enrollment = await CourseStudentEnrollment.find({ users_id: student_id }).select("-__v -updatedAt -createdAt")
            .populate(
                {
                    path: "course_id",
                    select: "-createdAt -description -updatedAt -__v -prerequisites",
                    populate: {
                        path: "assigned_faculty",
                        select: "first_name last_name"
                    }
                }
            );

        // If no enrollment is found
        if (!enrollment) {
            return next(new ErrorResponse("No course student enrollment found with this ID", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Student enrollment fetched successfully.",
            data: enrollment,
        });

    } catch (error) {
        // Handle errors
        next(error);
    }
};