const ErrorResponse = require('../../../shared/utils/errorResponse');
const asyncHandler = require('../../../shared/middlewares/async');
const LanguageModel = require('../models/language.model');
const Populate = require("../../../shared/utils/populates/populate");
const AllFunctions = require("../../../shared/utils/functions");
const BulkAction = require("../../../shared/utils/bulk-action");

// @desc      Get all language
// @route     GET /api/v1/language
// @access    Public
module.exports.getAll = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get one language
// @route     GET /api/v1/languages/:id
// @access    Public
module.exports.getOne = asyncHandler(async (req, res, next) => {
    const language = await LanguageModel.findById(req.params.id).populate(new Populate().language());
    if (!language) {
        return next(
            new ErrorResponse(`Language not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({success: true, data: language});
});


// @desc      Create new language
// @route     TRIP /api/v1/languages
// @access    Private
module.exports.create = asyncHandler(async (req, res, next) => {
    const language = await LanguageModel.create(req.body);

    await new AllFunctions().saveStory(
        req.user,
        "Création",
        "language",
        language,
        language);

    res.status(201).json({
        success: true,
        data: language
    });
});



// @desc      Update language
// @route     PUT /api/v1/languages/:id
// @access    Private
module.exports.update = asyncHandler(async (req, res, next) => {
    let language = await LanguageModel.findById(req.params.id);

    if (!language) {
        return next(
            new ErrorResponse(`Language not found with id of ${req.params.id}`, 404)
        );
    }

    await LanguageModel.updateOne({_id: req.params.id}, req.body, {
        new: true,
        runValidators: true
    });
    language = await LanguageModel.findById(req.params.id);

    await new AllFunctions().saveStory(
        req.user,
        "Mise à jour",
        "language",
        language,
        language);

    res.status(200).json({success: true, data: language});
});


// @desc      bulk action new language
// @route     TRIP /api/v1/languages
// @access    Private
module.exports.bulk = asyncHandler(async (req, res, next) => {

    const languages =  req.body.objects;
    const action  = req.body.action;

    await new BulkAction().bulk(languages, LanguageModel, action, null, "language");

    res.status(201).json({
        success: true,
        data: {}
    });
});



// @desc      Delete language
// @route     DELETE /api/v1/languages/:id
// @access    Private
module.exports.delete = asyncHandler(async (req, res, next) => {
    const language = await LanguageModel.findById(req.params.id);

    if (!language) {
        return next(
            new ErrorResponse(`Language not found with id of ${req.params.id}`, 404)
        );
    }

    language.remove();

    await new AllFunctions().saveStory(
        req.user,
        "Supprimer",
        "language",
        language,
        language);

    res.status(200).json({success: true, data: {}});
});
