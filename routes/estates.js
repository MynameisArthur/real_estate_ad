const express = require('express');
const {
    getEstates,
    getEstate,
    createEstate,
    updateEstate,
    deleteEstate,
    getEstatesInRadius,
} = require('../controllers/estates');
const router = express.Router();
router.route('/radius/:zipcode/:distance/:unit').get(getEstatesInRadius);

router.route('/').get(getEstates).post(createEstate);
router.route('/:id').get(getEstate).put(updateEstate).delete(deleteEstate);

module.exports = router;
