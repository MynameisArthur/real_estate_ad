const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

const Comment = require('../models/Comment');
const Estate = require('../models/Estate');
const {request} = require('express');

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

//@desc Get single comment
//@route GET /real_estate_ad/comments/:id
//@access Public

exports.getComment = asyncHandler(async (req, res, next) => {
    const comment = await (await Comment.findById(req.params.id)).populate({
        path: 'estate',
        select: 'name description',
    });
    if (!comment) {
        return next(
            new ErrorResponse(
                `No comment found with the id of ${req.params.id}`,
                404
            )
        );
    }

    res.status(200).json({
        success: true,
        data: comment,
    });
});

//@desc Add comment
//@route POST /real_estate_ad/estate/:estateId/comments
//@access Private

exports.addComment = asyncHandler(async (req, res, next) => {
    req.body.estate = req.params.estateId;
    req.body.user = req.user.id;

    const estate = await Estate.findById(req.params.estateId);
    if (!estate) {
        return next(
            new ErrorResponse(
                `No estate with the ID of ${req.params.estateId}`,
                404
            )
        );
    }
    const comment = await Comment.create(req.body);

    res.status(201).json({
        success: true,
        data: comment,
    });
});

//@desc Update comment
//@route PUT /real_estate_ad/comments/:id
//@access Private

exports.updateComment = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findById(req.params.id);
    if (!comment) {
        return next(
            new ErrorResponse(`No comment with the ID of ${req.params.id}`, 404)
        );
    }

    //Make sure comment belongs to user or user is admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to update comment`, 401));
    }
    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: comment,
    });
});

//@desc Delete comment
//@route DELETE /real_estate_ad/comments/:id
//@access Private

exports.deleteComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
        return next(
            new ErrorResponse(`No comment with the ID of ${req.params.id}`, 404)
        );
    }

    //Make sure comment belongs to user or user is admin
    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
        return next(new ErrorResponse(`Not authorized to delete comment`, 401));
    }
    await comment.remove();

    res.status(200).json({
        success: true,
        data: {},
    });
});
