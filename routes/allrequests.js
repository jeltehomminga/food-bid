const express = require('express');
const router = express.Router();
const Foodlover = require("../models/foodlover");
const Dish = require('../models/dish');
const DishRequest = require('../models/dishrequest');
const moment = require('moment');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    DishRequest.find({status: "open"}).populate('dish').populate('foodLover')
    .then( result => {
    for (i= 0; i < result.length; i++){
        result[i].createdAtNew = moment(result[i].createdAt).format('DD MMM'); 
    }         
        res.render('allrequests', {requests: result, user: res.locals.user})
    })
    .catch( err => console.log(err))
})

module.exports = router;