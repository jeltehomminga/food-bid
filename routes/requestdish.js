const express = require('express');
const router = express.Router();
const Dish = require('../models/dish');
const DishRequest = require('../models/dishrequest');

const getToday = (req, res, next) => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; 
    let yyyy = today.getFullYear();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = yyyy + '-' + mm + '-' + dd ;
    req.today = today;
    next(); 
}

router.get('/', getToday, (req, res, next) => {
    Dish.find({})
        .then(dishesFromDB => res.render('requestdish', { dishesFromDB, today: req.today, user: res.locals.user }))
        .catch(error => console.log(error))
});

router.post('/:id', (req, res) => {
    res.req.body.foodLover = req.params.id
    res.req.body.status = "open";
    DishRequest.create(res.req.body, err => err ? res.status(500).send("request not created") : res.status(200).redirect("/auth/myrequests"));
});

module.exports = router;