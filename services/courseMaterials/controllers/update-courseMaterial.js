const mongoose = require('mongoose');
const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const DeletedMaterial = require("../../deletedMaterials/schema/deletedMaterials.schema");



module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { title, description, material_url, is_active, created_by } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Course Material ID.", 400));
    }

    // Validate creator (user) ID
    if (created_by && !mongoose.Types.ObjectId.isValid(created_by)) {
        return next(new ErrorResponse("Invalid Creator (User) ID.", 400));
    }

    try {
        // Check if the material exists
        const material = await CourseMaterial.findById(id);
        if (!material) {
            return next(new ErrorResponse("Course material not found.", 404));
        }

        const oldMaterialUrl = material.material_url;

        // Update fields only if provided
        if (title) material.title = title;
        if (description) material.description = description;
        if (material_url && material_url !== oldMaterialUrl) {
            material.material_url = material_url;


            // Create a new deleted material
            const deletedMaterial = new DeletedMaterial({
                material_title: material.title,
                material_url: oldMaterialUrl,
            });

            // Save the deleted material
            await deletedMaterial.save();
        }
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