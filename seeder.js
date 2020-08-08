const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

//env vars
dotenv.config({path: './config/config.env'});
//models
const Estate = require('./models/Estate');
const Offer = require('./models/Offer');

//Connect DB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
//Rad JSON files
const estates = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/estates.json`, 'utf-8')
);
const offers = JSON.parse(
    fs.readFileSync(`${__dirname}/_data/offers.json`, 'utf-8')
);
//Import into database
const importData = async () => {
    try {
        await Estate.create(estates);
        await Offer.create(offers);
        console.log('Data imported...'.bgGreen.white);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};

//Delete
const deleteData = async () => {
    try {
        await Estate.deleteMany();
        await Offer.deleteMany();
        console.log('Data destroyed...'.bgRed.white);
        process.exit();
    } catch (err) {
        console.error(err);
    }
};
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}
