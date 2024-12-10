const StudentGrade = require("../schema/studentGrade.schema");
const Course = require("../../courses/schema/course.schema");
const CourseStudentEnrollment = require("../../courseStudentEnrollment/schema/courseStudentEnrollment.schema");
const User = require("../../users/schema/user.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { course_id, course_student_enrollment_id, course_faculty_assignment_id, grade } = req.body;

    // Check if required fields are provided
    if (!course_id || !course_student_enrollment_id || !course_faculty_assignment_id || grade === undefined) {
        return next(new ErrorResponse("All fields (course_id, course_student_enrollment_id, course_faculty_assignment_id, grade) are required.", 400));
    }

    try {
        // Validate course existence
        const course = await Course.findById(course_id);
        if (!course) {
            return next(new ErrorResponse("Course not found.", 404));
        }

        // Validate course student enrollment existence
        const enrollment = await CourseStudentEnrollment.findById(course_student_enrollment_id);
        if (!enrollment) {
            return next(new ErrorResponse("Course enrollment not found.", 404));
        }

        // Validate faculty existence
        const faculty = await User.findById(course_faculty_assignment_id);
        if (!faculty) {
            return next(new ErrorResponse("Faculty not found.", 404));
        }

        // Create the student grade record
        const studentGrade = new StudentGrade({
            course_id,
            course_student_enrollment_id,
            course_faculty_assignment_id,
            grade,
        });

        // Save the grade to the database
        await studentGrade.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: "Student grade created successfully.",
        });
    } catch (error) {
        next(error);
    }
};
