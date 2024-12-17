const mongoose = require('mongoose');
const ErrorResponse = require("../../../utils/middleware/error/error.response");
const ClassMaterial = require('../schema/classMaterials.schema');
const Class = require("../../classes/schema/classes.schema");
const User = require("../../users/schema/user.schema");



module.exports = async (req, res, next) => {
    const { title, description, class_id, material_url, created_by } = req.body;

    // Check if required fields are present
    if (!title || !description || !class_id || !material_url || !created_by) {
        return next(new ErrorResponse("Title, description, class_id, material_url, and created_by are required.", 400));
    }

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(class_id) || !mongoose.Types.ObjectId.isValid(created_by)) {
        return next(new ErrorResponse("Invalid class_id or created_by ID", 400));
    }

    try {
        // Check if the course exists in the database
        const isClassExists = await Class.findById(class_id);
        if (!isClassExists) {
            return next(new ErrorResponse("Class not found.", 404));
        }

        // Check if the faculty(user) exists in the database
        const isUserExists = await User.findById(created_by);
        if (!isUserExists) {
            return next(new ErrorResponse("Faculty (User) not found.", 404));
        }


        // Check if the same material (same class_id and title) already exists
        const isSameMaterialExists = await ClassMaterial.findOne({
            class_id,
            title,
            material_url
        });
        if (isSameMaterialExists) {
            return next(new ErrorResponse("Same course material with same title and class_id already exists.", 404));
        }


        // Create a new course material
        const newClassMaterial = new ClassMaterial({
            title,
            description,
            class_id,
            material_url,
            created_by,
        });

        const result = await newClassMaterial.save();

        // Return success response
        res.status(201).json({
            success: true,
            message: `Class material named ${result.title} created successfully.`,
        });
    } catch (error) {
        next(error);
    }
};