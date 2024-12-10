const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");



// create a new course
module.exports = async (req, res, next) => {
    const { title, description, cover_url, total_available_seats, start_date, end_date, credits, assigned_faculty, prerequisites } = req.body;

    try {
        // Validate if assigned_faculty is array or not
        if (assigned_faculty && !Array.isArray(assigned_faculty)) {
            return next(new ErrorResponse("Assigned faculty must be an array", 400));
        }

        // check the id if it's from mongodb
        if (assigned_faculty) {
            for (let id of assigned_faculty) {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return next(new ErrorResponse(`Invalid ID in assigned_faculty: ${id}`, 400));
                }

                // check if the user exists in the DB
                const facultyExists = await User.findById(id);
                if (!facultyExists) {
                    return next(new ErrorResponse(`No faculty found with ID: ${id}`, 404));
                }
            }
        }


     


      


        // send response
        res.status(201).json({
            success: true,

        });

    } catch (error) {
        //send error response
        next(error)
    }
}