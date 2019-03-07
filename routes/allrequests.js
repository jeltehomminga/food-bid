const express = require('express');
const router = express.Router();
const DishRequest = require('../models/dishrequest');
const moment = require('moment');

router.get('/', (req, res) => {
    DishRequest.find({ status: "open" }).populate('dish').populate('foodLover')
        .then(result => {
            result.forEach((e, i, result) => result[i].createdAtNew = moment(result[i].createdAt).format('DD MMMM'));
            res.render('allrequests', { requests: result, user: res.locals.user });
        })
        .catch(err => console.log(err));
})

module.exports = router;