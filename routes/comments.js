const express = require('express');
const {
    getComments,
    getComment,
    addComment,
    updateComment,
    deleteComment,
} = require('../controllers/comments');

const Comment = require('../models/Comment');
const advancedResults = require('../middleware/advancedResults');
const {protect, authorize} = require('../middleware/auth');

const router = express.Router({mergeParams: true});
router
    .route('/')
    .get(
        advancedResults(Comment, {
            path: 'estate',
            select: 'name description',
        }),
        getComments
    )
    .post(protect, authorize('user', 'admin'), addComment);
router
    .route('/:id')
    .get(getComment)
    .put(protect, authorize('user', 'admin'), updateComment)
    .delete(protect, authorize('user', 'admin'), deleteComment);

module.exports = router;
