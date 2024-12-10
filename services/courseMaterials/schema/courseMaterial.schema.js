const mongoose = require('mongoose');


const courseMaterialsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    course_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true
    },
    material_url: {
        type: String,
        required: true
    },
    is_active: { type: Boolean, default: true },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, { timestamps: true })

const CourseMaterial = mongoose.model("CourseMaterial", courseMaterialsSchema);

module.exports = CourseMaterial;