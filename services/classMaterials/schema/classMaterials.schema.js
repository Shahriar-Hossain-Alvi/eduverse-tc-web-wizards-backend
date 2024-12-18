const mongoose = require("mongoose");



const courseMaterialSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    class_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Class",
        required: true
    },
    material_url: {
        type: String,
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    is_active: { type: Boolean, default: true }
}, { timestamps: true });


const ClassMaterial = mongoose.model("ClassMaterial", courseMaterialSchema);

module.exports = ClassMaterial;