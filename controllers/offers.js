const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Offer = require('../models/Offer');
const Estate = require('../models/Estate');

//@desc Get offers
//@route GET /real_estate_ad/offers
//@route GET /real_estate_ad/estates/:estateId/offers
//@access Public

exports.getOffers = asyncHandler(async (req, res, next) => {
    let query;
    if (req.params.estateId) {
        query = Offer.find({
            estate: req.params.estateId,
        });
    } else {
        query = Offer.find().populate({
            path: 'estate',
            select: 'name description',
        });
    }
    const offers = await query;
    res.status(200).json({
        success: true,
        count: offers.length,
        data: offers,
    });
});

//@desc Get single offer
//@route GET /real_estate_ad/offers/:id
//@access Public

exports.getOffer = asyncHandler(async (req, res, next) => {
    const offer = await Offer.findById(req.params.id).populate({
        path: 'estate',
        select: 'name description',
    });

    if (!offer) {
        return next(
            new ErrorResponse(`No offer with the id of ${req.params.id}`),
            404
        );
    }
    res.status(200).json({
        success: true,
        data: offer,
    });
});

//@desc Add offer
//@route POST /real_estate_ad/estates/:estateId/offers
//@access Private

exports.addOffer = asyncHandler(async (req, res, next) => {
    req.body.estate = req.params.estateId;
    const estate = await Estate.findById(req.params.estateId);

    if (!estate) {
        return next(
            new ErrorResponse(
                `No estate with the id of ${req.params.estateId}`
            ),
            404
        );
    }
    const offer = await Offer.create(req.body);

    res.status(200).json({
        success: true,
        data: offer,
    });
});

//@desc Update offer
//@route PUT /real_estate_ad/offers/:id
//@access Private

exports.updateOffer = asyncHandler(async (req, res, next) => {
    let offer = await Offer.findById(req.params.id);

    if (!offer) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        );
    }
    offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: offer,
    });
});
//@desc Delete offer
//@route DELETE /real_estate_ad/offers/:id
//@access Private

exports.deleteOffer = asyncHandler(async (req, res, next) => {
    const offer = await Offer.findById(req.params.id);

    if (!offer) {
        return next(
            new ErrorResponse(`No course with the id of ${req.params.id}`),
            404
        );
    }
    await offer.remove();
    res.status(200).json({
        success: true,
        data: {},
    });
});
