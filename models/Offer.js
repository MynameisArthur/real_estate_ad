const mongoose = require('mongoose');
const OfferSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: [true, 'Please add a offer title'],
    },
    description: {
        type: String,
        required: [true, 'Please add a description'],
    },
    amountOffered: {
        type: Number,
        required: [true, 'Please specify your offer in usd'],
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
});

module.exports = mongoose.model('Offer', OfferSchema);
