var express = require('express');
var router = express.Router();
const Foodlover = require("../models/foodlover");
const Dish = require('../models/dish')

router.get('/', (req, res, next) => {
    Dish.find({})
    .then( dishesFromDB => res.render('requestdish', {dishesFromDB}))
    .catch( error => console.log(error))
})


// router.get('/newbook', (req, res) => {
//     Author.find({}, 'firstName lastName')
//         .then((authorsFromDB) => res.render("newbook", { authorsFromDB }))
//         .catch(error => console.log(error));
// })

module.exports = router;