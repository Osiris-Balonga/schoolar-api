const ErrorResponse = require('../../../shared/utils/errorResponse');
const asyncHandler = require('../../../shared/middlewares/async');
const UserTypeModel = require('../models/user-type.model');
const Populate = require("../../../shared/utils/populates/populate");
const AllFunctions = require("../../../shared/utils/functions");

// @desc      Get all userType
// @route     GET /api/v1/userType
// @access    Public
module.exports.getAll = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get one userType
// @route     GET /api/v1/userType/:id
// @access    Public
module.exports.getOne = asyncHandler(async(req, res, next) => {
    const userType = await UserTypeModel.findById(req.params.id).populate(new Populate().userType());
    if (!userType) {
        return next(
            new ErrorResponse(`userType not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: userType });
});


// @desc      Create new userType
// @route     TRIP /api/v1/userType
// @access    Private
module.exports.create = asyncHandler(async(req, res, next) => {
    let data = req.body;
    const userType = await UserTypeModel.create(req.body);
    data.display = new AllFunctions().getDisplay("user", data);

    await new AllFunctions().saveStory(
        req.user,
        "Création",
        "userType",
        userType,
        "userType");

    res.status(201).json({
        success: true,
        data: userType
    });
});



// @desc      Update userType
// @route     PUT /api/v1/abscences/:id
// @access    Private
module.exports.update = asyncHandler(async(req, res, next) => {
    let userType = await UserTypeModel.findById(req.params.id);

    if (!userType) {
        return next(
            new ErrorResponse(`userType not found with id of ${req.params.id}`, 404)
        );
    }
    req.body.display = new AllFunctions().getDisplay("user", req.body);

   
    await UserTypeModel.updateOne({ _id: req.params.id }, req.body, { new: true, runValidators: true })
    const updated = await UserTypeModel.findById(req.params.id);

    await new AllFunctions().saveStory(
        req.user,
        "Mise à jour",
        "userType",
        userType,
        updated);

    res.status(200).json({ success: true, data: userType });
});



// @desc      Delete userType
// @route     DELETE /api/v1/userType/:id
// @access    Private
module.exports.delete = asyncHandler(async(req, res, next) => {
    const userType = await UserTypeModel.findById(req.params.id);

    if (!userType) {
        return next(
            new ErrorResponse(`userType not found with id of ${req.params.id}`, 404)
        );
    }

    await UserTypeModel.updateOne({ _id: req.params.id }, { status: 'Deleted' }, {
        new: true,
        runValidators: true
    })

    const updated = await UserTypeModel.findById(req.params.id);


    await new AllFunctions().saveStory(
        req.user,
        "Supprimer",
        "userType",
        userType,
        updated);

    res.status(200).json({ success: true, data: {} });
});
