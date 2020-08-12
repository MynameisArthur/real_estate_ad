const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Comment = require('../models/Comment');
const Estate = require('../models/Estate');

//@desc Get comments
//@route GET /real_estate_ad/comments
//@route GET /real_estate_ad/estates/:estateId/comments
//@access Public

exports.getComments = asyncHandler(async (req, res, next) => {
    if (req.params.estateId) {
        const comments = await Comment.find({
            estate: req.params.estateId,
        });
        return res.status(200).json({
            success: true,
            count: comments.length,
            data: comments,
        });
    } else {
        res.status(200).json(res.advancedResults);
    }
});
