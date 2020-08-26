const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const Estate = require('../models/Estate');
const asyncHandler = require('../middleware/async');
const geocoder = require('../utils/geocoder');
const slugify = require('slugify');

//@desc Get all estates
//@route GET /real_estate_ad/estates
//@access Public

exports.getEstates = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

//@desc Get single estate
//@route GET /real_estate_ad/estates/:id
//@access Public

exports.getEstate = asyncHandler(async (req, res, next) => {
    const estate = await Estate.findById(req.params.id).populate('offers');
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
    if (req.body.address) {
        //Add user to req body
        req.body.user = req.user.id;

        const estate = await Estate.create(req.body);
        res.status(201).json({
            success: true,
            data: estate,
        });
    } else {
        return next(
            new ErrorResponse(`You need to specify address of your estate`, 400)
        );
    }
});

//@desc Update estate
//@route PUT /real_estate_ad/estates/:id
//@access Private

exports.updateEstate = asyncHandler(async (req, res, next) => {
    let estate = await Estate.findById(req.params.id);
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    //Make sure user is estate's owner
    if (estate.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User with the ID ${req.params.id} is not authorized to update this estate`,
                401
            )
        );
    }
    if (!req.body.address) {
        return next(
            new ErrorResponse(`You need to specify address of your estate`, 400)
        );
    }
    const updatedData = req.body;
    //Geocode and create location field
    const loc = await geocoder.geocode(updatedData.address);
    updatedData.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    };
    //Don't save address in DB
    updatedData.address = undefined;
    //create slug
    updatedData.slug = slugify(updatedData.name, {lower: true});
    estate = await estate.update(updatedData, {
        new: true,
        runValidators: true,
    });
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
    //Make sure user is estate's owner
    if (estate.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User with the ID ${req.params.id} is not authorized to delete this estate`,
                401
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

//@desc Upload photo for estate
//@route PUT /real_estate_ad/estates/:id/photo
//@access Private

exports.estatePhotoUpload = asyncHandler(async (req, res, next) => {
    const estate = await Estate.findById(req.params.id);
    if (!estate) {
        return next(
            new ErrorResponse(
                `Estate with the id ${req.params.id} not found`,
                404
            )
        );
    }
    //Make sure user is estate's owner
    if (estate.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(
            new ErrorResponse(
                `User with the ID ${req.params.id} is not authorized to upload photo for this estate`,
                401
            )
        );
    }
    if (!req.files) {
        return next(new ErrorResponse(`Please upload a file`, 400));
    }
    const file = req.files.file;
    //Make sure the image is a photo
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`Please upload an image file`, 400));
    }
    //Check filesize
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(
            new ErrorResponse(
                `Please upload an image less than ${process.env.MAX_FILE_UPLOAD} bytes`,
                400
            )
        );
    }

    const {photos} = await estate;
    if (photos.length >= 8) {
        return next(
            new ErrorResponse(
                `You can upload up to 8 photos for one estate`,
                400
            )
        );
    }
    //Create custom file name
    file.name = `photo_${estate._id}_${photos.length + 1}${
        path.parse(file.name).ext
    }`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            console.error(err);
            return next(new ErrorResponse(`Problem with file upload`, 500));
        }

        photos.push(file.name);
        await estate.updateOne({
            photos,
        });
        res.status(200).json({
            success: true,
            data: file.name,
        });
    });
});
