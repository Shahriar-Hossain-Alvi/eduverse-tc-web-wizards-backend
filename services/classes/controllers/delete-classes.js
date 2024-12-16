const mongoose = require("mongoose");
const Class = require("../schema/classes.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Validate the class ID
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid or missing class ID.", 400));
    }

    try {
        // Check if the class exists
        const isClassExists = await Class.findById(id);
        if (!isClassExists) {
            return next(new ErrorResponse("Class not found.", 404));
        }

        // Delete the class
        await Class.findByIdAndDelete(id);

        // Send success response
        res.status(200).json({
            success: true,
            message: `Class with ID ${id} deleted successfully.`,
        });
    } catch (error) {
        // Handle unexpected errors
        next(error);
    }
};
