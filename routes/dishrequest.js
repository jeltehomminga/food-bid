const express = require('express');
const router = express.Router();
const Foodlover = require("../models/foodlover");
const Dish = require('../models/dish');
const DishRequest = require('../models/dishrequest');
const Bid = require('../models/bid')

router.get('/:id', (req, res, next) => {
    let foodLover = undefined;
 

    DishRequest.findById(req.params.id).populate('dish')
    .then(resultDish => {

        Bid.find({dishRequest: req.params.id})
        .populate({path : 'dishRequest', populate: {path: 'dish'}  }).populate('foodProvider')
           .then( resultBids => {
               if (req.signedCookies.usertype === "foodlover") {
                   foodLover = true;
               };
               res.render('dishrequest', {bids: resultBids, foodLover, resultDish} );
           } )



    })
    .catch(err => console.log(err))   



})

module.exports = router;