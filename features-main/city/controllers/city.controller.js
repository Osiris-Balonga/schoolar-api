const ErrorResponse = require("../../../shared/utils/errorResponse");
const asyncHandler = require("../../../shared/middlewares/async");
const CityModel = require("../models/city.model");
const Populate = require("../../../shared/utils/populates/populate");
const AllFunctions = require("../../../shared/utils/functions");

// @desc      Get all city
// @route     GET /api/v1/city
// @access    Public
module.exports.getAll = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get all city
// @route     GET /api/v1/city
// @access    Public
module.exports.getByCountry = asyncHandler(async (req, res, next) => {
  const cities = await CityModel.find({ country: req.params.id });
  if (!cities) {
    return next(
      new ErrorResponse(`country not found with id of ${req.params.id}`, 404)
    );

    //  return  res.status(200).json({ success: true, data: []});
  }

  console.log(cities);
  res.status(200).json({ success: true, data: cities });
});

// @desc      Get one city
// @route     GET /api/v1/city/:id
// @access    Public
module.exports.getOne = asyncHandler(async (req, res, next) => {
  const city = await CityModel.findById(req.params.id).populate(
    new Populate().city()
  );
  if (!city) {
    return next(
      new ErrorResponse(`city not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(200).json({ success: true, data: city });
});

// @desc      Create new city
// @route     TRIP /api/v1/city
// @access    Private
module.exports.create = asyncHandler(async (req, res, next) => {
  req.body.codeObject = new AllFunctions().makeObjectCode("city");
  let display = {};
  if (req.body && req.body.country) display.country = req.body.country.label;

  req.body.display = display;

  const city = await CityModel.create(req.body);

  if (req.body._id === "") delete req.body["_id"];

  // parseInt(x)
  delete req.body.numberApplicationsReceived;


  //2. predire > titre_del_offre_entreprise_06102023_1417.pdf
  //creer une fonction qui va retourner le nom du fichier et affecte le fichier req.body.filePdf

  console.log("req.body)", req.body);
  let data={...req.body}

  delete data._id;


  await new AllFunctions().saveStory(
    req.user,
    "Création",
    "City",
    city,
    "city"
  );

  res.status(201).json({
    success: true,
    data: city,
  });
});

// @desc      Update city
// @route     PUT /api/v1/city/:id
// @access    Private
module.exports.update = asyncHandler(async (req, res, next) => {
  let city = await CityModel.findById(req.params.id);

  if (!city) {
    return next(
      new ErrorResponse(`city not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.body?.codeObject || req.body.codeObject === "")
    req.body.codeObject = new AllFunctions().
    makeObjectCode("offer");
  let data={...req.body}

  let display = {};
  if (data && req.body.city) display.city = req.body.city.label;
  if (data && req.body.country) display.domain = req.body.country.label;
  if (data && req.body.createdBy) display.createdBy = req.body.createdBy.person.label;

  req.body.display = display;

  const cityNewData = await CityModel.updateOne(
      { _id: req.params.id },
      data,
      { new: true, runValidators: true }
  );


  city = await CityModel.findOneAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "City",
    city,
    "city"
  );

  res.status(200).json({ success: true, data: city });
});

// @desc      Delete city
// @route     DELETE /api/v1/city/:id
// @access    Private
module.exports.delete = asyncHandler(async (req, res, next) => {
  const city = await CityModel.findById(req.params.id);

  if (!city) {
    return next(
      new ErrorResponse(`city not found with id of ${req.params.id}`, 404)
    );
  }

  city.remove();

  await new AllFunctions().saveStory(
    req.user,
    "Supprimer",
    "City",
    city,
    "city"
  );

  res.status(200).json({ success: true, data: {} });
});
