const express = require('express');
const {getOffers} = require('../controllers/offers');

const router = express.Router({mergeParams: true});
router.route('/').get(getOffers);
module.exports = router;
