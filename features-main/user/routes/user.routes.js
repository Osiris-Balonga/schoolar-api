const express = require("express");
const {
  getUsers,
  getUser,
  createUser,
 
} = require("../controllers/users.controller");
const advancedResults = require("./../../../shared/middlewares/advancedResults");
const User = require("../models/user.model");


const router = express.Router({ mergeParams: true });

//router.use(protect);
//router.use(authorize('Admin', 'Explorer','User'));

router
  .route("/")
  .get(
    advancedResults(User, [
      {
        path: "person",
        populate: {
          path: "address",
          select: "",
          populate: {
            path: "city",
            select: "",
          },
        },
      },
     ,
 
      {
        path: "person.address.city",
      },
   
      {
        path: "createBy",
      },
    ]),
    getUsers
  )
  .post(createUser);



module.exports = router;
