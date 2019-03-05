const express = require('express');
const router = express.Router();

router.get('/', (req, res, next)=> {
    debugger
    res.clearCookie("email");
    res.clearCookie("usertype");
    res.locals.user = undefined;
    res.redirect('/');

})

module.exports = router;