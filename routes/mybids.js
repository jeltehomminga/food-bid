const express = require('express');
const router = express.Router();
const Foodlover = require("../models/foodlover");
const Dish = require('../models/dish');
const DishRequest = require('../models/dishrequest');
const moment = require('moment');
const mongoose = require('mongoose');
const Bid = require('../models/bid');

router.get('/', (req,res,next) => {
    let noResultText = "";
    Bid.find({foodProvider: res.locals.user.id}).populate({path : 'dishRequest', populate: { path: 'foodLover'}  }).populate('foodProvider').populate({path : 'dishRequest', populate: { path: 'dish'}  })
    .then( results => {
         if (results.length < 1){
            noResultText = "Not any bid yet";
        }
        res.render('mybids', {bids: results, noResultText: noResultText})
    }) 
} )



module.exports = router;