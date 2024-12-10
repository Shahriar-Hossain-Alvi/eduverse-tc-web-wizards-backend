const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');
const User = require("../../users/schema/user.schema")
const Course = require("../../courses/schema/course.schema")

module.exports = async (req, res, next) => {
    const { params: { id }, body: { users_id, course_id, is_active } } = req;

    // Check if the ID is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Course Student Enrollment ID", 400));
    }

    try {
        // Fetch the existing course student enrollment by ID
        const enrollment = await CourseStudentEnrollment.findById(id);

        // If no enrollment is found, return a 404 error
        if (!enrollment) {
            return next(new ErrorResponse("No course student enrollment found with this ID", 404));
        }

        // Check if users_id and course_id are valid MongoDB ObjectIds
        if (users_id && !mongoose.Types.ObjectId.isValid(users_id)) {
            return next(new ErrorResponse("Invalid User ID", 400));
        }

        if (course_id && !mongoose.Types.ObjectId.isValid(course_id)) {
            return next(new ErrorResponse("Invalid Course ID", 400));
        }


        // Check if the User exists in the database
        if (users_id) {
            const userExists = await User.findById(users_id);
            if (!userExists) {
                return next(new ErrorResponse("User not found in the database", 404));
            }
        }


        // Check if the Course exists in the database
        if (course_id) {
            const courseExists = await Course.findById(course_id);
            if (!courseExists) {
                return next(new ErrorResponse("Course not found in the database", 404));
            }
        }

        // Update the fields that are provided in the request body
        if (users_id) enrollment.users_id = users_id;
        if (course_id) enrollment.course_id = course_id;
        if (typeof is_active !== "undefined") enrollment.is_active = is_active;

        // Save the updated enrollment
        const updatedEnrollment = await enrollment.save();

        // Send the updated enrollment data in the response
        res.status(200).json({
            success: true,
            message: "Course student enrollment updated successfully.",
            data: updatedEnrollment,
        });

    } catch (error) {
        // Handle errors
        next(error);
    }
};