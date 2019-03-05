var express = require('express');
var router = express.Router();
const Foodlover = require("../models/foodlover");
const Dish = require('../models/dish');
const DishRequest = require('../models/dishrequest');

router.get('/', (req, res, next) => {
    Dish.find({})
    .then( dishesFromDB => res.render('requestdish', {dishesFromDB}))
    .catch( error => console.log(error))
})

router.post('/', (req, res) => {
    debugger
    DishRequest.create(res.req.body, err => err ? res.status(500).send("request not created") : res.status(200).redirect("auth/myrequests"));
})



// router.get('/newbook', (req, res) => {
//     Author.find({}, 'firstName lastName')
//         .then((authorsFromDB) => res.render("newbook", { authorsFromDB }))
//         .catch(error => console.log(error));
// })

module.exports = router;