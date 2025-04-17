const StudentGrade = require("../schema/studentGrade.schema");
const User = require("../../users/schema/user.schema");
const Course = require("../../courses/schema/course.schema");
const CourseStudentEnrollment = require("../../courseStudentEnrollment/schema/courseStudentEnrollment.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const logActivity = require("../../../utils/LogActivity/logActivity")



module.exports = async (req, res, next) => {
    const { course_id, student_id, faculty_id, obtained_marks, full_marks, remarks } = req.body;

    // Check if required fields are provided
    if (!course_id || !student_id || !faculty_id || obtained_marks === undefined || full_marks === undefined) {
        return next(new ErrorResponse("All fields (course_id, student_id, faculty_id, obtained_marks, full_marks) are required.", 400));
    }

    try {
        // Validate course existence
        const course = await Course.findById(course_id);
        if (!course) {
            return next(new ErrorResponse("Course not found.", 404));

        }
        // Validate student existence
        const student = await User.findById(student_id);
        if (!student) {
            return next(new ErrorResponse("Student not found.", 404));
        }

        // Validate faculty existence
        const faculty = await User.findById(faculty_id);
        if (!faculty) {
            return next(new ErrorResponse("Faculty not found.", 404));
        }

        // check if the student is enrolled in the course
        const isEnrolled = await CourseStudentEnrollment.findOne({
            users_id: student_id,
            course_id: course_id
        });

        if (!isEnrolled) {
            return next(new ErrorResponse("This Student is not enrolled in this course.", 404));
        }


        // Check if a grade already exists for this student in this course
        const existingGrade = await StudentGrade.findOne({
            course_id,
            student_id
        });

        if (existingGrade) {
            return next(new ErrorResponse("Grade already exists for this student in this course.", 400));
        }


        // Create the student grade record
        const studentGrade = new StudentGrade({
            course_id, student_id, faculty_id, obtained_marks, full_marks, remarks
        });

        // Save the grade to the database
        await studentGrade.save();

        //save log activity
        await logActivity(`Grades added for course: ${course_id}`,
            `New grades added of course id: ${course_id}, by faculty: ${faculty_id} for student: ${student_id}`
        )


        // Return success response
        res.status(201).json({
            success: true,
            message: "Student grade saved successfully.",
        });
    } catch (error) {
        next(error);
    }
};
