const ErrorResponse = require('../../../shared/utils/errorResponse');
const asyncHandler = require('../../../shared/middlewares/async');
const StoryModel = require('../models/story.model');
const User = require('../../user/models/user.model');
const AllFunctions = require("../../../shared/utils/functions");
const jwt = require('jsonwebtoken');
const Mongo = require("mongodb");
const {ObjectId} = require("mongodb");

// @desc      Get all stories
// @route     GET /api/v1/story
// @access    Public
module.exports.getAll = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
});


module.exports.getForUser = asyncHandler(async (req, res, next) =>{
    const userId =new ObjectId(req.params.id);

    let user=await User.findById(req.params.id);
    if (!user){
        return next(new ErrorResponse("user not found", 404));
    }

    let data=await StoryModel.find({"user.email":user.email}).populate([
        {
            path:"city",
            select:""
        }
    ])
    if (!data){
        return next(new ErrorResponse("Story not found",404))
    }

    res.status(200).json({success:true,data})
})

// @desc      Get all number user per day
// @route     POST /api/v1/taxi-booking-days
// @access    Public
module.exports.statDay = asyncHandler(async (req, res, next) => {


    let resultsTaxi = [];
    let resultsTrip = [];


    let user = await new AllFunctions().getUserConnect(req);

    try{
        for(let i = 0; i < 5; i=i+1){
            let date = new Date();
            let d = date.setDate(date.getDate() - i);

            let dateFilter= new AllFunctions().formatDate(d);

            let taxis;
            let trips;
            const roleAdmin = ["Admin", "AdminZone"];
            if(roleAdmin.includes(user.role)){
                taxis = await StoryModel.find({date: dateFilter  , action:'taxiBooking'});
                trips = await StoryModel.find({date: dateFilter  , action:'tripBooking'});
            }else{

                taxis = await StoryModel.find({date: dateFilter  , action:'taxiBooking', idObject : user.operator});
                trips = await StoryModel.find({date: dateFilter  , action:'tripBooking', idObject : user.operator});
            }


            let resultTaxi = {
                date: dateFilter,
                stories: taxis,
                number: taxis.length
            }
            resultsTaxi.push(resultTaxi);

            let resultTrip = {
                date: dateFilter,
                stories: trips,
                number: trips.length
            }
            resultsTrip.push(resultTrip);

        }
    }catch (e) {
        return next(new ErrorResponse(e, 400));
    }





    res.status(200).json({
        success: true,
        taxiStat: resultsTaxi,
        tripStat: resultsTrip
    });
});



// @desc      Get one story
// @route     GET /api/v1/story/:id
// @access    Public
module.exports.getOne = asyncHandler(async (req, res, next) => {
    const story = await StoryModel.findById(req.params.id);
    if (!story) {
        return next(
            new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
        );
    }
    res.status(200).json({success: true, data: story});
});



// @desc      Delete story
// @route     DELETE /api/v1/story/:id
// @access    Private
module.exports.delete = asyncHandler(async (req, res, next) => {
    const story = await StoryModel.findById(req.params.id);

    if (!story) {
        return next(
            new ErrorResponse(`Story not found with id of ${req.params.id}`, 404)
        );
    }
    story.remove();

    res.status(200).json({success: true, data: {}});
});
