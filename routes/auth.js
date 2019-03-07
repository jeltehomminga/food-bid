const express = require('express');
const router = express.Router();

router.get('/*', (req, res, next) => res.locals.user ? next() : res.redirect('/'))

module.exports = router;