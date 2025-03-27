const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;
    const { attendance_record } = req.body;

    // Validate MongoDB ObjectId for classAttendance ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid ClassAttendance ID.", 400));
    }

    try {
        // Validate attendance_record if provided
        if (!attendance_record || !Array.isArray(attendance_record)) {
            return next(new ErrorResponse("Attendance record must be an array.", 400));
        }

         // Validate each attendance record entry
         for (let record of attendance_record) {
            if (!mongoose.Types.ObjectId.isValid(record.student_id)) {
                return next(new ErrorResponse("Invalid student ID.", 400));
            }

            // Validate attendance status
            const validStatuses = ["present", "absent", "early leave", "late"];
            if (!validStatuses.includes(record.is_present)) {
                return next(new ErrorResponse("Invalid attendance status.", 400));
            }
        }

        // Update the class attendance record
        const updatedAttendance = await ClassAttendance.findByIdAndUpdate(
            { _id: id },
            {
                $set: {
                    "attendance_record.$[elem]": attendance_record[0]
                }
            },
            {
                new: true,
                arrayFilters: [{ "elem.student_id": attendance_record[0].student_id }],
                runValidators: true
            }
        )

        // If no record is found
        if (!updatedAttendance) {
            return next(new ErrorResponse("Class attendance record not found.", 404));
        }


        // Success response
        res.status(200).json({
            success: true,
            message: `Class attendance record updated successfully.`,
        });
    } catch (error) {
        next(error);
    }
};
 