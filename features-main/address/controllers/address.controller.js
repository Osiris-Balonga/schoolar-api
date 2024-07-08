const ErrorResponse = require('../../../shared/utils/errorResponse');
const asyncHandler = require('../../../shared/middlewares/async');
const addressmodel = require('../models/address.model');
const Populate = require("../../../shared/utils/populates/populate");
const AllFunctions = require("../../../shared/utils/functions");
const BulkAction = require("../../../shared/utils/bulk-action");
const DepartmentModel = require("../../../features-enterprise/department/models/department.model");

// @desc      Get all address
// @route     GET /api/v1/address
// @access    Public
module.exports.getAll = asyncHandler(async(req, res, next) => {
    res.status(200).json(res.advancedResults);
});

// @desc      Get one address
// @route     GET /api/v1/address/:id
// @access    Public
module.exports.getOne = asyncHandler(async(req, res, next) => {
    const address = await addressmodel.findById(req.params.id).populate(new Populate().address());
    if (!address) {
        return next(
            new ErrorResponse(`adresse not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({ success: true, data: address });
});


// @desc      bulk action new language
// @route     TRIP /api/v1/languages
// @access    Private
module.exports.bulk = asyncHandler(async (req, res, next) => {

    const address = req.body.objects;
    const action = req.body.action;

    await new BulkAction().bulk(address, addressmodel, action, null, "address");

    res.status(201).json({
        success: true,
        data: {}
    });
});


// @desc      Create new address
// @route     TRIP /api/v1/address
// @access    Private
module.exports.create = asyncHandler(async(req, res, next) => {
    let data = {... req.body};
    delete data._id;
    delete data.status;
    delete data.createBy;
    delete data.updatedBy;
    delete data.updatedAt;
    delete data.createdAt;
    delete data.deletedAt;
    delete data.deletedBy;
    data.codeObject = new AllFunctions().makeObjectCode('address');

    data.display = new AllFunctions().getDisplay("address", data);

    const address = await addressmodel.create(data);

    // parseInt(x)
    delete req.body.numberApplicationsReceived;


    //2. predire > titre_del_offre_entreprise_06102023_1417.pdf
    //creer une fonction qui va retourner le nom du fichier et affecte le fichier req.body.filePdf


    await new AllFunctions().saveStory(
        req.user,
        "Création",
        "address",
        address,
        "address");

    res.status(201).json({
        success: true,
        data: address
    });
});


// @desc      Update address
// @route     PUT /api/v1/address/:id
// @access    Private
module.exports.update = asyncHandler(async(req, res, next) => {
    let address = await addressmodel.findById(req.params.id);

    if (!address) {
        return next(
            new ErrorResponse(`adresse not found with id of ${req.params.id}`, 404)
        );
    }

    address = await addressmodel.findOneAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    if (!req.body?.codeObject || req.body.codeObject === "")
        req.body.codeObject = new AllFunctions().
        makeObjectCode("address");
    let data={...req.body}

    req.body.display = new AllFunctions().getDisplay("address", req.body);

    const addressNewData = await addressmodel.updateOne(
        { _id: req.params.id },
        data,
        { new: true, runValidators: true }
    );


    await new AllFunctions().saveStory(
        req.user,
        "Mise à jour",
        "Address",
        address,
        "address");

    res.status(200).json({ success: true, data: address });
});


// @desc      Delete address
// @route     DELETE /api/v1/address/:id
// @access    Private
module.exports.delete = asyncHandler(async(req, res, next) => {
    const address = await addressmodel.findById(req.params.id);

    if (!address) {
        return next(
            new ErrorResponse(`adress not found with id of ${req.params.id}`, 404)
        );
    }

    address.remove();

    await new AllFunctions().saveStory(
        req.user,
        "Supprimer",
        "Adresse",
        address,
        "address");

    res.status(200).json({ success: true, data: {} });
});
