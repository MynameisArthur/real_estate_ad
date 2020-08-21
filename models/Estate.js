const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const EstateSchema = new mongoose.Schema(
    {
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
            maxlength: [
                20,
                'Phone number can not be longer than 20 characters',
            ],
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
        },
        averageRating: {
            type: Number,
            min: [1, 'Rating must be at least 1'],
            max: [10, 'Rating must be no more than 10'],
        },
        startingPrice: {
            type: Number,
            required: [true, 'Please specify property starting price'],
        },
        highestBid: Number,
        houseArea: {
            type: Number,
            required: [true, "Please specify house's area"],
        },
        yardArea: {
            type: Number,
            required: [true, "Please specify yard's area"],
        },
        bedrooms: {
            type: Number,
            required: [true, 'Please specify number of bedrooms'],
        },
        bathrooms: {
            type: Number,
            required: [true, 'Please specify number of bathrooms'],
        },
        photos: [
            {
                type: String,
                default: 'no-photo.jpg',
            },
        ],
        createdAt: {
            type: Date,
            default: Date.now,
        },
        features: {
            type: Array,
        },
        user: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        toJSON: {
            virtuals: true,
        },
        toObject: {
            virtuals: true,
        },
    }
);

//Create estate slug from the name
EstateSchema.pre('save', function (next) {
    this.slug = slugify(this.name, {lower: true});
    next();
});

//Geocode and create location field
EstateSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode,
    };
    //Don't save address in DB
    this.address = undefined;
    next();
});

//If photos were included
EstateSchema.pre('save', async function (next) {
    if (this.photos.length > 0) {
        this.photos = this.photos.map((photo) => photo.name);
    }
    next();
});

//Cascade delete offers when an estate is deleted
EstateSchema.pre('remove', async function (next) {
    console.log(`Offers being removed from estate ${this._id}`);
    await this.model('Offer').deleteMany({
        estate: this._id,
    });
    next();
});
//Reverse populate with virtuals
EstateSchema.virtual('offers', {
    ref: 'Offer',
    localField: '_id',
    foreignField: 'estate',
    justOne: false,
});

module.exports = mongoose.model('Estate', EstateSchema);
