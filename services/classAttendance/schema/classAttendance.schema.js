const mongoose = require("mongoose");


const classAttendanceSchema = new mongoose.Schema({
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    attendance_date: {
        type: Date,
        required: true
    },
    attendance_record: [
        {
            student_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true
            },
            is_present: {
                type: String,
                enum: ["present", "absent", "early leave"],
                required: true
            },
            remarks: {
                type: String,
                default: ""
            },
        }
    ]
}, { timestamp: true })


// Prevent duplicate attendance entries for the same student in the same class on the same date
// classAttendanceSchema.index({ class_id: 1, student: 1, date: 1 }, { unique: true });


const ClassAttendance = mongoose.model("ClassAttendance", classAttendanceSchema);

module.exports = ClassAttendance;