const express = require('express');
const {getComments} = require('../controllers/comments');

const Comment = require('../models/Comment');
const advancedResults = require('../middleware/advancedResults');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router({mergeParams: true});
router.route('/').get(
    advancedResults(Comment, {
        path: 'estate',
        select: 'name description',
    }),
    getComments
);

module.exports = router;
