const mongoose = require("mongoose");

const studentGradesSchema = new mongoose.Schema(
    {
        course_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
            required: true
        },
        course_student_enrollment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "CourseStudentEnrollment",
            required: true
        },
        course_faculty_assignment_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        grade: {
            type: Number,
            required: true
        },
        is_active: { type: Boolean, default: true },
    },
    { timestamps: true }
);

const StudentGrade = mongoose.model("StudentGrade", studentGradesSchema);

module.exports = StudentGrade;