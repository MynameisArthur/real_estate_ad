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
const commentRouter = require('./comments');

const router = express.Router();
//import protect middleware for protected routes
const {protect, authorize} = require('../middleware/auth');

//Re-route into other resource routers
router.use('/:estateId/offers', offerRouter);
router.use('/:estateId/comments', commentRouter);

router.route('/radius/:zipcode/:distance/:unit').get(getEstatesInRadius);
router
    .route('/:id/photo')
    .put(protect, authorize('publisher', 'admin'), estatePhotoUpload);

router
    .route('/')
    .get(advancedResults(Estate, 'offers'), getEstates)
    .post(protect, authorize('publisher', 'admin'), createEstate);
router
    .route('/:id')
    .get(getEstate)
    .put(protect, authorize('publisher', 'admin'), updateEstate)
    .delete(protect, authorize('publisher', 'admin'), deleteEstate);

module.exports = router;
