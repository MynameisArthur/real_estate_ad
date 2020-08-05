const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const estates = require('./routes/estates');
const connectDB = require('./config/db');
const colors = require('colors');

//env vars
dotenv.config({path: './config/config.env'});
//DB connection
connectDB();

const app = express();
//Body parser
app.use(express.json());

//dev loggin middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//Mount routes
app.use('/real_estate_ad/estates', estates);

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
