const express = require('express');
const router = express.Router();
const {
    getEstates,
    getEstate,
    createEstate,
    updateEstate,
    deleteEstate,
} = require('../controllers/estates');

router.route('/').get(getEstates).post(createEstate);
router.route('/:id').get(getEstate).put(updateEstate).delete(deleteEstate);

module.exports = router;
