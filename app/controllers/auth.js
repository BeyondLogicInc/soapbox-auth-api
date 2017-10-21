const express = require('express');
const router = express.Router();

module.exports = (app) => {
    app.use('/', router);
};

router.get('/api/facebook', (req, res, next) => {
    res.json({success: true, msg: 'in Facebook API', fbID: process.env.FACEBOOK_ID});
});
