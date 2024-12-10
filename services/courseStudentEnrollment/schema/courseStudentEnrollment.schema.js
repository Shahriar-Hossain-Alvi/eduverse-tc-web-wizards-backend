const mongoose = require('mongoose');


const courseStudentEnrollmentSchema = new mongoose.Schema({
    users_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    course_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    is_active: { type: Boolean, default: true }
}, { timestamps: true })

const CourseStudentEnrollment = mongoose.model("CourseStudentEnrollment", courseStudentEnrollmentSchema);

module.exports = CourseStudentEnrollment;