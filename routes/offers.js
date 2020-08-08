const express = require('express');
const {
    getOffers,
    getOffer,
    addOffer,
    updateOffer,
    deleteOffer,
} = require('../controllers/offers');

const router = express.Router({mergeParams: true});
router.route('/').get(getOffers).post(addOffer);
router.route('/:id').get(getOffer).put(updateOffer).delete(deleteOffer);

module.exports = router;
