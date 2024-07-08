const asyncHandler = require("../../../shared/middlewares/async");
//const ErrorResponse = require('../../../../shared/utils/errorResponse');
const UserModel = require("../models/user.model");
const AddressModel = require("../../address/models/address.model");
const PersonModel = require("../../person/models/person.model");
const AllFunction = require("../../../shared/utils/functions");
const CityModel = require("../../city/models/city.model");
const Populate = require("../../../shared/utils/populates/populate");
const ErrorResponse = require("../../../shared/utils/errorResponse");
const AllFunctions = require("../../../shared/utils/functions");

// @desc      Get all users
// @route     GET /api/v1/auth/users
// @access    Private/Admin
exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get single user
// @route     GET /api/v1/auth/users/:id
// @access    Private/Admin
exports.getUser = asyncHandler(async (req, res, next) => {
  const user = await UserModel.findById(req.params.id).populate([
    {
      path: "person", populate: new Populate().person()
    },
    {
      path: "person.address",
    },
    ]);

  res.status(200).json({
    success: true,
    data: user,
  });
});


exports.updateSecurityConfirmation = asyncHandler(async (req, res, next) => {

  let {type,userSend, info}=req.body



  const user = await UserModel.findById(userSend).populate(new Populate().user());
  if (!user) {
    return next(new ErrorResponse("user not found",404));
  }

  if (type==="phone"){
    let listPhone=user.security.phoneVerifies
    listPhone.remove(info)
    user.security.phoneVerifies=listPhone
    user.save()
  }else   if (type==="email"){
    let listEmail=user.security.emailVerifies
    listEmail.remove(info)
    user.security.emailVerifies=listEmail
    user.save()
  }else {
    return next(new ErrorResponse("Error of type ",404));
  }


  res.status(200).json({
    success: true,
    data: user,
  });
});



// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.createUser = asyncHandler(async (req, res, next) => {

  delete req.body.employee
  delete req.body.createdBy
  delete req.body.updatedBy
  delete req.body.deletedBy
  delete req.body.createdAt
  delete req.body.updatedAt
  delete req.body.deletedAt
  req.body.display = new AllFunctions().getDisplay("user", req.body);
  req.body.codeObject = new AllFunctions().makeObjectCode('user');

  req.body.person = await new AllFunctions().compositePerson(req.body)


  const userCreate = await UserModel.create(req.body);

  await new AllFunctions().saveStory(
      req.user,
      "Création",
      "user",
      userCreate,
      userCreate);

  res.status(201).json({
    success: true,
    data: userCreate
  });

});

// @desc      Create user
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.updateProfile = asyncHandler(async (req, res, next) => {
  //0. control exits user
  const _user = await UserModel.findById(req.body._id);

  if (!_user) {
    return next(
      new ErrorResponse(
        `Utilisateur not found with id of ${req.params.id}`,
        404
      )
    );
  }

  //1. create or update address
  if (req.body?.person?.address)
    req.body.person.address = await new AllFunction().createOrUpdateAddress(req.body?.person?.address);


  //2. create person
  if (req.body.person)
    req.body.person = await new AllFunction().createOrUpdatePerson(req.body.person);


  //3. update user

  await UserModel.updateOne({ _id: _user._id }, req.body, {
    new: true,
    runValidators: true,
  });

  const user = await UserModel.findById(_user._id).populate(
    new Populate().user()
  );

  //4. return result
  res.status(200).json({
    success: true,
    data: user,
  });
});




// @desc      add faviry
// @route     POST /api/v1/auth/users
// @access    Private/Admin
exports.updatePhoto = asyncHandler(async (req, res, next) => {
  let user = await UserModel.findById(req.params.id).populate(
    new Populate().user()
  );

  if (!user) {
    return next(
      new ErrorResponse(`user not found with id of ${req.params.id}`, 404)
    );
  }

  user.cover = req.body.cover
  user.person.picture = req.body.person.picture

  user.save();
  await new AllFunctions().saveStory(
    req.user,
    "Mise à jour",
    "user",
    user,
    user
  );

  res.status(200).json({ success: true, data: user });
});

