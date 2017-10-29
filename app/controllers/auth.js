const express = require('express');
const router = express.Router();
const passport = require('passport');

module.exports = (app) => {
    app.use('/', router);
};

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.writeHead(301, {Location: "http://localhost/soapbox/"});
    res.end();
});
