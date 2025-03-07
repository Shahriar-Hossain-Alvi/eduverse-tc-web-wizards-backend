const mongoose = require('mongoose');
const CourseMaterial = require('../schema/courseMaterial.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const DeletedMaterial = require("../../deletedMaterials/schema/deletedMaterials.schema");



module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { material_title, material_url } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Course Material ID.", 400));
    }

    try {
        // Find and delete the course material by ID
        const material = await CourseMaterial.findByIdAndDelete(id);


        // If the material doesn't exist
        if (!material) {
            return next(new ErrorResponse("Course material not found.", 404));
        }

        // Create a new deleted material
        const deletedMaterial = new DeletedMaterial({
            material_title: material_title,
            material_url: material_url,
        });

        // Save the deleted material
        await deletedMaterial.save();

        // Send success response
        res.status(200).json({
            success: true,
            message: "Course material deleted successfully.",
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};