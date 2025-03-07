const ErrorResponse = require("../../../utils/middleware/error/error.response");
const DeletedMaterial = require("../schema/deletedMaterials.schema")


module.exports = async (req, res, next) => {

    try {
        // Find and delete the course material by ID
        const deletedMaterials = await DeletedMaterial.find();


        // If the material doesn't exist
        if (!deletedMaterials) {
            return next(new ErrorResponse("No deleted materials found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Deleted materials fetched successfully.",
            data: deletedMaterials
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};