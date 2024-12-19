const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;
    console.log(id);

    // Validate MongoDB ObjectId for class_id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Class ID.", 400));
    }

    try {
        // Find and delete the attendance record
        const deletedRecord = await ClassAttendance.findOneAndDelete(id);

        // If no record found
        if (!deletedRecord) {
            return next(new ErrorResponse("Attendance record not found.", 404));
        }

        // Success response
        res.status(200).json({
            success: true,
            message: `Class attendance record for ID ${deletedRecord._id} and date: ${deletedRecord.attendance_date} deleted successfully.`,
        });
    } catch (error) {
        next(error);
    }
};
