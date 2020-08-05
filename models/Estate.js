const mongoose = require('mongoose');

const EstateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters long'],
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [
            500,
            'Description can not be more than 500 characters long',
        ],
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters'],
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    address: {
        type: String,
        required: [true, 'Please add an address'],
    },
    location: {
        // GeoJSON point
        type: {
            type: String,
            enum: ['Point'],
        },
        coordinates: {
            type: [Number],
            index: '2dsphere',
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String,
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [10, 'Rating must be no more than 10'],
        },
        averageCost: Number,
        photo: {
            type: String,
            default: 'no-photo.jpg',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
    },
});

module.exports = mongoose.model('Estate', EstateSchema);
