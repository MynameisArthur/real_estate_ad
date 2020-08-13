const express = require('express');
const {getComments, getComment} = require('../controllers/comments');

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
router.route('/:id').get(getComment);

module.exports = router;
