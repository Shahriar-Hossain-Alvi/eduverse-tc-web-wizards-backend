const mongoose = require("mongoose");

const deletedMaterialsSchema = new mongoose.Schema(
    {
        material_url: {
            type: String,
            required: true
        },
        is_active: {
            type: Boolean,
            default: true
        },
        material_title: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const DeletedMaterial = mongoose.model("DeletedMaterial", deletedMaterialsSchema);

module.exports = DeletedMaterial;