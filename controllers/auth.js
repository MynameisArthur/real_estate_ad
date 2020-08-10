const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');
const User = require('../models/User');

// @desc  Register user
// @route GET /real_estate_ad/auth/register
// Public

exports.register = asyncHandler(async (req, res, next) => {
    const {name, email, password, role} = req.body;
    //Create User
    const user = await User.create({
        name,
        email,
        password,
        role,
    });
    res.status(200).json({
        success: true,
    });
});
