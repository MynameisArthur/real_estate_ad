const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');
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
const users = require('./routes/users');
const comments = require('./routes/comments');

const app = express();
//Body parser
app.use(express.json());
//Cookie parser
app.use(cookieParser());

//dev loggin middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
//File uploading
app.use(fileupload());
//Sanitize data
app.use(mongoSanitize());
//Set security headers
app.use(helmet());
//prevent xss attacks
app.use(xss());
//rate limiting
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 min
    max: 100,
});
app.use(limiter);
//prevent http param pollution
app.use(hpp());
//Enable CORS
app.use(cors());
//Set static folder
app.use(express.static(path.join(__dirname, 'public')));

//Mount routes
app.use('/real_estate_ad/estates', estates);
app.use('/real_estate_ad/offers', offers);
app.use('/real_estate_ad/auth', auth);
app.use('/real_estate_ad/users', users);
app.use('/real_estate_ad/comments', comments);
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
