const ErrorResponse = require('../utils/errorResponse');
const Estate = require('../models/Estate');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');

//@desc Get all estates
//@route GET /real_estate_ad/estates
//@access Public

exports.getEstates = asyncHandler(async (req, res, next) => {
    let query;
    // Copy req.query
    const reqQuery = {...req.query};
    //Fields to execute
    const removeFields = ['select', 'sort', 'page', 'limit'];
    //Loop over removeFields and delete them from reqQuery
    removeFields.forEach((param) => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);
    //Create operators ($gt, $gte, etc)
    queryStr = queryStr.replace(
        /\b(gt|gte|lt|lte|in)\b/g,
        (match) => `$${match}`
    );
    //Finding resource
    query = Estate.find(JSON.parse(queryStr)).populate('offers');

    //Select Fields
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }
    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else {
        query = query.sort('-createdAt');
    }
    //Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Estate.countDocuments();

    query = query.skip(startIndex).limit(limit);
    //Executing query
    const estates = await query;
    //Pagination result
    const pagination = {};
    if (endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit,
        };
    }
    if (startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit,
        };
    }

    res.status(200).json({
        success: true,
        data: estates,
        count: estates.length,
        pagination,
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
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    estate.remove();
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
