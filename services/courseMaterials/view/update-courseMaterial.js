const mongoose = require('mongoose');
const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, course_id, material_url, is_active, created_by } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Course Material ID.", 400));
    }

    // Validate course_id and created_by if provided
    if (course_id && !mongoose.Types.ObjectId.isValid(course_id)) {
        return next(new ErrorResponse("Invalid Course ID.", 400));
    }
    if (created_by && !mongoose.Types.ObjectId.isValid(created_by)) {
        return next(new ErrorResponse("Invalid Creator (User) ID.", 400));
    }

    try {
        // Check if the material exists
        const material = await CourseMaterial.findById(id);
        if (!material) {
            return next(new ErrorResponse("Course material not found.", 404));
        }

        // Update fields only if provided
        if (title) material.title = title;
        if (description) material.description = description;
        if (course_id) material.course_id = course_id;
        if (material_url) material.material_url = material_url;
        if (is_active !== undefined) material.is_active = is_active; // Allows explicit false
        if (created_by) material.created_by = created_by;

        // Save updated material
        const updatedMaterial = await material.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: `Course material for title: ${updatedMaterial.title} updated successfully.`,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};