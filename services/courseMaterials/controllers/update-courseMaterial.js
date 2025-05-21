const mongoose = require('mongoose');
const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const DeletedMaterial = require("../../deletedMaterials/schema/deletedMaterials.schema");
const logActivity = require("../../../utils/LogActivity/logActivity");



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

        // create a update data object
        const updateData = {};

        const oldMaterialUrl = material.material_url;

        // Update fields only if provided
        if (title && (material.title !== title)) {
            updateData.title = title;
            // console.log("Title is changing...");
        }

        if (description && (material.description !== description)) {
            updateData.description = description;
            // console.log("Description is changing...");
        };

        if (material_url && material_url !== oldMaterialUrl) {
            updateData.material_url = material_url;

            // Create a new deleted material
            const deletedMaterial = new DeletedMaterial({
                material_title: material.title,
                material_url: oldMaterialUrl,
            });

            // Save the deleted material
            await deletedMaterial.save();
        }


        if (is_active !== undefined) {
            updateData.is_active = is_active; // Allows explicit false
            // console.log("Is Active is changing...");
        }

        if (created_by && (material.created_by !== created_by)) {
            updateData.created_by = created_by;
            // console.log("Created By is changing");
        };

        if(Object.keys(updateData).length === 0) {
            return next(new ErrorResponse("No changes detected.", 400));
        }

        // Save updated material
        const result = await CourseMaterial.findByIdAndUpdate(id, updateData, {
            new: true, // Returns the updated document instead of the old one
            runValidators: true, // Runs schema validation after updating fields
        });


        // log activity
        await logActivity(
			`Course Material: ${result.title} updated`,
			`${result._id} is updated successfully.`
		)

        // Send success response
        res.status(200).json({
            success: true,
            message: `Course material for title: ${result.title} updated successfully.`,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};