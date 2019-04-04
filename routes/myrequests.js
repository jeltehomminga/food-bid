const express = require('express');
const router = express.Router();
const DishRequest = require('../models/dishrequest');
const moment = require('moment');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    DishRequest.find({foodLover: mongoose.Types.ObjectId(res.locals.user.id)}).populate('dish')
    .then( result => {       
    for (i= 0; i < result.length; i++){
        result[i].requestTimeNew = moment(result[i].requestTime).format('DD MMM'); 
        result[i].status === "success" ? result[i].succesClass = "list-group-item-success" : ""
    }      
    res.render('myrequests', {requests: result, user: res.locals.user})
    })
    .catch( err => console.log(err))
})

module.exports = router;