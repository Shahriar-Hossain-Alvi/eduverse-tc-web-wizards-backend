const mongoose = require("mongoose");


// get all courses
module.exports = async (req, res, next) => {
    const {
        params: { id },
    } = req;

   

    try {
        

        // send response
        res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            
        });

    } catch (error) {
        //send error response
        next(error)
    }
}