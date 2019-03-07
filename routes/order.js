const express = require('express');
const router = express.Router();
const DishRequest = require('../models/dishrequest');
const Bid = require('../models/bid')

router.get('/:dishRequestId/:foodProviderId/:bidId', (req, res, next) => {

    DishRequest.findById(req.params.dishRequestId).populate('dish')
        .then(dishRequest => {
            Bid.findById(req.params.bidId).populate('foodProvider')
                .then(bid =>  res.render('order', { bid, foodLover: res.locals.user.foodLover, dishRequest }))
        })
        .catch(err => console.log(err))
})

module.exports = router;