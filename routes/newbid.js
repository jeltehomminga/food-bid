const express = require('express');
const router = express.Router();
const Bid = require('../models/bid')

router.get('/:dishrequest', (req, res) => res.render('newbid', {dishRequestId: req.params.dishrequest, foodProviderId: res.locals.user.id }));

router.post('/:dishrequest/:foodprovider', (req, res) => {
    res.req.body.status = "open";
    res.req.body.dishRequest = req.params.dishrequest;
    res.req.body.foodProvider = req.params.foodprovider;
    Bid.create(res.req.body, err => err ? res.status(500).send("bid not created") : res.status(200).redirect("/auth/mybids"));
})

module.exports = router;