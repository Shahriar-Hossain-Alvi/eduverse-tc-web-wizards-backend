const mongoose = require('mongoose');
const ClassMaterial = require('../schema/classMaterials.schema');
const Class = require("../../classes/schema/classes.schema");
const User = require("../../users/schema/user.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const {
        params: { id },
        body: { title, description, class_id, material_url, is_active, created_by }
    } = req;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Class Material ID.", 400));
    }

    // Validate class_id and created_by if provided
    if (class_id && !mongoose.Types.ObjectId.isValid(class_id)) {
        return next(new ErrorResponse("Invalid Class ID.", 400));
    }
    if (created_by && !mongoose.Types.ObjectId.isValid(created_by)) {
        return next(new ErrorResponse("Invalid Creator (User) ID.", 400));
    }

    try {
        // Check if the material exists
        const material = await ClassMaterial.findById(id);
        if (!material) {
            return next(new ErrorResponse("Class material not found.", 404));
        }

        // Check if class_id exists
        if (class_id) {
            const isClassExists = await Class.findById(class_id);
            if (!isClassExists) {
                return next(new ErrorResponse("Class not found.", 404));
            }
        }

        // Check if created_by exists
        if (created_by) {
            const isUserExists = await User.findById(created_by);
            if (!isUserExists) {
                return next(new ErrorResponse("Creator (User) not found.", 404));
            }
        }

        // Update fields only if provided
        if (title) material.title = title;
        if (description) material.description = description;
        if (class_id) material.class_id = class_id;
        if (material_url) material.material_url = material_url;
        if (is_active !== undefined) material.is_active = is_active; // Allows explicit false
        if (created_by) material.created_by = created_by;

        // Save updated material
        const updatedMaterial = await material.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: `Class material for title: ${updatedMaterial.title} updated successfully.`,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};