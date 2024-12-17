const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const ClassMaterial = require('../schema/classMaterials.schema');


module.exports = async (req, res, next) => {


    try {
        const result = await ClassMaterial.find().populate("class_id", "title description scheduled_time").populate("created_by", "first_name last_name email");

        if(!result || result.length === 0){
            return next(
                new ErrorResponse("No class materials found", 404)
            )
        }

        // Return success response
        res.status(201).json({
            success: true,
            message: "All class materials fetched successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
};