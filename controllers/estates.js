const Estate = require('../models/Estate');

//@desc Get all estates
//@route GET /real_estate_ad/estates
//@access Public

exports.getEstates = async (req, res, next) => {
    try {
        const estates = await Estate.find();
        res.status(200).json({
            success: true,
            data: estates,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

//@desc Get single estate
//@route GET /real_estate_ad/estates/:id
//@access Public

exports.getEstate = async (req, res, next) => {
    try {
        const estate = await Estate.findById(req.params.id);
        if (!estate) {
            return res.status(400).json({success: false});
        }
        res.status(200).json({
            success: true,
            data: estate,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
        });
    }
};

//@desc Create new real estate
//@route POST /real_estate_ad/estates
//@access Private

exports.createEstate = async (req, res, next) => {
    try {
        const estate = await Estate.create(req.body);
        res.status(201).json({
            success: true,
            data: estate,
        });
    } catch (err) {
        res.status(400).json({
            success: false,
        });
    }
};

//@desc Update estate
//@route PUT /real_estate_ad/estates/:id
//@access Private

exports.updateEstate = async (req, res, next) => {
    const estate = await Estate.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!estate) {
        return res.status(400).json({success: false});
    }
    res.status(201).json({
        success: true,
        data: estate,
    });
};

//@desc Delete estate
//@route DELETE /real_estate_ad/estates/:id
//@access Private

exports.deleteEstate = async (req, res, next) => {
    res.status(201).json({
        success: true,
        msg: `delete real estate ${req.params.id}`,
    });
};
