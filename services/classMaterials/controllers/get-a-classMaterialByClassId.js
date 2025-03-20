const mongoose = require('mongoose');
const ClassMaterials = require('../schema/classMaterials.schema');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const Class = require("../../classes/schema/classes.schema")

module.exports = async (req, res, next) => {
    const { class_id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(class_id)) {
        return next(new ErrorResponse("Invalid Class ID.", 400));
    }

    try {
        // check if class exists
        const isClassExists = await Class.findById(class_id);

        if (!isClassExists) {
            return next(new ErrorResponse("Class not found.", 404));
        }


        // Fetch the specific class material by class_id 
        const classMaterial = await ClassMaterials.find({ class_id: class_id }).select("-__v -createdAt -updatedAt").populate("created_by", "first_name last_name");

        // If no material is found
        if (!classMaterial) {
            return next(new ErrorResponse("Course material not found.", 404));
        }

        // Send success response
        res.status(200).json({
            success: true,
            message: "Class material fetched successfully.",
            data: classMaterial,
        });
    } catch (error) {
        // Handle any unexpected errors
        next(error);
    }
};