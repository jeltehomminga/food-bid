const express = require('express');
const router = express.Router();
const DishRequest = require('../models/dishrequest');
const moment = require('moment');
const Bid = require('../models/bid');
const Order = require('../models/order');

router.get('/:dishRequestId/:foodProviderId/:bidId', (req, res) => {
    DishRequest.findById(req.params.dishRequestId).populate('dish')
        .then(dishRequest => {
            dishRequest.requestTimeNew = moment(dishRequest.requestTime).format('DD MMMM');
            Bid.findById(req.params.bidId).populate('foodProvider')
                .then(bid =>  res.render('order', { bid, foodLover: res.locals.user.foodLover, dishRequest }))
        })
        .catch(err => console.log(err))
})

router.post('/:dishRequestId/:foodProviderId/:bidId/:dishId', (req, res) => {
    let newOrder = new Order({
        dishRequest: req.params.dishRequestId,
        foodLover: res.locals.user.id,
        foodProvider: res.locals.user._id,
        dish: req.params.dishId,
        bid: req.params.bidId,
        paid: true,
        status: "success"
    });
    Order.create(newOrder)
    .then(doc => {
        Bid.findByIdAndUpdate(req.params.bidId, {$set:{status:"success"}}, err => {
            if (err) {console.log("Something wrong when updating data!")};
            DishRequest.findByIdAndUpdate(req.params.dishRequestId, {$set:{status:"success"}}, err => {
                if (err) console.log("Something wrong when updating data!")
                res.render('thankyou');
        })}
    )})
    .catch(err => console.error(err))
})

module.exports = router;