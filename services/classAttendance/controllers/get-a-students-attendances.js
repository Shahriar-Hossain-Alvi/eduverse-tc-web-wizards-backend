const mongoose = require("mongoose");
const ClassAttendance = require("../schema/classAttendance.schema");
const ErrorResponse = require("../../../utils/middleware/error/error.response");

module.exports = async (req, res, next) => {
    const { id } = req.params;

    // Validate MongoDB ObjectId for class_id
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorResponse("Invalid Student ID.", 400));
    }

    try {
        // Fetch attendance records
        const attendanceRecords = await ClassAttendance.aggregate([
            {
                $match: {
                    "attendance_record.student_id": new mongoose.Types.ObjectId(id),
                },
            },
            {
                $project: {
                    class_id: 1,
                    attendance_date: 1,
                    attendance_record: {
                        $filter: {
                            input: "$attendance_record",
                            as: "record",
                            cond: {
                                $eq: ["$$record.student_id", new mongoose.Types.ObjectId(id)],
                            },
                        },
                    },
                }
            },
            {
                $unwind: "$attendance_record",// optional, flattens the array
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "class_id",
                    foreignField: "_id",
                    as: "class_info",
                }
            },
            {
                $unwind: "$class_info",// optional, flattens the array
            },
            {
                $project: {
                    class_id: 1,
                    attendance_date: 1,
                    attendance_record: 1,
                    class_info: {
                        title: "$class_info.title",
                        scheduled_time: "$class_info.scheduled_time"
                    }
                }
            }
        ])

        // If no records are found, return an empty array with success = true
        if (!attendanceRecords || attendanceRecords.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No attendance records found for the specified class.",
                data: [],
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            data: attendanceRecords,
        });
    } catch (error) {
        next(error);
    }
};
