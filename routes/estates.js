const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        msg: 'show all real estates',
    });
});
router.get('/:id', (req, res) => {
    res.status(200).json({
        success: true,
        msg: `display real estate ${req.params.id}`,
    });
});
router.post('/', (req, res) => {
    res.status(201).json({
        success: true,
        msg: 'create new real estate',
    });
});
router.put('/:id', (req, res) => {
    res.status(201).json({
        success: true,
        msg: `update real estate ${req.params.id}`,
    });
});
router.delete('/:id', (req, res) => {
    res.status(201).json({
        success: true,
        msg: `delete real estate ${req.params.id}`,
    });
});
module.exports = router;
