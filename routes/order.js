const express = require('express');
const router = express.Router();
const DishRequest = require('../models/dishrequest');
const moment = require('moment');
const Bid = require('../models/bid');

router.get('/:dishRequestId/:foodProviderId/:bidId', (req, res) => {
    DishRequest.findById(req.params.dishRequestId).populate('dish')
        .then(dishRequest => {
            dishRequest.requestTimeNew = moment(dishRequest.requestTime).format('DD MMMM');
            Bid.findById(req.params.bidId).populate('foodProvider')
                .then(bid =>  res.render('order', { bid, foodLover: res.locals.user.foodLover, dishRequest }))
        })
        .catch(err => console.log(err))
})


router.post('/', (req, res) => {

    debugger
})

module.exports = router;