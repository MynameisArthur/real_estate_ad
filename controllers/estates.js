//@desc Get all estates
//@route GET /real_estate_ad/estates
//@access Public

exports.getEstates = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: 'show all real estates',
    });
};

//@desc Get single estate
//@route GET /real_estate_ad/estates/:id
//@access Public

exports.getEstate = (req, res, next) => {
    res.status(200).json({
        success: true,
        msg: `display real estate ${req.params.id}`,
    });
};

//@desc Create new real estate
//@route POST /real_estate_ad/estates
//@access Private

exports.createEstate = (req, res, next) => {
    res.status(201).json({
        success: true,
        msg: 'create new real estate',
    });
};

//@desc Update estate
//@route PUT /real_estate_ad/estates/:id
//@access Private

exports.updateEstate = (req, res, next) => {
    res.status(201).json({
        success: true,
        msg: `update real estate ${req.params.id}`,
    });
};

//@desc Delete estate
//@route DELETE /real_estate_ad/estates/:id
//@access Private

exports.deleteEstate = (req, res, next) => {
    res.status(201).json({
        success: true,
        msg: `delete real estate ${req.params.id}`,
    });
};
