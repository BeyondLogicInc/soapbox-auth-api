const express = require('express');
const router = express.Router();
const passport = require('passport');

module.exports = (app) => {
    app.use('/', router);
};

router.get('/login/facebook', passport.authenticate('facebook', { scope: ['email', 'public_profile'] }));
router.get('/login/facebook/return', passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    const queryString = `provider=facebook&email=${req.user.email}&id=${req.user.id}&accessToken=${req.user.accessToken}`;
    console.log(req.user)
    res.writeHead(301, {
        Location: `http://localhost/soapbox/socialLogin/process?${queryString}`
    });
    res.end();
});

router.get('/login/google', passport.authenticate('google', { scope: 'profile email' }));
router.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    const queryString = `provider=google&email=${req.user.email}&id=${req.user.id}&accessToken=${req.user.accessToken}`;
    res.writeHead(301, {
        Location: `http://localhost/soapbox/socialLogin/process?${queryString}`
    });
    res.end();
});

router.get('/login/github', passport.authenticate('github'));
router.get('/login/github/return', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    const queryString = `provider=github&email=${req.user.email}&id=${req.user.id}&accessToken=${req.user.accessToken}`;
    res.writeHead(301, {
        Location: `http://localhost/soapbox/socialLogin/process?${queryString}`
    });
    res.end();
});
