const express = require('express');
const router = express.Router();
const DishRequest = require('../models/dishrequest');
const Bid = require('../models/bid')

router.get('/:id', (req, res) => {
    DishRequest.findById(req.params.id).populate('dish')
        .then(resultDishRequest => {
            Bid.find({ dishRequest: req.params.id })
                .populate({ path: 'dishRequest', populate: { path: 'dish' } }).populate('foodProvider')
                .then(resultBids => res.render('dishrequest', { bids: resultBids, foodLover: res.locals.user.foodLover, resultDishRequest }))
        })
        .catch(err => console.log(err))
})

module.exports = router;