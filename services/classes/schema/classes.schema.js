const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    faculty_id: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "User",
        required: true
    },
    scheduled_time: {
        type: Date,
        required: true
    },
    location: { type: String, default: "" },
    is_active: { type: Boolean, default: true },


}, { timestamps: true })

const Class = mongoose.model("Class", classSchema);

module.exports = Class;