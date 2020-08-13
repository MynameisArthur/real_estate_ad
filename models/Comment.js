const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a title for the comment'],
        maxlength: 100,
    },
    text: {
        type: String,
        required: [true, 'Please add some text'],
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: [true, 'Please add a rating between 1 and 10'],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    estate: {
        type: mongoose.Schema.ObjectId,
        ref: 'Estate',
        required: true,
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true,
    },
});
//Prevent user from submitting more than one comment per bootcamp
CommentSchema.index({estate: 1, user: 1}, {unique: true});

//Static method to get avg rating and save
CommentSchema.statics.getAverageRating = async function (estateId) {
    const obj = await this.aggregate([
        {
            $match: {estate: estateId},
        },
        {
            $group: {
                _id: '$estate',
                averageRating: {$avg: '$rating'},
            },
        },
    ]);
    try {
        await this.model('Estate').findByIdAndUpdate(estateId, {
            averageRating: obj[0].averageRating,
        });
    } catch (err) {
        console.error(err);
    }
};
//Call getAverageRating after save
CommentSchema.post('save', function () {
    this.constructor.getAverageRating(this.estate);
});

//Call getAverageRating before remove
CommentSchema.pre('remove', function () {
    this.constructor.getAverageRating(this.estate);
});

module.exports = mongoose.model('Comment', CommentSchema);
