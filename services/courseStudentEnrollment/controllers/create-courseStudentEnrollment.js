const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const logActivity = require("../../../utils/LogActivity/logActivity");
const User = require("../../users/schema/user.schema")
const Course = require("../../courses/schema/course.schema");
const CourseStudentEnrollment = require('../schema/courseStudentEnrollment.schema');

module.exports = async (req, res, next) => {
    const { users_id, course_id } = req.body;

    // Check if required fields are present
    if (!users_id || !course_id) {
        return next(new ErrorResponse("Students(User) ID and Course ID are required.", 400));
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(users_id) || !mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid user or course ID", 400));
    }

    try {
        // Check if the user (student) exists in the database
        const userExists = await User.findById(users_id);
        if (!userExists) {
            return next(new ErrorResponse("Student (User) not found.", 404));
        }

        // Check if the course exists in the database
        const courseExists = await Course.findById(course_id);
        if (!courseExists) {
            return next(new ErrorResponse("Course not found.", 404));
        }

        // Ensure there are available seats
        if (courseExists.total_available_seats <= 0) {
            return next(new ErrorResponse("No available seats left for this course.", 400));
        }


        // Check if the student is already enrolled in the course
        const existingEnrollment = await CourseStudentEnrollment.findOne({ users_id, course_id });


        if (existingEnrollment && existingEnrollment.is_active) {
            return next(new ErrorResponse("You are already enrolled in this course.", 400));
        }


        // check if the student has enrolled in the prerequisite courses
        const prerequisiteCourses = courseExists.prerequisites;


        if (prerequisiteCourses.length > 0) {
            const isEnrolledInPrerequisiteCourses = await CourseStudentEnrollment.find({
                users_id,
                course_id: { $in: prerequisiteCourses }
            });


            // if user is not enrolled in all the prerequisite courses
            if (isEnrolledInPrerequisiteCourses.length !== prerequisiteCourses.length) {
                return next(new ErrorResponse("You are not enrolled in all the prerequisite courses.", 400));
            }
        }


        // if user tries to enroll in more than 3 courses at a time
        const activeEnrolledCourses = await CourseStudentEnrollment.countDocuments({
            users_id,
            is_active: true
        });

        if (activeEnrolledCourses.length >= 3) {
            return next(new ErrorResponse("You can not enroll in more than 3 active courses.", 400));
        }

        // Create a new course enrollment
        const newEnrollment = new CourseStudentEnrollment({
            users_id,
            course_id,
        });

        await newEnrollment.save();

        // Update the total available seats for the course
        courseExists.total_available_seats -= 1;
        await courseExists.save();


        await logActivity(
            `Student enrolled in course: ${course_id}`,
            `Student ID: ${users_id} have enrolled in the course ID: ${course_id}.`
        )

        // Return success response
        res.status(201).json({
            success: true,
            message: "Student enrolled in the course successfully.",
        });
    } catch (error) {
        next(error);
    }
};