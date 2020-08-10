const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
//env vars
dotenv.config({path: './config/config.env'});
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');
const fileupload = require('express-fileupload');
const errorHandler = require('./middleware/error');

//DB connection
connectDB();
//Route files
const estates = require('./routes/estates');
const offers = require('./routes/offers');
const auth = require('./routes/auth');

const app = express();
//Body parser
app.use(express.json());

//dev loggin middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//File uploading
app.use(fileupload());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
app.use('/real_estate_ad/estates', estates);
app.use('/real_estate_ad/offers', offers);
app.use('/real_estate_ad/auth', auth);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port: ${PORT}`.yellow
            .bold
    )
);
//Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    //Close server & exit process
    app.close(() => process.exit(1));
});
