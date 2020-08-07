const express = require('express');
const dotenv = require('dotenv');
//env vars
dotenv.config({path: './config/config.env'});
const morgan = require('morgan');
const estates = require('./routes/estates');
const connectDB = require('./config/db');
const colors = require('colors');
const errorHandler = require('./middleware/error');

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
