const express = require('express');
const router = express.Router();
const Bid = require('../models/bid');

router.get('/', (req, res) => {
    let noResultText = "";
    Bid.find({ foodProvider: res.locals.user.id }).populate({ path: 'dishRequest', populate: { path: 'foodLover' } }).populate('foodProvider').populate({ path: 'dishRequest', populate: { path: 'dish' } })
        .then(results => {
            if (results.length < 1) noResultText = "Not any bid yet";
            for (i = 0; i < results.length; i++)results[i].status === "success" ? results[i].succesClass = "list-group-item-success" : "";
            res.render('mybids', { bids: results, noResultText: noResultText })
        })
})

module.exports = router;