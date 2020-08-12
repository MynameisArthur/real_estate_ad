const express = require('express');
const {
    getOffers,
    getOffer,
    addOffer,
    updateOffer,
    deleteOffer,
} = require('../controllers/offers');

const Offer = require('../models/Offer');
const advancedResults = require('../middleware/advancedResults');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router({mergeParams: true});
router
    .route('/')
    .get(
        advancedResults(Offer, {
            path: 'estate',
            select: 'name description',
        }),
        getOffers
    )
    .post(protect, authorize('publisher', 'admin'), addOffer);
router
    .route('/:id')
    .get(getOffer)
    .put(protect, authorize('publisher', 'admin'), updateOffer)
    .delete(protect, authorize('publisher', 'admin'), deleteOffer);

module.exports = router;
