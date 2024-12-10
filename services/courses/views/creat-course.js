const mongoose = require("mongoose");
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const User = require("../../users/schema/user.schema");
const Course = require("../schema/course.schema");



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

        // Validate if prerequisites is array or not
        if (prerequisites && !Array.isArray(prerequisites)) {
            return next(new ErrorResponse("Prerequisites must be an array", 400));
        }


        // check the id if it's from mongodb
        if (prerequisites) {
            for (let id of prerequisites) {
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return next(new ErrorResponse(`Invalid ID in prerequisites: ${id}`, 400));
                }

                // check if the course exists in the DB
                const prerequisiteCourseExists = await Course.findById(id);
                if (!prerequisiteCourseExists) {
                    return next(new ErrorResponse(`No prerequisite course found with ID: ${id}`, 404));
                }
            }
        }


        // check if the course with same title is already exists/active
        const isCourseExist = await Course.findOne({ title: title });

        if (isCourseExist) {
            if (isCourseExist.is_active) {
                return next(
                    new ErrorResponse(`An active course with the title "${title}" already exists!`, 400)
                );
            } else {
                return next(
                    new ErrorResponse(`A course with the title "${title}" already exists but is inactive. Please reactivate the course or choose a different title`, 400)
                );
            }
        }


        // create a new course
        const newCourse = new Course({
            title, description, cover_url, total_available_seats, start_date, end_date, credits,
            assigned_faculty: assigned_faculty || [], prerequisites: prerequisites || []
        })


        // save new course in the db
        const result = await newCourse.save();






        // send response
        res.status(201).json({
            success: true,
            message: `Course: ${result.title} created successfully`,
        });

    } catch (error) {
        //send error response
        next(error)
    }
}