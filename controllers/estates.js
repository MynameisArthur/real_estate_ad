const ErrorResponse = require('../utils/errorResponse');
const Estate = require('../models/Estate');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

//@desc Get all estates
//@route GET /real_estate_ad/estates
//@access Public

exports.getEstates = asyncHandler(async (req, res, next) => {
    console.log(req.query);
    const estates = await Estate.find();
    res.status(200).json({
        success: true,
        data: estates,
        count: estates.length,
    });
});

//@desc Get single estate
//@route GET /real_estate_ad/estates/:id
//@access Public

exports.getEstate = asyncHandler(async (req, res, next) => {
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    res.status(200).json({
        success: true,
        data: estate,
    });
});

//@desc Create new real estate
//@route POST /real_estate_ad/estates
//@access Private

exports.createEstate = asyncHandler(async (req, res, next) => {
    const estate = await Estate.create(req.body);
    res.status(201).json({
        success: true,
        data: estate,
    });
});

//@desc Update estate
//@route PUT /real_estate_ad/estates/:id
//@access Private

exports.updateEstate = asyncHandler(async (req, res, next) => {
    const estate = await Estate.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    res.status(201).json({
        success: true,
        data: estate,
    });
});

//@desc Delete estate
//@route DELETE /real_estate_ad/estates/:id
//@access Private

exports.deleteEstate = asyncHandler(async (req, res, next) => {
    const estate = await Estate.findByIdAndDelete(req.params.id);
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    res.status(201).json({
        success: true,
        data: {},
    });
});

//@desc Get estates within a radius
//@route GET /real_estate_ad/estates/radius/:zipcode/:distance/:unit
//@access Private

exports.getEstatesInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance, unit} = req.params;
    //Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    //Calc radius using radians
    //Divide dist by radius of Earth
    //Earth radius = 3,963miles(6378km)
    const earthRadius = unit === 'miles' ? 3963 : 6378;
    const radius = distance / earthRadius;
    const estates = await Estate.find({
        location: {
            $geoWithin: {$centerSphere: [[lng, lat], radius]},
        },
    });
    res.status(200).json({success: true, count: estates.length, data: estates});
});
