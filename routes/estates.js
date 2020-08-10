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
//Re-route into other resource routers
router.use('/:estateId/offers', offerRouter);

router.route('/radius/:zipcode/:distance/:unit').get(getEstatesInRadius);
router.route('/:id/photo').put(estatePhotoUpload);

router
    .route('/')
    .get(advancedResults(Estate, 'offers'), getEstates)
    .post(createEstate);
router.route('/:id').get(getEstate).put(updateEstate).delete(deleteEstate);

module.exports = router;
