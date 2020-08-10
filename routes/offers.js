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
    .post(addOffer);
router.route('/:id').get(getOffer).put(updateOffer).delete(deleteOffer);

module.exports = router;
