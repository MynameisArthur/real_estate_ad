const ErrorRespose = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Offer = require('../models/Offer');

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
