const ErrorResponse = require('../../../shared/utils/errorResponse');
const asyncHandler = require('../../../shared/middlewares/async');
const PersonModel = require('../models/person.model');
const AddressModel = require('../../address/models/address.model');
const Populate = require("../../../shared/utils/populates/populate");
const AllFunctions = require("../../../shared/utils/functions");

// @desc      Get all person
// @route     GET /api/v1/person
// @access    Public
module.exports.getAll = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get one person
// @route     GET /api/v1/person/:id
// @access    Public
module.exports.getOne = asyncHandler(async(req, res, next) => {
    const person = await PersonModel.findById(req.params.id).populate(new Populate().person());
    if (!person) {
        return next(
            new ErrorResponse(`person not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: person });
});


// @desc      Create new person
// @route     TRIP /api/v1/person
// @access    Private
module.exports.create = asyncHandler(async(req, res, next) => {

    delete req.body._id
    delete req.body.createdBy
    delete req.body.updatedBy
    delete req.body.deletedBy
    delete req.body.createdAt
    delete req.body.updatedAt
    delete req.body.deletedAt

    req.body.address = await new AllFunctions().compositeAddress(req.body);
    req.body.codeObject=new AllFunctions().makeObjectCode("person");
    req.body.label=req.body.name.toLowerCase()+" "+req.body.name.toLowerCase();

    req.body.display = new AllFunctions().getDisplay("person", req.body);
    req.body.codeObject=new AllFunctions().makeObjectCode("person");

    req.body.allFiles = new AllFunctions().CompositeAllFiles(
        req.body.allFiles,
        "person"
    );

    const person = await PersonModel.create(req.body);


    await new AllFunctions().saveStory(
        req.user,
        "Création",
        "Person",
        person,
        "person");

    res.status(201).json({
        success: true,
        data: person
    });
});



// @desc      Update person
// @route     PUT /api/v1/person/:id
// @access    Private
module.exports.update = asyncHandler(async(req, res, next) => {
    let person = await PersonModel.findById(req.params.id);

    if (!person) {
        return next(
            new ErrorResponse(`person not found with id of ${req.params.id}`, 404)
        );
    }
    if (!req.body?.codeObject || req.body.codeObject === "")
        req.body.codeObject = new AllFunctions().
        makeObjectCode("person");

    req.body.display = new AllFunctions().getDisplay("department", req.body);

    const offerNewData = await PersonModel.updateOne(
        { _id: req.params.id },
        data,
        { new: true, runValidators: true }
    );

    const updated = await PersonModel.findById(req.params.id);


    await new AllFunctions().saveStory(
        req.user,
        "Mise à jour",
        "Person",
        person,
        "person");

    res.status(200).json({ success: true, data: person });
});



// @desc      Delete person
// @route     DELETE /api/v1/person/:id
// @access    Private
module.exports.delete = asyncHandler(async(req, res, next) => {
    const person = await PersonModel.findById(req.params.id);

    if (!person) {
        return next(
            new ErrorResponse(`person not found with id of ${req.params.id}`, 404)
        );
    }

    person.remove();

    await new AllFunctions().saveStory(
        req.user,
        "Supprimer",
        "Person",
        person,
        "person");

    res.status(200).json({ success: true, data: {} });
});