const express = require('express');
const {
    getEstates,
    getEstate,
    createEstate,
    updateEstate,
    deleteEstate,
    getEstatesInRadius,
    estatePhotoUpload,
} = require('../controllers/estates');

const Estate = require('../models/Estate');
const advancedResults = require('../middleware/advancedResults');

//Include other resource routers
const offerRouter = require('./offers');

const router = express.Router();
//import protect middleware for protected routes
const {protect} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:estateId/offers', offerRouter);

router.route('/radius/:zipcode/:distance/:unit').get(getEstatesInRadius);
router.route('/:id/photo').put(protect, estatePhotoUpload);

router
    .route('/')
    .get(advancedResults(Estate, 'offers'), getEstates)
    .post(protect, createEstate);
router
    .route('/:id')
    .get(getEstate)
    .put(protect, updateEstate)
    .delete(protect, deleteEstate);

module.exports = router;
